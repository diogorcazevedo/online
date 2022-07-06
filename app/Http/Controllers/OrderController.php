<?php

namespace App\Http\Controllers;


use App\Http\Requests\OrderRequest;
use App\Http\Services\ProductListService;
use App\Http\Services\UserService;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\OrderItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;


class OrderController extends Controller
{

    /**
     * @var UserService
     */
    private $userService;

    /**
     * @var ProductListService
     */
    private $productListService;


    public function __construct(UserService $userService,ProductListService $productListService)

    {
        $this->userService = $userService;
        $this->productListService = $productListService;
    }


    public function client(Request $request)
    {
        $search = $request->input('search');
        $users = $this->userService->filter($search);

        return Inertia::render('Orders/Client',[
            'users'=>$users,
            'search'=>$search,
        ]);

    }

    public function store(User $user)
    {

        $order = Order::create([
            'user_id'       =>$user->id,
            'vendedor'      =>auth()->user()->id,
            'operador'      =>auth()->user()->id,
            'total'         => NULL,
            'origem'        => 1,
            'centro'           => 2
        ]);

        return redirect()->route('order.product',['order'=>$order->id])->with('message', 'Operação realizada com sucesso');
    }

    public function product(Request $request,Order $order,$collection = null,$category = null)
    {

        $search         = $request->input('search');
        $products       = $this->productListService->filter($search,$collection,$category);
        $categories     = Category::orderBy('name','asc')->get();
        $collections    = Collection::orderBy('name','asc')->get();
        $orderItems     =$order->items()->with('product')->get();

        return Inertia::render('Orders/Products',[
            'products'      =>$products,
            'order'         =>$order,
            'orderItems'    =>$orderItems,
            'search'        =>$search,
            'categories'    =>$categories,
            'collections'   =>$collections,
        ]);

    }



    public function add(Order $order, Product $product)
    {

        OrderItems::create([
            'order_id' =>$order->id,
            'product_id' =>$product->id,
            //'price'=> $product->stock->getOriginal('offered_price'),
            'price'=> $product->stock->offered_price,
            'qtd'=> 1,
        ]);

        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function remove(OrderItems $orderItem)
    {

        $orderItem->delete();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');

    }


    public function edit(Order $order)
    {
        return Inertia::render('Orders/Edit',[
            'order'         =>$order,
        ]);
    }


    public function update(OrderRequest $request, Order $order)
    {

        $data = $request->all();
        $data['centro']     =   2;

        if (isset($data['data'])){

            $str                =   $data['data'];
            $explode            =   explode("-",$str);
            $data['mes']        =   $explode[1];
            $data['ano']        =   $explode[2];

        }

        $data['previsao']   =   ($data['previsao'] != '')? data_reverse_traco($data['previsao']) : null;
        $data['data']       =   ($data['data'] != '')? data_reverse_traco($data['data']) : null;
        $order->update($data);


        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


    public function links(Order $order)
    {

        return Inertia::render('Orders/Links',[
            'order'         =>$order,
        ]);

    }


    public function destroy(Order $order)
    {
        $order->delete();
        return redirect()->back()->with('message', 'Operação realizada com sucesso');
    }


}
