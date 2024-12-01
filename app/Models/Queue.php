<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Queue extends Model
{
    use HasFactory;
    protected $table = 'queues';
    protected $fillable =
        [
            'first_name',
            'last_name',
            'phone_number',
            'service_type',
            'type_duration',
            'postal_office',
            'appointment',
            'qr_code',
        ];

        public function user()
        {
            return $this->belongsTo(User::class, 'user_id', 'id');
        }
}
