<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
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
     * Add product to cart (matches addToCartBack.php).
     */
    public function addToCart(Request $request)
    {
        $productId = $request->input('product_id');
        $title = $request->input('title');
        $price = $request->input('price');
        $customerId = $request->input('id');
        $mainImage = $request->input('main_image');

        if (!$productId || !$title || !$price || !$customerId) {
            return response()->json([
                'success' => false,
                'message' => 'Missing required data or image not uploaded correctly.'
            ]);
        }

        if ($request->hasFile('main_image')) {
            $mainImage = base64_encode(file_get_contents($request->file('main_image')->getRealPath()));
        }

        $cart = Cart::create([
            'product_id' => $productId,
            'title' => $title,
            'price' => $price,
            'quantity' => $request->input('quantity', 1),
            'main_image' => $mainImage,
            'id' => $customerId,
        ]);

        if ($cart) {
            return response()->json([
                'success' => true,
                'message' => 'Product added to cart successfully.'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to add product to cart.'
        ]);
    }

    /**
     * Get cart items by customer id (matches getCartItem.php).
     */
    public function getCartItems(Request $request)
    {
        $customerId = $request->input('id') ?? $request->query('id');

        if (!$customerId) {
            return response()->json([
                'success' => false,
                'message' => 'Customer ID is required.'
            ]);
        }

        $items = Cart::where('id', $customerId)->get();

        if ($items->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No items found in the cart.'
            ]);
        }

        $data = $items->map(function ($item) {
            return [
                'cart_id' => $item->cart_id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'title' => $item->title,
                'price' => $item->price,
                'main_image' => $this->formatBase64Image($item->main_image),
            ];
        });

        return response()->json([
            'success' => true,
            'items' => $data,
        ]);
    }

    /**
     * Update cart item quantity (matches UpdateCardItem.php).
     */
    public function updateQuantity(Request $request)
    {
        $cartId = $request->input('cart_id');
        $quantity = $request->input('quantity');

        if (!$cartId || !isset($quantity)) {
            return response()->json(['success' => false, 'error' => 'Cart ID and quantity required']);
        }

        $item = Cart::where('cart_id', $cartId)->first();
        if (!$item) {
            return response()->json(['success' => false, 'error' => 'Item not found']);
        }

        $item->quantity = $quantity;
        $item->save();

        return response()->json(['success' => true]);
    }

    /**
     * Delete cart item (matches DeleteCartItem.php).
     */
    public function deleteItem(Request $request)
    {
        $cartId = $request->input('cart_id');

        if (!$cartId) {
            return response()->json(['success' => false, 'error' => 'Cart ID required']);
        }

        $deleted = Cart::where('cart_id', $cartId)->delete();

        if ($deleted) {
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'error' => 'Item not found']);
    }
}
