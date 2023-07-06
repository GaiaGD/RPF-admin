import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Link from "next/link";
import axios from "axios";

export default function Products(){

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data)
        })
    }, [])

    return (
        <Layout>
            <div>
                <Link className='bg-emerald-900 text-white p-2 px-4 rounded-md' href={'products/new'}>Add new products</Link>
            </div>
            <table className="border w-full">
                <thead className="border">
                    <tr>
                        <td>Product Name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        return (
                            <tr className="border" key={product._id}>
                                <td className="border">{product.name}</td>
                                <td>button</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Layout>
    )
}