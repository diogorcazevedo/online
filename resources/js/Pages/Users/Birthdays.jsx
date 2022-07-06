import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, Link, usePage} from "@inertiajs/inertia-react";


export default function Birthdays({users}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    return (
       <>
           <Head title="Users" />
           <Auth auth={auth} errors={errors} >
               <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                   <div className="shadow mt-6 p-4 flex flex-row">
                       <div className="basis-1/3">
                           <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Aniversariantes</h2>
                       </div>
                   </div>
                   <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                       <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                       <tr className="divide-x divide-y divide-gray-200">
                           <th  className="text-gray-900 p-4">ID</th>
                           <th  className="text-gray-900 p-4">Name</th>
                           <th  className="text-gray-900 p-4">Dia</th>
                           <th  className="text-gray-900 p-4">Cel</th>
                           <th  className="text-gray-900 p-4">Edit</th>
                       </tr>
                       </thead>
                       <tbody className="divide-y divide-x divide-gray-200 bg-white">
                       {users.map((user) => (
                           <tr key={user.id} className="divide-x divide-y divide-gray-200">
                               <td className="text-sm p-2"><a href="#">{user.id}</a></td>
                               <td className="text-sm p-2">
                                   <Link href={route('user.edit',{user:user.id})}>
                                   {user.name}
                                   </Link>
                               </td>
                               <td className="text-sm p-2">{user.aniversario}</td>
                               <td className="text-sm p-2">{user.cel}</td>
                               <td className="text-sm text-center items-center justify-center p-2">
                                   <Link href={route('user.edit',{user:user.id})} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                       editar
                                   </Link>
                               </td>
                           </tr>
                       ))}
                       </tbody>
                   </table>
               </div>
           </Auth>
       </>
    );
}
