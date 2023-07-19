import { useState, useEffect } from "react"
import Link from "next/link"
import Layout from "./components/Layout"
import axios from "axios"

export default function Categories(){

    const [editedCategory, setEditedCategory] = useState(null)

    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [parentCategory, setParentCategory] = useState('')

    function fetchCategories(){
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
        })    
    }

    function editCategory(category){
        setEditedCategory(category)
    }

    // AXIOS GETS ALL THE CATEGORIES FROM MONGODBD
    useEffect(() => {
        fetchCategories()
    }, [])

    async function saveCategory(e){
        e.preventDefault()
        await axios.post('/api/categories', {name, parentCategory})
        setName('')
        fetchCategories()
    }

    return (
        <Layout>
            <h1 className="font-bold page-names">New Category</h1>
            <div className="mt-3">
                <label className="block mb-2 text-sm font-medium text-emerald-900">{editedCategory ? 'Edit Category' : 'Create new Category'}</label>
                <div className="flex gap-1">
                    <input placeholder={"Category Name"} onChange={e => setName(e.target.value)} type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500" />
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={parentCategory}
                        onChange={e => {setParentCategory(e.target.value)}}
                    >
                        <option value="">No Parent Category</option>
                        {categories.length > 0 && categories.map(category => {
                            return (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            )
                        })}    
                    </select>
                    <button type="submit" value={name} onClick={saveCategory} className='bg-emerald-900 text-white p-2 px-4 rounded-md'>Save</button>
                </div>
            </div>
            <table className="border w-full mt-5">
                <thead className="border bg-green-100">
                    <tr>
                        <td className="p-2">Category Name</td>
                        <td className="p-2">Parent Category</td>
                        <td className="p-2"></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => {
                        return (
                            <tr className="border" key={category._id}>
                                <td className="p-2">{category.name}</td>
                                <td className="p-2">{category?.parent?.name}</td>
                                <td className="p-2">
                                    <div className="bg-emerald-900 text-white p-2 rounded-md inline-flex gap-1 mr-2" onClick={() => editCategory(category)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                        Edit
                                    </div>
                                    <div className="bg-emerald-900 text-white p-2 rounded-md inline-flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        Delete
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </Layout>
    )
}