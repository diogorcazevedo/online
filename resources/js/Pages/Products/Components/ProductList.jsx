import {Link} from "@inertiajs/inertia-react";
import React from "react";
import ModalChangePrice from "@/Pages/Products/Components/ModalChangePrice";
import ModalStorePrice from "@/Pages/Products/Components/ModalStorePrice";

export default function ProductList({products}) {

    function price(product) {
        if (product.stock?.offered_price) {
            return <ModalChangePrice product={product}/>
        }else{
            return <ModalStorePrice product={product}/>
        }
    }
    return (
        <>
            <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                <tr className="divide-x divide-y divide-gray-200">
                    <th  className="text-gray-900 p-2 py-6">Name</th>
                    <th  className="text-gray-900 p-2 py-6">Valor</th>
                    <th  colSpan= "3" className="text-gray-900 p-2 py-6">
                        <Link href={route('product.create')} className="inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            NOVO
                        </Link>
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-x divide-gray-200 bg-white">
                {products.map((product) => (
                    <tr key={product.id} className="divide-x divide-y divide-gray-200">
                        <td className="text-sm p-2">{product.name}</td>
                        <td className="text-sm p-2">{product.stock?.offered_price}</td>
                        <td className="text-sm text-center items-center justify-center p-2">
                            <Link href={route('product.edit',{product:product.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                editar
                            </Link>
                        </td>
                        <td>
                            <Link href={route('product.images.index',{product:product.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                images
                            </Link>
                        </td>
                        <td>

                            { price(product)}
                            {/*
                             <Link href={route('product.price.change',{product:product.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                preço
                            </Link>

                            */}

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>

    );
}
