import {Head, useForm,usePage} from '@inertiajs/inertia-react';
import React from 'react';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import Auth from "@/Layouts/Auth";


export default function Edit({order}) {

    const {auth} = usePage().props
    const { flash } = usePage().props

    const { data, setData, post, processing, errors } = useForm({
        data: order.data ? moment(order.data).format('DD-MM-YYYY') : '',
        status: order.status,
        notafiscal: order.notafiscal,
        parcelamento: order.parcelamento,
        pagamento: order.pagamento,
        previsao: order.previsao ? moment(order.previsao).format('DD-MM-YYYY') : '',
        canal: order.canal,
        total: order.total,
    })

    function submit(e) {
        e.preventDefault()
        post(route("order.update",{order:order.id}));

    }

    return (
        <>
            <Head title="Order" />
            <Auth auth={auth} errors={errors} >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                {flash.message && (
                    <div className="bg-teal-600 text-white"><p>{flash.message}</p></div>
                )}
                <form className="space-y-8 divide-y divide-gray-200" onSubmit={submit}>
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="total-name"
                                       className="block text-sm font-medium text-gray-700"> Valor</label>
                                <div className="mt-1">
                                    <CurrencyFormat
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        decimalSeparator="."
                                        value={data.total}
                                        onChange={e => setData('total', e.target.value)}
                                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                    {errors.total && <div className="text-red-600">{errors.total}</div>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="status"
                                       className="block text-sm font-medium text-gray-700"> Status Pagamento</label>
                                <div className="mt-1">
                                    <select
                                        name="status"
                                        required="required"
                                        id="status"
                                        onChange={e => setData('status', e.target.value)}
                                        value={data.status}
                                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option></option>
                                        <option  value="2">SIM</option>
                                        <option  value="1">NÃO</option>
                                        <option  value="999">CANCELADA</option>

                                    </select>
                                    {errors.status && <div className="text-red-600">{errors.status}</div>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="Pagamento"
                                       className="block text-sm font-medium text-gray-700"> Pagamento </label>
                                <div className="mt-1">
                                    <select
                                        name="pagamento"
                                        required="required"
                                        id="pagamento"
                                        onChange={e => setData('pagamento', e.target.value)}
                                        value={data.pagamento}
                                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option></option>
                                        <option  value="1">Cartão de Crédito</option>
                                        <option  value="8">Débito</option>
                                        <option  value="7">Transferência</option>
                                        <option  value="9">PIX</option>
                                        <option  value="2">Dinheiro</option>
                                        <option  value="3">Cheque</option>
                                        <option  value="4">Boleto</option>
                                        <option  value="5">Caderno</option>
                                        <option  value="6">PickPay</option>
                                        <option  value="10">Outro</option>
                                    </select>
                                    {errors.pagamento && <div className="text-red-600">{errors.pagamento}</div>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="parcelamento"
                                       className="block text-sm font-medium text-gray-700"> Parcelamento </label>
                                <div className="mt-1">
                                    <select
                                        name="parcelamento"
                                        required="required"
                                        id="parcelamento"
                                        onChange={e => setData('parcelamento', e.target.value)}
                                        value={data.parcelamento}
                                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option></option>
                                        <option value= '1'>1</option>
                                        <option value= '2'>2</option>
                                        <option value= '3'>3</option>
                                        <option value= '4'>4</option>
                                        <option value= '5'>5</option>
                                        <option value= '6'>6</option>
                                        <option value= '7'>7</option>
                                        <option value= '8'>8</option>
                                        <option value= '9'>9</option>
                                        <option value= '10'>10</option>
                                        <option value= '11'>11</option>
                                        <option value= '12'>12</option>
                                        <option value= '100'>A vista</option>
                                    </select>
                                    {errors.parcelamento && <div className="text-red-600">{errors.parcelamento}</div>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="notafiscal"
                                       className="block text-sm font-medium text-gray-700"> Nota Fiscal </label>
                                <div className="mt-1">
                                    <select
                                        name="notafiscal"
                                        required="required"
                                        id="notafiscal"
                                        onChange={e => setData('notafiscal', e.target.value)}
                                        value={data.notafiscal}
                                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option></option>
                                        <option value='0'>NÃO</option>
                                        <option value='1'>SIM</option>

                                    </select>
                                    {errors.notafiscal && <div className="text-red-600">{errors.notafiscal}</div>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="data"
                                       className="block text-sm font-medium text-gray-700"> Data do Pagamento </label>
                                <div className="mt-1">
                                    <CurrencyFormat
                                        format="##-##-####"
                                        value={data.data}
                                        onChange={e => setData('data', e.target.value)}
                                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                    {errors.data && <div className="text-red-600">{errors.data}</div>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="previsao"
                                       className="block text-sm font-medium text-gray-700"> Previsão </label>
                                <div className="mt-1">
                                    <CurrencyFormat
                                        format="##-##-####"
                                        value={data.previsao}
                                        onChange={e => setData('previsao', e.target.value)}
                                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                    {errors.previsao && <div className="text-red-600">{errors.previsao}</div>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="canal"
                                       className="block text-sm font-medium text-gray-700"> Canal </label>
                                <div className="mt-1">
                                    <select
                                        name="canal"
                                        required="required"
                                        id="canal"
                                        onChange={e => setData('canal', e.target.value)}
                                        value={data.canal}
                                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option></option>
                                        <option  value="INSTAGRAM">INSTAGRAM</option>
                                        <option  value="FACEBOOK">FACEBOOK</option>
                                        <option  value="SITE">SITE</option>
                                        <option  value="OUTRO">OUTRO</option>
                                    </select>
                                    {errors.canal && <div className="text-red-600">{errors.canal}</div>}
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                disabled={processing}>
                                SALVAR
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            </Auth>
        </>
    )
}
