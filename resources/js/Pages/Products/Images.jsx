import React from 'react';
import Auth from '@/Layouts/Auth';
import {Head, usePage, useForm, Link} from "@inertiajs/inertia-react";


export default function Images({product,images,types}) {

    const {auth} = usePage().props
    const { errors } = usePage().props

    const { data, setData, post, progress,processing } = useForm({
        image_type_id: '',
        img: '',
    })

    function submit(e) {
        e.preventDefault()
        post(route('product.image.store',{product:product.id}))
    }

    function renderImage(image){
        let imgTag =   <img
                            src={"/online/storage/images/" + image.id + '.' + image.extension}
                            className="w-full h-full object-center object-cover group-hover:opacity-75"
                        />;

        if (image.path != null) {
            imgTag =   <img
                            src={"https://carlabuaizjoias.s3.sa-east-1.amazonaws.com/"+image.path}
                            className="w-full h-full object-center object-cover group-hover:opacity-75"
                        />;
        }
        return imgTag
    }


    return (
        <>
            <Head title="Products" />
            <Auth auth={auth} errors={errors} >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Customers also purchased</h2>
                            <form onSubmit={submit}>
                                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                                    <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                                        <div className="sm:col-span-1">
                                            <select
                                                name="image_type_id"
                                                required="required"
                                                id="image_type_id"
                                                onChange={e => setData('image_type_id', e.target.value)}
                                                value={data.image_type_id}
                                                className="max-w-lg block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                            >
                                                <option></option>
                                                {types.map((type, index) => {
                                                    return (
                                                        <option key={type.id} value={type.id}>
                                                            {type.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {errors.image_type_id && <div className="text-red-600">{errors.image_type_id}</div>}
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                                        <div className="sm:col-span-1">
                                            <input
                                                type="file"
                                                defaultValue={data.img}
                                                onChange={e => setData('img', e.target.files[0])}
                                            />
                                            {progress && (
                                                <progress value={progress.percentage} max="100">
                                                    {progress.percentage}%
                                                </progress>
                                            )}
                                            {errors.img && <div className="text-red-600">{errors.img}</div>}
                                        </div>

                                    </div>
                                    <div className="mt-4 flex justify-end pt-6 border-t border-gray-200">
                                        <button
                                            type="submit"
                                            className="bg-teal-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500"
                                            disabled={processing}>
                                            Salvar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:px-8">
                            <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
                                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Imagens do Produto</h2>
                                <a href="#" className="hidden sm:block text-sm font-semibold text-teal-600 hover:text-teal-500">
                                    See everything<span aria-hidden="true"> &rarr;</span>
                                </a>
                            </div>

                            <div className="mt-8 relative">
                                <div className="relative w-full pb-6 -mb-6 overflow-x-auto">
                                    <ul
                                        role="list"
                                        className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-4 lg:gap-x-8"
                                    >
                                        {images.map((image) => (
                                            <li key={image.id} className="w-64 inline-flex flex-col text-center lg:w-auto shadow p-6">
                                                <div className="group relative">
                                                    <div className="w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
                                                        {renderImage(image)}
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex justify-between">
                                                    <div>
                                                        <h3 className="text-sm text-gray-700">
                                                            {image.imageType?.name}
                                                        </h3>
                                                    </div>
                                                    <p>
                                                        <Link
                                                            href={route('product.image.destroy',{image:image.id})}
                                                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                        >
                                                            destroy
                                                        </Link>
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Auth>
        </>
    );
}
