import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from "@inertiajs/inertia-react";

export default function Links({order}) {

    const {auth} = usePage().props
    const { errors } = usePage().props
    const link = "https://www.carlabuaiz.co/payment/pagar_me/checkout/" + order.id
    return (
        <>
            <Head title="Order" />
            <Auth auth={auth} errors={errors} >

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="shadow mt-6 p-4 flex flex-row">
                        <div className="basis-3/3">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Clientes</h2>
                        </div>
                    </div>
                    <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                        <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                        <tr className="divide-x divide-y divide-gray-200">
                            <th  className="text-gray-900 p-2">id</th>
                            <th  className="text-gray-900 p-2">url</th>
                            <th  className="text-gray-900 p-2">link</th>

                        </tr>
                        </thead>
                        <tbody className="divide-y divide-x divide-gray-200 bg-white">

                            <tr className="divide-x divide-y divide-gray-200">
                                <td className="text-sm p-2">{order.id}</td>
                                <td className="text-sm p-2">https://www.carlabuaiz.co/payment/pagar_me/checkout/{order.id}</td>
                                <td className="text-sm p-2">
                                    <a href={link}
                                        target="_blank"
                                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                        abrir
                                    </a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </Auth>
        </>
    );
}
