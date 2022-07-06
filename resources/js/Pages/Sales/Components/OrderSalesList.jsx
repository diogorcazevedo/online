import moment from "moment";
import {Link} from "@inertiajs/inertia-react";
import ModalChangePrice from "@/Pages/Products/Components/ModalChangePrice";
import ModalStorePrice from "@/Pages/Products/Components/ModalStorePrice";
import React from "react";

export default function OrderSalesList({orders}) {



    function entrega(order) {
        if (order.entregue == 1) {
            return  <Link href={route("shipping.index",{order:order.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                        sim
                    </Link>
        }else{
            return  <Link href={route("shipping.index",{order:order.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                        não
                    </Link>
        }
    }
    return (
        <>
             <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                    <tr className="divide-x divide-y divide-gray-200">
                        <th  className="text-gray-900 p-2">ID</th>
                        <th  className="text-gray-900 p-2">Data</th>
                        <th  className="text-gray-900 p-2">Cliente</th>
                        <th  className="text-gray-900 p-2">Valor</th>

                        <th colSpan="2"  className="text-gray-900 p-2">
                            Ações
                        </th>
                        <th  className="text-gray-900 p-2">
                            Entregue
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {orders.map((order) => (
                        <tr key={order.id} className="divide-x divide-y divide-gray-200">
                            <td className="text-sm p-2"><a href="@/Components/OrderList#">{order.id}</a></td>
                            <td className="text-sm p-2">{moment(order.data).format('DD/MM/YYYY')}</td>
                            <td className="text-sm p-2"><a href={route('user.edit',{user:order.user_id})}>{order.user.name}</a></td>
                            <td className="text-sm p-2">{order.total}</td>
                            <td className="text-sm text-center items-center justify-center p-2">
                                <Link href={route("order.edit",{order:order.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    editar
                                </Link>
                            </td>
                            <td className="text-sm text-center items-center justify-center p-2">
                                <Link href={route("order.links",{order:order.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    link
                                </Link>
                            </td>
                            <td className="text-sm text-center items-center justify-center p-2">
                                {entrega(order)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </>

    );
}
