import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm ({
    _id,
    name: existingName,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: existingSelectedCategory,
    properties: existingProperties
}) {

    const [name, setName] = useState(existingName || '')
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [images, setImages] = useState(existingImages || '')
    const [selectedCategory, setSelectedCategory] = useState(existingSelectedCategory || '')
    const [productProperties, setProductProperties] = useState(existingProperties || {})

    // can't use existing categories because they come from the categories array, not the product itself
    const [categories, setCategories] = useState([])

    //_____ USE THIS LATER TO DELETE IMAGES
    // useEffect(() => {
    //     console.log(images)
    // }, [images])

    const [isUploading, setIsUploading] = useState(false)

    const [goToProducts, setGoToProducts] = useState(false)

    const router = useRouter()


    // fetching the categories from the categories api
    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
        })
    }, [])

    async function saveProduct(e) {
        e.preventDefault()
        const data = {name,
                    description,
                    price,
                    images,
                    category: selectedCategory,
                    properties: productProperties}

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

    // we can't send the image as json
    async function uploadImages(e){
        const files = e.target?.files
        if(files?.length > 0){
            // add a spinner while it is uploading
            setIsUploading(true)
            const data = new FormData()
            for(const file of files){
                data.append('file', file)
            }
            // we have to create a separate api and header to stop axios to parse it like json
            const res = await axios.post('/api/upload', data)
            setImages(oldImages => {
                return [...oldImages, ...res.data.links]
            })
            // delete the spinner
            setIsUploading(false)
        }
    }

    // this function comes from the component Sortable - it changes the order of the images and then set the new order of images ready to be uploaded again
    function updateImagesOrder(images){
        setImages(images)
    }

    // showing properties if the category has any
    const propertiesToFill = []

    console.log("selectedCategory: ", selectedCategory)


    if (categories.length > 0 && selectedCategory){
        let selectedCategoryProperties = categories.find(({_id}) => _id === selectedCategory)
        // find if it has a parent category
        propertiesToFill.push(...selectedCategoryProperties.properties)
        // now if it has a parent category, it will add the properties of the parent category too, it is a loop so as soon as it merges the property list will be
        // verified again since it's merged value is called selectedCategoryProperties, and it will stop until the category doesn't have a parent
        while (selectedCategoryProperties?.parent?._id){
            const parentSelectedCategory = categories.find(({_id}) => _id === selectedCategoryProperties?.parent._id)
            propertiesToFill.push(...parentSelectedCategory.properties)
            selectedCategoryProperties = parentSelectedCategory
        }
    }

    // adding the categories' provided properties selected from the dropdown menu to the product
    function addProductProperties(propertyName, propertyValues){
        setProductProperties( prev => {
            const newProductProperties = {...prev}
            newProductProperties[propertyName] = propertyValues
            return newProductProperties
        })
    }


    return (
            <div className="mt-6">

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-emerald-900">Product Name</label>
                    <input placeholder="e.g. Pond" value={name} onChange={e => setName(e.target.value)} id="newproduct-name" type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-emerald-900">Category</label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={selectedCategory}
                        onChange={e => {setSelectedCategory(e.target.value)}}
                    >
                        <option value="">Uncategorized</option>
                        {categories.length > 0 && categories.map(cat => {
                            return (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            )
                        })}    
                    </select>
                </div>
                
                {/* showing if there's any parent category to the category we're assigning */}
                <div className="my-8">
                    {propertiesToFill.length > 0 && propertiesToFill.map( p => (
                        <div className="flex items-center gap-1 md:w-6/12 w-full mb-2" key={p}>
                            <div className="flex align-center w-1/3"><p>{p.name}</p></div>
                            <select
                                onChange={e => addProductProperties(p.name, e.target.value)}
                                value={productProperties[p.name]}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2">
                                {p.values.map (v => (
                                    <option key={v} value={v}>{v}</option>
                                ))
                                }
                            </select>
                        </div>
                        )
                    )}
                </div>

                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-emerald-900">Photos</label>
                    <div className="mb-6 flex flex-wrap gap-2">
                        <ReactSortable className="flex flex-wrap gap-1" list={images} setList={updateImagesOrder}>
                        {!!images?.length && images.map(link => {
                            return (
                                <div key={link} className="h-24">
                                    <img src={link} alt="" className="rounded-lg max-h-full" />
                                </div>
                                )
                        })}
                        </ReactSortable>
                        {isUploading && (
                            <div className="w-24 h-24 border flex items-center rounded-lg justify-center gap-1">
                                <Spinner />
                            </div>
                        )}
                        <label className="cursor-pointer w-24 h-24 flex items-center justify-center text-gray-500 rounded-lg bg-gray-100">
                            <div>
                                <div className="flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                                    </svg>
                                </div>
                                <p className="text-sm mt-1">Upload</p>
                            </div>
                            <input type="file" onChange={uploadImages} className="hidden"/>
                        </label>
                        {!images?.length && (
                            <small>No pictures for this product</small>
                        )}
                    </div>
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