import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";
import { nanoid } from 'nanoid'


export default function Orders(){
    const [orders, setOrders] = useState([])
    useEffect(() => {
        axios.get('api/orders').then(response => {
            setOrders(response.data)
        })
        // console.log(orders)
    }, [])

    return (
        <Layout>
            <h1 className="font-bold page-names">Orders</h1>

            <table className="border w-full mt-5">
                    <thead className="border bg-green-100">
                        <tr>
                            <td className="p-2">Date</td>
                            <td className="p-2">Paid</td>
                            <td className="p-2">Recepient</td>
                            <td className="p-2">Products</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 && orders.map(ord => (
                            <tr key={nanoid()}>
                                <td>{(new Date(ord.createdAt)).toLocaleString()}</td>
                                <td className={ord.paid ? 'text-green-600' : 'text-red-600'}>
                                    {ord.paid ? 'Yes' : 'No'}
                                </td>
                                <td>
                                    {ord.firstname} {ord.lastname}<br/>
                                    {ord.email}<br/>
                                    {ord.address}<br/>
                                    {ord.city} {ord.postcode}<br/>
                                    {ord.state}, {ord.country}
                                </td>
                                <td>
                                    {ord.line_items.map(l => (
                                        <>{l.price_data?.product_data.name} x {l.quantity} <br/>
                                        </>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>

        </Layout>
    )
}