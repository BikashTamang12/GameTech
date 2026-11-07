<?php

namespace App\Http\Controllers;

use App\Models\PlacedOrder;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    private function formatBase64Image($imageData)
    {
        if (empty($imageData)) {
            return null;
        }

        if (!preg_match('~^([A-Za-z0-9+/=]|data:image/)~', $imageData) || !mb_check_encoding($imageData, 'ASCII')) {
            return base64_encode($imageData);
        }

        return $imageData;
    }

    /**
     * Place new order (matches PlaceOreder.php).
     */
    public function placeOrder(Request $request)
    {
        $productId = $request->input('product_id');
        $title = $request->input('title');
        $price = $request->input('price');
        $quantity = $request->input('quantity', 1);
        $mainImage = $request->input('main_image');
        $receiverName = $request->input('recievername');
        $receiverPhone = $request->input('recieverphone');
        $receiverAddress = $request->input('recieveraddress');
        $paymentMode = $request->input('paymentMode', 'Cash on Delivery');
        $custId = $request->input('custId') ?? $request->input('id');

        if (!$productId || !$title || !$price || !$receiverName || !$receiverPhone || !$receiverAddress) {
            return response()->json([
                'status' => 'error',
                'message' => 'All fields are required.'
            ]);
        }

        if ($request->hasFile('main_image')) {
            $mainImage = base64_encode(file_get_contents($request->file('main_image')->getRealPath()));
        }

        $order = PlacedOrder::create([
            'product_id' => $productId,
            'title' => $title,
            'price' => $price,
            'quantity' => $quantity,
            'main_image' => $mainImage,
            'recievername' => $receiverName,
            'recieverphone' => $receiverPhone,
            'recieveraddress' => $receiverAddress,
            'paymentMode' => $paymentMode,
            'id' => $custId,
            'status' => 'Pending',
            'order_date' => now()->toDateString(),
        ]);

        if ($order) {
            return response()->json([
                'status' => 'success',
                'message' => 'Order placed successfully.'
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Failed to place order.'
        ]);
    }

    /**
     * Fetch all active orders for admin (matches FetchOrders.php).
     */
    public function fetchAllOrders()
    {
        $orders = PlacedOrder::where(function ($q) {
            $q->whereNull('status')
              ->orWhere('status', '!=', 'Cancelled');
        })->where(function ($q) {
            $q->whereNull('customer_status')
              ->orWhere('customer_status', '!=', 'Canceled');
        })->get();

        if ($orders->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No orders found'
            ]);
        }

        $data = $orders->map(function ($row) {
            return [
                'order_id' => $row->order_id,
                'title' => $row->title,
                'main_image' => $this->formatBase64Image($row->main_image),
                'price' => $row->price,
                'recievername' => $row->recievername,
                'recieverphone' => $row->recieverphone,
                'recieveraddress' => $row->recieveraddress,
                'quantity' => $row->quantity,
                'paymentMode' => $row->paymentMode,
                'delivery_date' => $row->delivery_date,
                'status' => $row->status,
                'customer_status' => $row->customer_status,
            ];
        });

        return response()->json($data);
    }

    /**
     * Fetch orders placed by a specific customer (matches fetchorderCustomer.php).
     */
    public function fetchCustomerOrders(Request $request)
    {
        $custId = $request->input('id') ?? $request->query('id');

        if (!$custId) {
            return response()->json([
                'success' => false,
                'message' => 'Customer ID is required'
            ]);
        }

        $orders = PlacedOrder::where('id', $custId)
            ->where(function ($q) {
                $q->whereNull('customer_status')
                  ->orWhere('customer_status', '!=', 'Canceled');
            })->get();

        $data = $orders->map(function ($order) {
            $deliveryDate = $order->delivery_date;
            if ($order->status === 'Cancelled') {
                $deliveryDate = 'Canceled';
            } elseif (empty($deliveryDate)) {
                $deliveryDate = 'Pending';
            }

            return [
                'order_id' => $order->order_id,
                'title' => $order->title,
                'main_image' => $this->formatBase64Image($order->main_image),
                'price' => $order->price,
                'delivery_date' => $deliveryDate,
                'status' => $order->status,
                'quantity' => $order->quantity,
            ];
        });

        return response()->json([
            'success' => true,
            'orders' => $data,
        ]);
    }

    /**
     * Admin cancels an order (matches cancelOrder.php).
     */
    public function cancelOrderByAdmin(Request $request)
    {
        $orderId = $request->input('orderId') ?? $request->input('order_id');

        if (!$orderId) {
            return response()->json(['message' => 'Order ID is required'], 400);
        }

        $order = PlacedOrder::where('order_id', $orderId)->first();
        if ($order) {
            $order->status = 'Cancelled';
            $order->save();
            return response()->json(['message' => 'Order cancelled successfully']);
        }

        return response()->json(['message' => 'Order not found']);
    }

    /**
     * Customer cancels their order (matches addorderStatusCustomer.php).
     */
    public function cancelOrderByCustomer(Request $request)
    {
        $orderId = $request->input('order_id') ?? $request->input('orderId');

        if (!$orderId) {
            return response()->json(['success' => false, 'message' => 'Order ID not provided']);
        }

        $order = PlacedOrder::where('order_id', $orderId)->first();
        if ($order) {
            if ($order->customer_status === 'Canceled') {
                return response()->json(['success' => false, 'message' => 'Order not found or already canceled.']);
            }

            $order->customer_status = 'Canceled';
            $order->save();

            return response()->json(['success' => true, 'message' => 'Order has been canceled.']);
        }

        return response()->json(['success' => false, 'message' => 'Order not found or already canceled.']);
    }

    /**
     * Fetch canceled orders for admin (matches fetchCanceledOders.php).
     */
    public function fetchCanceledOrders()
    {
        $orders = PlacedOrder::where('customer_status', 'Canceled')->get();

        if ($orders->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No canceled orders found'
            ]);
        }

        $data = $orders->map(function ($row) {
            return [
                'order_id' => $row->order_id,
                'title' => $row->title,
                'main_image' => $this->formatBase64Image($row->main_image),
                'price' => $row->price,
                'customer_status' => $row->customer_status,
                'recievername' => $row->recievername,
                'recieverphone' => $row->recieverphone,
            ];
        });

        return response()->json($data);
    }

    /**
     * Update delivery date (matches deliverydate.php).
     */
    public function updateDeliveryDate(Request $request)
    {
        $orderId = $request->input('orderId') ?? $request->input('order_id');
        $newDate = $request->input('newDate') ?? $request->input('delivery_date');

        if (!$orderId || !$newDate) {
            return response()->json(['status' => 'error', 'message' => 'Order ID and date required']);
        }

        $order = PlacedOrder::where('order_id', $orderId)->first();
        if ($order) {
            $order->delivery_date = $newDate;
            $order->save();

            return response()->json(['status' => 'success', 'message' => 'Delivery date updated successfully']);
        }

        return response()->json(['status' => 'error', 'message' => 'Failed to update delivery date']);
    }

    /**
     * Update order date (matches oderDate.php).
     */
    public function updateOrderDate(Request $request)
    {
        $orderId = $request->input('order_id') ?? $request->input('orderId');
        $orderDate = $request->input('order_date');

        $order = PlacedOrder::where('order_id', $orderId)->first();
        if ($order) {
            $order->order_date = $orderDate;
            $order->save();
            return response('Order date updated successfully');
        }

        return response('Error updating record: Order not found', 404);
    }
}
