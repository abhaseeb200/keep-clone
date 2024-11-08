<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\User;
use App\Models\Label;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LabelController extends Controller
{
    /**
     * Display a listing of the labels for the authenticated user.
     */
    public function index()
    {
        $userId = Auth::id();
        $data = Label::forUser($userId)->get();

        return response()->json($data);
    }

    /**
     * Store a newly created label in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'is_public' => 'boolean',
        ]);

        $label = Label::create([
            'name' => $request->name,
            'user_id' => Auth::id(),
            'is_public' => false            
        ]);

        return response()->json($label, 201);
    }

    /**
     * Display the specified label if it belongs to the user or is public.
     */
    public function show($id)
    {
        $label = Label::where(function ($query) {
            $query->where('user_id', Auth::id())->orWhere('is_public', true);
        })->findOrFail($id);

        return response()->json($label);
    }

    /**
     * Update the specified label.
     */
    public function update(Request $request, $id)
    {
        $label = Label::where('user_id', Auth::id())->findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'is_public' => 'boolean',
        ]);

        $label->update($request->only('name', 'is_public'));

        return response()->json($label);
        // return response()->json($id);
    }

    /**
     * Remove the specified label from storage.
     */
    public function destroy($id)
    {
        $label = Label::where('user_id', Auth::id())->findOrFail($id);
        $label->delete();

        return response()->json(['message' => 'Label deleted successfully']);
    }
}