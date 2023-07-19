import { useState, useEffect } from "react"
import Layout from "./components/Layout"
import axios from "axios"

export default function Categories(){

    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])

    // AXIOS GETS ALL THE CATEGORIES FROM MONGODBD
    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
        })
    }, [categories])

    async function saveCategory(e){
        e.preventDefault()
        await axios.post('/api/categories', {name})
        setName('')
    }

    return (
        <Layout>
            <h1 className="font-bold page-names">New Category</h1>
            <div className="mt-3">
                <label className="block mb-2 text-sm font-medium text-emerald-900">New Category Name</label>
                <div className="flex gap-1">
                    <input placeholder={"Category Name"} onChange={e => setName(e.target.value)} type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500" />
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value={0}>No Parent Category</option>
                    </select>
                    <button type="submit" value={name} onClick={saveCategory} className='bg-emerald-900 text-white p-2 px-4 rounded-md'>Save</button>
                </div>
            </div>
            <table className="border w-full mt-5">
                <thead className="border bg-green-100">
                    <tr>
                        <td className="p-2">Category Name</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => {
                        return (
                            <tr className="border" key={category._id}>
                                <td className="p-2">{category.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </Layout>
    )
}