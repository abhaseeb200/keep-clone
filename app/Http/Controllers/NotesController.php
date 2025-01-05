<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\User;
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
        $limit = $request->get('limit', 5);
        $request->validate([
            'query' => 'required|string|max:255',
        ]);

        $query = $request->input('query');

        $results = Auth::user()->notes()
        ->where('title', 'like', "%{$query}%")
        ->orWhere('content', 'like', "%{$query}%")->paginate($limit);

        return response()->json([
            'count' => $results->count(),
            'data' => $results
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
            'labels' => 'array',
            'labels.*' => 'exists:labels,id' //Used to ensure that each label ID provided in the labels
        ]);

        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $imagePath = 'images/'.$imageName;
            // $image = $request->file('image');
            // $imagePath = $image->store('images', 'public');
        }
        
        $note = Auth::user()->notes()->create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'image' => $imagePath ?? "",
            'isPinned' => $request->input('isPinned', false),
            'isArchived' => $request->input('isArchived', false),
            'background' => $request->input('background', '')
        ]);

         // Attach labels if provided
         if (isset($validatedData['labels'])) {
            $note->labels()->attach($validatedData['labels']);
        }

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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'isPinned' => 'nullable|boolean',
            'isArchived' => 'nullable|boolean',
            'background' => 'nullable|string',
            'labels' => 'array',
            'labels.*' => 'exists:labels,id'
        ]);

        $note = Auth::user()->notes()->findOrFail($id);

        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $imagePath = 'images/'.$imageName;
            $note->update(["image" => $imagePath]);
        }

        // $note = Auth::user()->notes()->findOrFail($id)->update($request->all()); 
        $note->update([
            'title' => $request->input('title'), 
            'content' => $request->input('content'),
            'image' => $imagePath ?? "",
            'isPinned' => $request->input('isPinned'),
            'isArchived' => $request->input('isArchived'),
            'background' => $request->input('background') ?? ""
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
        return response()->json(['message' => 'Post deleted successfully']);
    }
}
