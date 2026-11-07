<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlacedOrder extends Model
{
    use HasFactory;

    protected $table = 'placed_oders';
    protected $primaryKey = 'order_id';

    protected $fillable = [
        'product_id',
        'title',
        'price',
        'quantity',
        'main_image',
        'recievername',
        'recieverphone',
        'recieveraddress',
        'paymentMode',
        'delivery_date',
        'order_date',
        'status',
        'customer_status',
        'id', // customer id
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'id', 'id');
    }
}
