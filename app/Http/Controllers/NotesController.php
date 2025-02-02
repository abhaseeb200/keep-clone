<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\User;
use App\Models\Label;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class NotesController extends Controller
{
    public function index(Request $request)
    {
        // $sortBy = $request->get('sort_by', 'created_at'); 
        // $order = $request->get('order', 'asc');
        // $limit = $request->get('limit', 5);
    
        // if (!in_array($sortBy, ['title', 'created_at', 'content'])) {
        //     return response()->json(['message' => 'Invalid sort field.'], 400);
        // }
        // if (!in_array($order, ['asc', 'desc'])) {
        //     return response()->json(['message' => 'Invalid order.'], 400);
        // }
        
        // $data = Auth::user()->notes()->with("labels")->orderBy($sortBy, $order)->paginate($limit);  
        
        $data = Auth::user()->notes()->with("labels")->get();  
    
        return response()->json([
            'data' => $data
        ]);
    }

    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|max:255',
        ]);

        $query = $request->input('query');

        $results = Auth::user()->notes()
        ->where('title', 'like', "%{$query}%")
        ->orWhere('content', 'like', "%{$query}%")
        ->where('user_id', Auth::id())->get();

        return response()->json([
            'data' => $results
        ]);
    }
    
    public function search_suggestions(Request $request)
    {
        $userId = Auth::id();
        $results = Label::whereHas('notes')->forUser($userId)->get();
        $background = Auth::user()->notes()->whereNotNull('background')->distinct()->pluck('background');

        return response()->json([
            'labels' => $results,
            'background' => $background
        ]);
    }

    // Store a newly created post in storage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'isPinned' => 'nullable|boolean',
            'isArchived' => 'nullable|boolean',
            'background' => 'nullable|string',
            'drawing' => 'nullable|string',
            'labels' => 'array',
            'labels.*' => 'exists:labels,id' //Used to ensure that each label ID provided in the labels
        ]);

        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $imagePath = 'images/'.$imageName;
            // $image = $request->file('image');
            // $imagePath = $image->store('images', 'public');
        } else {
            // Use the existing image URL if available (for copying)
            $imagePath = $request->input('image_url') ?? '';
        }
        
        $note = Auth::user()->notes()->create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'image' => $imagePath,
            'isPinned' => $request->input('isPinned'),
            'isArchived' => $request->input('isArchived'),
            'background' => $request->input('background'),
            'drawing' => $request->input('drawing')
        ]);



         // Attach labels if provided
         if (isset($validatedData['labels'])) {
            $note->labels()->attach($validatedData['labels']);
        }

        // return response()->json(['message' => 'testing', 'data' => $request->input('drawing')]);

        // $note = Auth::user()->notes()->create($request->all());
        // return response()->json(['message' => 'Added successfully', 'data' => $note]);
        return response()->json(['message' => 'Added successfully', 'data' => $note->load('labels')]);
    }

    // Display the specified post
    public function show($id)
    {
        $note = Auth::user()->notes()->with('labels')->findOrFail($id);
        return response()->json(['data' => $note]);
    }

    // Update the specified post in storage
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'isPinned' => 'nullable|boolean',
            'isArchived' => 'nullable|boolean',
            'background' => 'nullable|string',
            'drawing' => 'nullable|string',
            'labels' => 'array',
            'labels.*' => 'exists:labels,id'
        ]);

        $note = Auth::user()->notes()->findOrFail($id);

        // $note = Auth::user()->notes()->findOrFail($id)->update($request->all()); 
        $note->update([
            'title' => $request->input('title'), 
            'content' => $request->input('content'),
            'isPinned' => $request->input('isPinned'),
            'isArchived' => $request->input('isArchived'),
            'background' => $request->input('background') ?? "",
            'drawing' => $request->input('drawing')
        ]);

        // Sync labels if provided
        if (isset($validatedData['labels'])) {
            $note->labels()->sync($validatedData['labels']);
        }

        return response()->json(['message' => 'Updated successfully', 'data' => $note->load('labels')]);
    }

    // REMEMBER: Please use post method to update the image
    // ROUTE SHOULD BE: api/note-image/{id}_method=PUT
    public function updateImage(Request $request, $id) {
        $validatedData = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $note = Auth::user()->notes()->findOrFail($id);
        
        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $imagePath = 'images/'.$imageName;
        }
        
        $note->update(["image" => $imagePath]);

        return response()->json(['message' => 'Update successfully', 'data' => $note->load('labels') ]);
    }

    // Remove the specified post from storage
    public function destroy($id)
    {
        $note = Auth::user()->notes()->findOrFail($id);
        $note->delete();
        return response()->json(['message' => 'Note deleted successfully']);
    }

    
      /**
     * Delete multiple items by IDs.
     */
    public function deleteBulk(Request $request)
    {
        $itemIds = $request->input('item_ids');

        if (!is_array($itemIds) || empty($itemIds)) {
            return response()->json(['message' => 'Invalid request. Provide an array of item IDs.'], 400);
        }

        // Find items that exist
        $items = Auth::user()->notes()->whereIn('id', $itemIds)->get();

        if ($items->isEmpty()) {
            return response()->json(['message' => 'No items found to delete.'], 404);
        }

        // Collect IDs that were found and delete them
        $deletedCount = Auth::user()->notes()->whereIn('id', $itemIds)->delete();

        // Determine failed IDs
        $foundIds = $items->pluck('id')->toArray();
        $failedIds = array_diff($itemIds, $foundIds);

        return response()->json([
            'message' => 'Bulk delete operation completed.',
            'deleted_count' => $deletedCount,
            'failed_ids' => $failedIds,
        ], 200);
    }
    
    /**
     * Update the  bulk notes.
     */
    public function updateBulk(Request $request)
    {
        $validatedData = $request->validate([
            'isPinned' => 'nullable|boolean',
            'isArchived' => 'nullable|boolean',
            'background' => 'nullable|string',
        ]);
        $itemIds = $request->input('item_ids');

        if (!is_array($itemIds) || empty($itemIds)) {
            return response()->json(['message' => 'Invalid request. Provide an array of item IDs.'], 400);
        }

        $items = Auth::user()->notes()->whereIn('id', $itemIds)->update([
            'isPinned' => $request->input('isPinned'),
            'isArchived' => $request->input('isArchived'),
            'background' => $request->input('background') ?? "",
        ]);
        
        $updatedItems = Auth::user()->notes()->whereIn('id', $itemIds)->get();

        return response()->json([
            'message' => 'Successful',
            'items' => $items,
            'data' => $updatedItems,
        ], 200);
    }
}
