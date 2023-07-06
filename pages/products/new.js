import Layout from "../components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';

export default function NewProduct () {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    async function createProduct(e) {
        e.preventDefault()
        const data = {name, description, price}
        await axios.post('/api/products', data)
        .then((response) => {
            console.log("success")
        }).catch((error) => {
            if (error.response) { // status code out of the range of 2xx
                console.log("first")
                console.log("Data :" , error.response);
                console.log("Status :" + error.response.status);
              } else if (error.request) { // The request was made but no response was received
                console.log("second")
                console.log(error.request);
              } else {// Error on setting up the request
                console.log("third")
                console.log('Error', error.message);
              }
        })
    }

    return (
        <Layout>
            <div>
                
                <div className="pb-5">
                    <h1 className="text-xl mb-2">
                        New Product
                    </h1>
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-emerald-900">Product Name</label>
                    <input placeholder="e.g. Pond" value={name} onChange={e => setName(e.target.value)} id="newproduct-name" type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-emerald-900">Product Description</label>
                    <textarea placeholder="e.g. Product description" value={description} onChange={e => setDescription(e.target.value)} id="newproduct-description"  type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-emerald-900">Price</label>
                    <input placeholder="e.g. $1000" value={price} onChange={e => setPrice(e.target.value)} id="newproduct-price" type="number" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <button type="submit" className='bg-emerald-900 text-white p-2 px-4 rounded-md' onClick={createProduct}>Save</button>

            </div>
        </Layout>
    )
}