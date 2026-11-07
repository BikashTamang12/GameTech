<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'cart';
    protected $primaryKey = 'cart_id';

    protected $fillable = [
        'product_id',
        'title',
        'price',
        'quantity',
        'main_image',
        'id', // customer id
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id', 'id');
    }
}
