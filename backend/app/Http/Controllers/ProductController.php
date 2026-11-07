<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Helper to normalize base64 image strings.
     */
    private function formatBase64Image($imageData)
    {
        if (empty($imageData)) {
            return null;
        }

        // If string contains non-printable binary characters, base64_encode it
        if (!preg_match('~^([A-Za-z0-9+/=]|data:image/)~', $imageData) || !mb_check_encoding($imageData, 'ASCII')) {
            return base64_encode($imageData);
        }

        return $imageData;
    }

    /**
     * Get all products (matches getproduct.php and getProducts.php).
     */
    public function index()
    {
        $products = Product::all();

        $data = $products->map(function ($product) {
            return [
                'product_id' => $product->product_id,
                'title' => $product->title,
                'category' => $product->category,
                'price' => $product->price,
                'description' => $product->description,
                'main_image' => $this->formatBase64Image($product->main_image),
                'sub_image' => $this->formatBase64Image($product->sub_image),
            ];
        });

        return response()->json($data);
    }

    /**
     * Get products for Customer Home Page (matches customerMainPageProductlist.php).
     */
    public function homepageProducts()
    {
        $products = Product::select('product_id', 'title', 'main_image', 'price')->get();

        if ($products->isEmpty()) {
            return response()->json(['error' => 'No products found']);
        }

        $data = $products->map(function ($product) {
            return [
                'product_id' => $product->product_id,
                'title' => $product->title,
                'main_image' => $this->formatBase64Image($product->main_image),
                'price' => $product->price,
            ];
        });

        return response()->json($data);
    }

    /**
     * Get single product details (matches mainCardDetails.php).
     */
    public function productDetails(Request $request, $id = null)
    {
        $productId = $id ?? $request->query('product_id') ?? $request->input('product_id');

        if (!$productId) {
            return response()->json(['error' => 'Product ID is required'], 400);
        }

        $product = Product::where('product_id', $productId)->first();

        if (!$product) {
            return response()->json(['error' => 'Product not found']);
        }

        return response()->json([
            'product_id' => $product->product_id,
            'title' => $product->title,
            'category' => $product->category,
            'price' => $product->price,
            'description' => $product->description,
            'main_image' => $this->formatBase64Image($product->main_image),
            'sub_image' => $this->formatBase64Image($product->sub_image),
        ]);
    }

    /**
     * Filter products by category (matches filterProduct.php).
     */
    public function filterByCategory(Request $request, $category = null)
    {
        $cat = $category ?? $request->query('category') ?? $request->input('category');

        if (empty($cat)) {
            return response()->json(['error' => 'Category is required.']);
        }

        $products = Product::whereRaw('LOWER(category) = ?', [strtolower($cat)])->get();

        if ($products->isEmpty()) {
            return response()->json(['error' => 'No products found for the specified category.']);
        }

        $data = $products->map(function ($product) {
            return [
                'product_id' => $product->product_id,
                'title' => $product->title,
                'category' => $product->category,
                'price' => $product->price,
                'description' => $product->description,
                'main_image' => $this->formatBase64Image($product->main_image),
                'sub_image' => $this->formatBase64Image($product->sub_image),
            ];
        });

        return response()->json($data);
    }

    /**
     * Add new product (matches addProduct.php).
     */
    public function store(Request $request)
    {
        $title = $request->input('title');
        $category = $request->input('category');
        $price = $request->input('price');
        $description = $request->input('description', '');

        $mainImageBase64 = null;
        if ($request->hasFile('main_image')) {
            $file = $request->file('main_image');
            $mainImageBase64 = base64_encode(file_get_contents($file->getRealPath()));
        } elseif ($request->input('main_image')) {
            $mainImageBase64 = $request->input('main_image');
        } else {
            return response()->json(['error' => 'Main image upload error']);
        }

        $subImageBase64 = null;
        if ($request->hasFile('sub_image')) {
            $file = $request->file('sub_image');
            $subImageBase64 = base64_encode(file_get_contents($file->getRealPath()));
        } elseif ($request->input('sub_image')) {
            $subImageBase64 = $request->input('sub_image');
        }

        $product = Product::create([
            'title' => $title,
            'category' => $category,
            'price' => $price,
            'description' => $description,
            'main_image' => $mainImageBase64,
            'sub_image' => $subImageBase64,
        ]);

        if ($product) {
            return response()->json(['message' => 'Product added successfully']);
        }

        return response()->json(['error' => 'Failed to add product']);
    }

    /**
     * Update product (matches updateProduct.php and editProduct.php).
     */
    public function update(Request $request, $id = null)
    {
        $productId = $id ?? $request->input('product_id') ?? $request->input('id');

        if (!$productId) {
            return response()->json(['message' => 'Invalid request']);
        }

        $product = Product::where('product_id', $productId)->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found']);
        }

        if ($request->has('title')) {
            $product->title = $request->input('title');
        }
        if ($request->has('category')) {
            $product->category = $request->input('category');
        }
        if ($request->has('price')) {
            $product->price = $request->input('price');
        }
        if ($request->has('description')) {
            $product->description = $request->input('description');
        }

        if ($request->hasFile('main_image')) {
            $product->main_image = base64_encode(file_get_contents($request->file('main_image')->getRealPath()));
        } elseif ($request->filled('main_image')) {
            $product->main_image = $request->input('main_image');
        }

        if ($request->hasFile('sub_image')) {
            $product->sub_image = base64_encode(file_get_contents($request->file('sub_image')->getRealPath()));
        } elseif ($request->filled('sub_image')) {
            $product->sub_image = $request->input('sub_image');
        }

        $product->save();

        return response()->json(['message' => 'Product updated successfully']);
    }

    /**
     * Delete product (matches deleteProduct.php).
     */
    public function destroy(Request $request, $id = null)
    {
        $productId = $id ?? $request->input('id') ?? $request->query('id') ?? $request->input('product_id');

        if (!$productId) {
            return response()->json(['message' => 'Product ID not provided']);
        }

        $deleted = Product::where('product_id', $productId)->delete();

        if ($deleted) {
            return response()->json(['message' => 'Product deleted successfully']);
        }

        return response()->json(['message' => 'Failed to delete product']);
    }
}
