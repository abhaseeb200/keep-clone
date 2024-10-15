<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotesController extends Controller
{
    public function index()
    {
        $notes = Auth::user()->notes()->get();
        return response()->json($notes);
    }

    // Store a newly created post in storage
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('images', 'public');
        }
        
        $note = Auth::user()->notes()->create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'image' => $imagePath,
        ]);

        // $note = Auth::user()->notes()->create($request->all());
        return response()->json(['message' => 'Added successfully', 'data' => $note]);
    }

    // Display the specified post
    public function show($id)
    {
        $note = Auth::user()->notes()->findOrFail($id);
        return response()->json($note);
    }

    // Update the specified post in storage
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $note = Auth::user()->notes()->findOrFail($id);
        $note->update($request->all());
        return response()->json(['message' => 'Post updated successfully', 'post' => $note]);
    }

    // Remove the specified post from storage
    public function destroy($id)
    {
        $note = Auth::user()->notes()->findOrFail($id);
        $note->delete();
        return response()->json(['message' => 'Post deleted successfully']);
    }
}
