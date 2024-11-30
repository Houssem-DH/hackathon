<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Question extends Model
{
    use HasFactory;
    protected $table = 'questions';
    protected $fillable =
        [
            'user_id',
            'question_title',
            'question',
            'picture',
        ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function answer()
    {
        return $this->hasMany(Answer::class,'id','question_id');
    }



}
