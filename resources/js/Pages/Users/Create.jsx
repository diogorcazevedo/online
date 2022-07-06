import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import React from 'react';
import InputMask from 'react-input-mask';
import axios from 'axios';
import Auth from '@/Layouts/Auth';

  export default function Create({user,url}) {

      const {auth} = usePage().props


    const { data, setData, post, processing, errors} = useForm({
      name: '',
      email: '',
      cpf: '',
      cel: '',
      zipcode: '',
      address: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      url: url,

    })

    function submit(e) {
      e.preventDefault()
      post(route('checkout.order'))
    }


const searchCep = (setData,e) =>{

  const cep = e.target.value;

  const url_cep = 'https://viacep.com.br/ws/'+ cep + '/json/';
  axios.defaults.headers.common = null
  axios.get(url_cep).then(function (response) {

    const dt = {
                name:document.getElementById("name").value,
                email:document.getElementById("email").value,
                cpf:document.getElementById("cpf").value,
                cel:document.getElementById("cel").value,
                zipcode:e.target.value,
                address:response.data.logradouro,
                neighborhood:response.data.bairro,
                city:response.data.localidade,
                state:response.data.uf
              };


    setData(dt);

  }.bind(this)).catch(function (error) {
    console.log(error);
   // this.limpa_formulario_cep();
    alert("Formato de CEP inválido.");
});
}

    return (
        <Auth auth={auth} errors={errors} >
          <Head title="Users" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-16">
                <table className="shadow-sm border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-white divide-y divide-x divide-gray-200">
                    <tr>
                        <td colSpan="3" className="text-left ml-4 pl-4">Clientes </td>
                    </tr>
                    </thead>
                </table>
                <form onSubmit={submit}>
                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">

                    <div >
                        {/*
                      <h3 className="text-3xl  font-medium text-gray-900">Informações para Envio</h3>
                      */}
                        <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                            <div className="col-span-3 sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nome
                                </label>
                                {errors.name && <div>{errors.name}</div>}
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        name="name"
                                        autoComplete="name"
                                        className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3 sm:col-span-4">
                                <label htmlFor="cel" className="block text-sm font-medium text-gray-700">
                                    Telefone
                                </label>
                                {errors.cel && <div>{errors.cel}</div>}
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="cel"
                                        name="cel"
                                        value={data.cel}
                                        onChange={e => setData('cel', e.target.value)}
                                        autoComplete="cel"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3 sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                {errors.email && <div>{errors.email}</div>}
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        autoComplete="email"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3 sm:col-span-4">
                                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                                    CPF
                                </label>
                                {errors.cpf && <div>{errors.cpf}</div>}
                                <div className="mt-1">
                                    <InputMask
                                        type="text"
                                        id="cpf"
                                        name="cpf"
                                        mask="999.999.999.99"
                                        value={data.cpf}
                                        onChange={e => setData('cpf', e.target.value)}
                                        autoComplete="cpf"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    ></InputMask>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">

                            <div className="col-span-3 sm:col-span-4">
                                <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
                                    CEP
                                </label>
                                <div className="mt-1">
                                    <InputMask
                                        type="text"
                                        id="zipcode"
                                        mask="99999999"
                                        // onBlur={searchCep}
                                        onBlur={(e) => searchCep(setData, e)}
                                        name="zipcode"
                                        autoComplete="zipcode"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    ></InputMask>
                                </div>
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                                    Endereço
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        autoComplete="address"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                                    Número
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="number"
                                        id="number"
                                        value={data.number}
                                        onChange={e => setData('number', e.target.value)}
                                        autoComplete="number"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
                                    Complemento
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="complement"
                                        name="complement"
                                        value={data.complement}
                                        onChange={e => setData('complement', e.target.value)}
                                        autoComplete="complement"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                                    Bairro
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="neighborhood"
                                        name="neighborhood"
                                        value={data.neighborhood}
                                        onChange={e => setData('neighborhood', e.target.value)}
                                        autoComplete="neighborhood"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
                                <div className="mt-1">
                                    <input
                                        required
                                        type="text"
                                        id="city"
                                        value={data.city}
                                        onChange={e => setData('city', e.target.value)}
                                        name="city"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
                                <div className="mt-1">
                                    <InputMask
                                        required
                                        type="text"
                                        id="state"
                                        mask="aa"
                                        value={data.state}
                                        onChange={e => setData('state', e.target.value)}
                                        name="state"
                                        className="uppercase block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    ></InputMask>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
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
        </Auth>
    )
  }
