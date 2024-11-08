<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Label extends Model
{
    use HasFactory;
    
    //DISPLAY FALSE/TRUE INSTEAD OF 0/1
    protected $casts = [
        'is_public' => 'boolean',
    ];

    protected $fillable = ['name', 'user_id', 'is_public'];

    /**
     * Relationship with Notes.
     * A label can belong to many notes.
     */
    // public function notes()
    // {
    //     return $this->belongsToMany(Note::class, 'label_note', 'label_id', 'note_id');
    // }

    /**
     * Relationship with User.
     * A label belongs to a user.
    */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope to get labels for a specific user, including public labels.
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId)
                     ->orWhere('is_public', true);
    }

    public function notes()
    {
        return $this->belongsToMany(Note::class, 'label_note');
    }
}
