import { useState, useEffect } from "react"
import Link from "next/link"
import Layout from "./components/Layout"
import axios from "axios"

import { withSwal } from "react-sweetalert2"

// creating the component and it will have swal (plug in for a cool popup window to delete categories) as a prop

function Categories ({swal}){
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [parentCategory, setParentCategory] = useState('')

    const [properties, setProperties] = useState([])

    const [editedCategory, setEditedCategory] = useState(null)

    function fetchCategories(){
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
        })    
    }
    function editCategory(category){
        setEditedCategory(category)
        setName(category.name)
        setParentCategory(category.parent?._id)
        setProperties(
            category.properties.map(({name, values}) => ({
                name,
                values: values.join(',')
            }))
            )
    }

    async function deleteCategory(category){
        // creating the button
        swal.fire({
            title: `Are you sure you want to delete the category "${category.name}"?`,
            text: ``,
            customClass: "sweet-delete",
            showCancelButton: true,
            cancelButtonText: `Cancel`,
            confirmButtonText: `Yes, delete`,
            reverseButtons: true,
            confirmButtonColor: "#d55",
        }).then(async result => {
            // when confirmed and promise resolved...
            if(result.isConfirmed){
                const {_id} = category
                await axios.delete('/api/categories?_id='+_id)
                fetchCategories()
            }

        })
    }

    // AXIOS GETS ALL THE CATEGORIES FROM MONGODBD
    useEffect(() => {
        fetchCategories()
    }, [])

    async function saveCategory(e){
        e.preventDefault()
        const data = {name,
            parentCategory,
            properties: properties.map(p => (
                {name: p.name,
                values: p.values.split(',')
                }
            ))
        }

        // if we clicked on edit, it will just update the existing one
        if(editedCategory){
            data._id = editedCategory._id
            await axios.put('/api/categories', data)
            setEditedCategory(null)
            setParentCategory('')
        // else it will add a new one
        } else {
            await axios.post('/api/categories', data)
        }
        setName('')
        setParentCategory('')
        setProperties([])
        fetchCategories()
    }

    // this creates an array of properties, and adds them one by one
    function addProperty() {
        setProperties(prev => {
            return [...prev, {name: '', values: ''}]
        })
    }

    function handlePropertyNameChange(index, property, newName) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName
            return properties
        })
    }

    function handlePropertyValuesChange(index, property, newValues) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues
            return properties
        })
    }

    function removeProperty(indexToRemove){
        setProperties(prev => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove
            })
        })
    }

    return (
        <Layout>
            <h1 className="font-bold page-names">Categories</h1>
            <div className="mt-3">
                {/* using the input to either add a category or edit an existing */}
                <label className="block mb-2 text-sm font-medium text-emerald-900">{editedCategory ? `Edit Category: ${editedCategory.name}` : `Create new Category`}</label>
                <div className="flex md:flex-row flex-col gap-1">
                    <input placeholder={"Category Name"}
                        onChange={e => setName(e.target.value)}
                        value={name}
                        type="text"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    />
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
                </div>
            </div>
            <div className="mt-3">
                <label className="text-sm">Properties</label>
                { properties.length == 0 && <p className="text-xs mt-2 text-slate-300">No Properties</p> }

                {/* once clicked on addProperties, the length is automatically one because it initializes it with name: '', values: ''*/}
                
                {properties.length > 0 && properties.map((property, index) => {
                    return (
                        <>
                            <div key={index} className="flex gap-1 mt-1">
                                <input
                                    value={property.name}
                                    onChange={e => handlePropertyNameChange(index, property, e.target.value)}
                                    className="block w-full h-11 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                                    type="text" placeholder="property name (e.g.: color)" />
                                <input
                                    value={property.values}
                                    onChange={e => handlePropertyValuesChange(index, property, e.target.value)}
                                    className="block w-full h-11 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                                    type="text" placeholder="values, separated by commas" />
                                <button
                                    onClick={e => removeProperty(index)}
                                    type="button" className='border-2 border-emerald-900 p-2 px-2 rounded-md block text-sm'>Remove</button>
                            </div>
                        </>
                    )
                })}

            </div>
            <div className="mt-12 flex gap-1 w-full justify-between">
                {/* only visible when entering the editing mode of a category, to exit editing mode and clearing the form */}
                {editedCategory &&
                    <button type="button"
                        onClick={() => {setEditedCategory(null); setName(''); setParentCategory('')}}
                        className='border-2 border-emerald-900 p-2 px-2 rounded-md block text-sm flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        <span className="mr-3 flex">Go Back</span>
                    </button>
                }

                <div className="flex align-middle">

                    <button
                        onClick={addProperty}
                        className='block underline'>Add New Property
                    </button>

                    <p className="my-auto mx-2">or</p>

                    <button type="submit" onClick={saveCategory} className='bg-emerald-900 text-white p-2 px-4 rounded-md'>Save Category</button>

                </div>

            </div>

            {/* hiding the table when we enter edit mode in a category  */}
            {!editedCategory &&
                <table className="border w-full mt-24">
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
                                        <div
                                        onClick={() => editCategory(category)}
                                        className="bg-emerald-900 text-white p-2 rounded-md inline-flex gap-1 mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            Edit
                                        </div>
                                        <div
                                        onClick={() => {deleteCategory(category)}}
                                        className="bg-emerald-900 text-white p-2 rounded-md inline-flex gap-1">
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
            }
        </Layout>
    )
}

// here swal is injected in the props inside <Categories />
export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
))