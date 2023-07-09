import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

export default function ProductForm ({
    _id,
    name: existingName,
    description: existingDescription,
    price: existingPrice
}) {

    const [name, setName] = useState(existingName || "")
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [goToProducts, setGoToProducts] = useState(false)

    const router = useRouter()

    async function saveProduct(e) {
        e.preventDefault()
        const data = {name, description, price}

        if (_id) {
            //update product bringing id too along to match it with existing id
            await axios.put('/api/products', {...data, _id})

        } else {
            // push new product
            await axios.post('/api/products', data)
        }
        setGoToProducts(true)
    }

    if (goToProducts) {
        router.push('/products')
    }


    return (
            <div className="mt-6">

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

                <button type="submit" className='bg-emerald-900 text-white p-2 px-4 rounded-md' onClick={saveProduct}>Save</button>

            </div>
    )
}