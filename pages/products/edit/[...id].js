import Layout from "@/pages/components/Layout";
import ProductForm from "@/pages/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function EditProductPage (){
    const router = useRouter()
    const {id} = router.query

    const [productInfo, setProductInfo] = useState(null)

    useEffect(() => {
        if(!id){
            return
        }
        axios.get('/api/products?id='+id)
        .then(response => {
            setProductInfo(response.data)
        })
    }, [id])

    return (
        <Layout>
            {productInfo && (
                <>
                    <h1 className="font-bold">Edit {productInfo.name}</h1>
                    <ProductForm {...productInfo} />
                </>
                )
            }
        </Layout>
    )
}