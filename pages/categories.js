import Layout from "./components/Layout"

export default function Categories(){

            return (
                <Layout>
                    <h1 className="font-bold">New Category</h1>
                    <div className="mt-3">
                        <label className="block mb-2 text-sm font-medium text-emerald-900">Category Name</label>
                        <div className="flex gap-1">
                            <input placeholder="Category Name" type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500" />
                            <button type="submit" className='bg-emerald-900 text-white p-2 px-4 rounded-md'>Save</button>
                        </div>
                    </div>
                </Layout>
            )
}