<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\OperadoraCartoes;
use App\Models\Product;


class OrderRepository
{


    private OrderItemsRepository $orderItemsRepository;

    public function __construct(OrderItemsRepository $orderItemsRepository)
    {

        $this->orderItemsRepository = $orderItemsRepository;
    }

    public function orderByYearAndMonth($year,$month){
        return  Order::where('ano',$year)
                        ->where('status', 2)
                        ->where('mes',$month)
                        ->where('centro',2)
                        ->with('user')
                        ->get();


    }

    public function totalByYearAndMonth($year,$month){
        return  Order::where('ano',$year)
                        ->where('status', 2)
                        ->where('mes',$month)
                        ->where('centro',2)
                        ->sum('total');


    }

    public function orderOpenByYearAndMonth($year,$month){
        return  Order::where('ano',$year)
            ->where('status','!=',  2)
            ->where('mes',$month)
            ->where('centro',2)
            ->with('user')
            ->get();
    }

    public function totalOpenByYearAndMonth($year,$month){
        return  Order::where('ano',$year)
            ->where('status','!=',  2)
            ->where('mes',$month)
            ->where('centro',2)
            ->sum('total');
    }

    public function store($user,$total=null,$operadora_cartoes=null){

        $order = Order::create([
            'user_id'               => $user->id,
            'operadora_cartoes'     => $operadora_cartoes,
            'vendedor'              => (!auth()->check())? 1: auth()->user()->id,
            'operador'              => (!auth()->check())? 1: auth()->user()->id,
            'total'                 => $total,
            'origem'                => 1,
            'entregue'              => 0,
            'tipo_entrega'          => 1,
            'ponto'                 => (!auth()->check())? 2: auth()->user()->currentTeam->id,
            'data'                  => date("Y-m-d"),
            'mes'                   => date("m"),
            'ano'                   => date("Y"),
            'notafiscal'            => 0,
            'status'                => 0,
        ]);

        return $order;
    }

    public function update($order){

        $order->mes                 =   date("m");
        $order->ano                 =   date("Y");
        $order->data                =   date('Y-m-d');
        $order->pagamento           = 1;
        $order->save();

        $order = Order::find($order->id);
        return $order;
    }


}
