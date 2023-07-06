import Layout from "./components/Layout";
import Link from "next/link";

export default function Products(){
    return (
        <Layout>
            <div>
                <Link className='bg-emerald-900 text-white p-2 px-4 rounded-md' href={'products/new'}>Add new products</Link>
            </div>
        </Layout>
    )
}