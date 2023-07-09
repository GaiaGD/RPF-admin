import Layout from "../components/Layout";
import ProductForm from "../components/ProductForm";

export default function NewProduct () {
    return (
        <Layout>
            <h1 className="font-bold">New Product</h1>
            <ProductForm />
        </Layout>
        )
}