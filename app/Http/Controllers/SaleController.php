<?php

namespace App\Http\Controllers;


use App\Repositories\OrderRepository;
use Inertia\Inertia;


class SaleController extends Controller
{

    private OrderRepository $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function index($year=NULL,$month = NULL)
    {

        if ($year == NULL){
            $year = date('Y');
        }
        if ($month == NULL){
            $month = date("m");
        }

        $orders = $this->orderRepository->orderByYearAndMonth($year,$month);
        $total  = $this->orderRepository->totalByYearAndMonth($year,$month);


        return Inertia::render('Sales/Index',[
            'orders'=>$orders,
            'total'=>$total,
            'month'=>$month,
            'year' =>$year,
        ]);

    }
}
