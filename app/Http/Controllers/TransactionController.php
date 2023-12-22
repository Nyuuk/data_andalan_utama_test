<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class TransactionController extends Controller
{
    // Read
    public function showAll()
    {
        $transactions = Transaction::with('product')->get();
        return response()->json($transactions, 200);
    }
    // Read
    public function showPag(Request $request,$perPage = 10, $page = 1)
    {
        $searchTerm = $request->query('search');
        // Query pencarian di beberapa tabel
        if ($searchTerm)
        {
            $query = DB::table('transactions')
                ->orWhere('reference_no', 'like', '%' . $searchTerm . '%')
                ->orWhere('price', 'like', '%' . $searchTerm . '%')
                ->orWhere('quantity', 'like', '%' . $searchTerm . '%')
                ->orWhere('payment_amount', 'like', '%' . $searchTerm . '%')
                ->orWhereIn('id', function ($subquery) use ($searchTerm) {
                    $subquery->select('id')
                        ->from('products')
                        ->where('name', 'like', '%' . $searchTerm . '%');
                })
                ;

            $products = $query->paginate($perPage, ['*'], 'page', $page);

            return response()->json($products, 200);
        }

        $posts = Transaction::with('product')->paginate($perPage, ['*'], 'page', $page);
        // $posts->product;

        return response()->json($posts, 200);
    }
    // Create
    public function create(Request $request)
    {
        $request->validate([
            'quantity' => 'required|numeric',
            'product_id' => 'required|numeric'
        ]);

        $product = Product::find($request->product_id);

        if (!$product)
        {
            return response()->json(['message'=>'Product Not Found'], 404);
        }

        $refrence_no = $this->getReference_no($request->quantity, $product->price, $request->quantity * $product->price);

        if ($refrence_no['status'] === false)
        {
            return response()->json(['message'=>'failed to get reference_no', 'response' => $refrence_no], 400);
        }

        $data = [
            'price' => $product->price,
            'payment_amount' => $request->quantity * $product->price,
            'reference_no' => $refrence_no['no'],
            'product_id' => $request->product_id,
            'quantity' => $request->quantity
        ];

        if ($product->stock < $request->quantity)
        {
            return response()->json(['message'=>'Stock Not Available'], 400);
        }

        $product->stock = $product->stock - $request->quantity;
        $product->save();

        $transaction = Transaction::create($data);

        if ($transaction)
        {
            return response()->json(['message'=>'Success Add', 'Transaction'=>$transaction], 200);
        }
        return response()->json(['message'=>'Failed Add'], 400);
    }

    protected function getReference_no($quantity, $price, $payment_amoount)
    {
        $data = [
            'quantity' => $quantity,
            'price' => $price,
            'payment_amount' => $payment_amoount
        ];

        $xSignature = hash('sha256', 'POST:DATAUTAMA');

        $response = Http::withHeaders([
            'x-api-key' => 'DATAUTAMA',
            'x-signature' => $xSignature,
        ])->post('http://tes-skill.datautama.com/test-skill/api/v1/transactions', $data);

        $responseData = $response->json();

        if ($response->successful())
        {
            if (!$responseData['code'] == '20000')
            {
                return ['status'=> false, 'response'=>$responseData];
            }
            $refrence_no = $responseData['data']['reference_no'];
            return ['status' => true, 'no'=>$refrence_no];
        }
        return ['status'=> false, 'response'=>$responseData];
    }


}
