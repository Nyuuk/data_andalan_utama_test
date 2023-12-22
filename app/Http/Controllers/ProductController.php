<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    //
    // Read
    public function showAll(Request $request)
    {
        $searchValue = $request->query('search');

        if ($searchValue) {
            $products = Product::where('name', 'like', '%' . $searchValue . '%')->get()->first();
            return response()->json($products, 200);
        }

        $products = Product::all();
        return response()->json($products, 200);
    }
    // Read
    public function showPag(Request $request, $perPage = 10, $page = 1)
    {
        $searchTerm = $request->query('search');
        // Query pencarian di beberapa tabel
        if ($searchTerm)
        {
            $query = DB::table('products')
                ->orWhere('id', 'like', '%' . $searchTerm . '%')
                ->orWhere('name', 'like', '%' . $searchTerm . '%')
                ->orWhere('stock', 'like', '%' . $searchTerm . '%')
                ->orWhere('price', 'like', '%' . $searchTerm . '%')
                ->orWhere('description', 'like', '%' . $searchTerm . '%')
                ;

            $products = $query->paginate($perPage, ['*'], 'page', $page);

            return response()->json($products, 200);
        }


        $posts = Product::paginate($perPage, ['*'], 'page', $page);

        return response()->json($posts, 200);
    }
    // Create
    public function create(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
            'description' => 'string'
        ]);

        $product = Product::create($validate);

        if ($product) {
            return response()->json(['message' => 'Success Add', 'Product' => $product], 200);
        }
        return response()->json(['message' => 'Failed Add'], 400);
    }
    // Update
    public function update(Request $request, $id)
    {
        $validate = $request->validate([
            'name' => 'string',
            'price' => 'numeric',
            'stock' => 'numeric',
            'description' => 'string'
        ]);

        $product = Product::find($id);

        if ($product) {
            $product->update($validate);
            return response()->json(['message' => 'Success Update', 'Product' => $product], 200);
        }
        return response()->json(['message' => 'Failed Update'], 400);
    }
    // Delete
    public function delete($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->delete();
            return response()->json(['message' => 'Success Delete'], 200);
        }
        return response()->json(['message' => 'Failed Delete'], 400);
    }
}
