<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Answer extends Model
{
    use HasFactory;
    protected $table = 'answers';
    protected $fillable =
        [
            'user_id',
            'question_id',
            'answer',
            'picture',
        ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id', 'id');
    }

}
