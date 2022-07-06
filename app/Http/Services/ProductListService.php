<?php
/**
 * Created by PhpStorm.
 * User: diogoazevedo
 * Date: 23/11/15
 * Time: 22:30
 */

namespace App\Http\Services;
use App\Models\Product;

class ProductListService
{


    public function filter($search,$collection,$category)
    {

        if($collection != null AND $collection !=0){

            $products = Product::where('collection_id',$collection)->with('images','stock')->orderBy('category_id','asc')->orderBy('name','asc')->get();

        }elseif($category != null){

            $products = Product::where('category_id',$category)->with('images','stock')->orderBy('name','desc')->get();

        }else{
            if (empty($search)) {

                $products = Product::with('images','stock')->take(10)->get();

            }else{
                $products = Product::ofSearch($search)->get();

            }
        }

        return $products;
    }

}
