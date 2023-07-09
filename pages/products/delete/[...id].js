import Layout from "@/pages/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage (){

    const router = useRouter()
    const {id} = router.query

    const [productInfo, setProductInfo] = useState('')

    useEffect(() => {
        if (!id){
            return
        }
        axios.get('/api/products?id='+id)
        .then(response => {
            setProductInfo(response.data)
        })
    }, [id])

    function goBack() {
        router.push('/products')
    }

    async function deleteProduct() {
        await axios.delete('/api/products?id='+id)
        goBack()
    }
    
    return (
        <Layout>
            <h1>Do you really want to delete <b>{productInfo?.name}</b>?</h1>
            <div className="mt-4 flex gap-2">
                <button className='bg-red-600 text-white p-2 px-4 rounded-md' onClick={deleteProduct}>Yes</button>
                <button className='bg-emerald-900 text-white p-2 px-4 rounded-md' onClick={goBack}>No</button>
            </div>
        </Layout>
    )
}