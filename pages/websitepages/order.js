/* eslint-disable @next/next/no-img-element */
import connectToMongo from '@/middleware/mongooose';
/* eslint-disable react-hooks/rules-of-hooks */
import Order from '@/models/Order';
connectToMongo()
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Myorder = (props) => {
    const { order, clearCart } = props;
    const orderproducts = order.products;
    const router = useRouter()

    useEffect(() => {


        if (router.query.clearCart == 1) {
            clearCart();
        }
    }, [clearCart, router.query.clearCart])
    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap justify-between">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 flex flex-col items-stretch">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: {order.orderID}</h1>

                            <p className="leading-relaxed mb-4">Your Order has been successfully placed. Your Payment Status is <strong>{order.status}</strong></p>
                            <p className="leading-relaxed mb-4">Order Created At: <strong>{new Date(order.createdAt).toLocaleDateString('en-in', { weekday: 'long', year: 'numeric', month: 'long', day: "numeric" })}</strong></p>
                            <div class="flex my-4 justify-between">
                                <a class="flex-grow py-2 text-lg px-1">Items Description</a>
                                <a class="flex-grow py-2 text-lg px-1">Quantity</a>
                                <a class="flex-grow py-2 text-lg px-1">Items Total</a>
                            </div>
                            {Object.keys(orderproducts).map((item) => {

                                return (
                                    <div key={item} className="flex border-t border-gray-200 py-2">
                                        <span className="text-gray-500">{orderproducts[item].Name}</span>
                                        <span className="m-auto text-gray-900">{orderproducts[item].qty}</span>
                                        <span className="m-auto text-gray-900">₹{orderproducts[item].Price * orderproducts[item].qty}</span>
                                    </div>
                                )
                            })}


                            <div className="flex flex-col my-8">
                                <span className="title-font font-medium text-2xl text-gray-900">SubTotal: ₹{order.amount}</span>
                                <button class="flex me-auto my-4 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded font-semibold">Track Order</button>
                            </div>
                        </div>
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://media.gq.com/photos/6390ee5d339a350d38535515/16:9/w_2560%2Cc_limit/shirts.jpg" />
                    </div>
                </div>
            </section>
        </div>
    )
}


export async function getServerSideProps(context) {
    let order = await Order.findById(context.query.Orderid)
    return {
        props: { order: JSON.parse(JSON.stringify(order)) }
    };
}

export default Myorder
