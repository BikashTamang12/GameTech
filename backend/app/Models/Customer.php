<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Customer extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table = 'customer';
    protected $primaryKey = 'id';

    protected $fillable = [
        'username',
        'address',
        'phonenumber',
        'email',
        'password',
        'Role',
    ];

    protected $hidden = [
        'password',
    ];
}
