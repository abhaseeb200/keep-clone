<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    //DISPLAY FALSE/TRUE INSTEAD OF 0/1
    protected $casts = [
        'isPinned' => 'boolean',
        'isArchived' => 'boolean',
    ];

    protected $fillable = [
        'title',
        'content',
        'image',
        'isPinned',
        'isArchived',
        'background_color',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function labels()
    {
        return $this->belongsToMany(Label::class, 'label_note');
    }
}