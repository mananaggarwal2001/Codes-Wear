/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../pages/Images/logo.png'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { MdAccountCircle } from 'react-icons/md'
import { useRef } from 'react'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
const Navbar = (props) => {
    const { logout, cart, addToCart, removeFromCart, clearCart, subTotal, user } = props
    const ref = useRef()
    const [dropdown, setdropdown] = useState(false)
    const [sidebar, setsidebar] = useState(false)
    useEffect(() => {
        const endpoints = ['/websitepages/checkout', '/websitepages/order', '/websitepages/orders', '/websitepages/myaccount']
        if (!localStorage.getItem('Cart')) {
            setsidebar(true);
        }
        if (endpoints.includes(router.pathname)) {
            setsidebar(true);
        }

    }, [cart, sidebar])


    const toggleCart = () => {
        setsidebar(!sidebar)
    }
    const router = useRouter()
    const handlecheckoutbutton = () => {
        router.push('/websitepages/checkout');
    }

    return (
        <div className='flex flex-col md:flex-row md:justify-start  justify-center items-center py-3 shadow-lg w-full bg-white z-10 fixed top-0'>
            <div className="logo mr-auto md:mx-5">
                <Link href={'/'}><a> <Image src={logo} width={200} height={40} alt='codewear Logo' /></a></Link>
            </div>

            <div className="nav">
                <ul className='flex items-center space-x-3 font-bold text-md md:text-md'>
                    <Link href={'/websitepages/tshirts'}><a className='hover:underline cursor-pointer'>TShirts</a></Link>
                    <Link href={'/websitepages/hoodies'}><a className='hover:underline'>Hoodies</a></Link>
                    <Link href={'/websitepages/stickers'}><a className='hover:underline'>Stickers</a></Link>
                    <Link href={'/websitepages/mugs'}><a className='hover:underline'>Mugs</a></Link>
                </ul>
            </div>
            <div className="cart flex  absolute right-0 mx-3 top-5 space-x-4 items-center">
                <div onMouseOver={() => setdropdown(true)} onMouseLeave={() => setdropdown(false)} >

                    {user.token && <MdAccountCircle onMouseOver={() => setdropdown(true)} onMouseLeave={() => setdropdown(false)} className=' text-xl md:text-3xl cursor-pointer' />}
                    {dropdown && <div onMouseOver={() => setdropdown(true)} onMouseLeave={() => setdropdown(false)} className="absolute right-12 bg-pink-400 top-7 px-5 rounded-md w-40  cursor-pointer">
                        <ul>
                            <Link href={'/websitepages/myaccount'}>
                                <a>
                                    <li className=' my-3 hover:text-pink-500 font-semibold text-white'>My Accounts</li>
                                </a>
                            </Link>
                            <Link href={'/websitepages/orders'}>
                                <a>
                                    <li className='text-white my-3 hover:text-pink-500 font-semibold'>My Orders</li>
                                </a>
                            </Link>
                            <Link href={'/websitepages/admin/adminpanel'}>
                                <a>
                                    <li className='text-white my-3 hover:text-pink-500 font-semibold'>Admin Panel</li>
                                </a>
                            </Link>
                            <li onClick={logout} className=' my-3 hover:text-pink-500 font-semibold text-white'>Logout</li>
                        </ul>
                    </div>
                    }

                </div>
                {!user.token &&

                    <Link href={'websitepages/login'}>
                        <button className='bg-pink-600 text-white text-sm px-3 py-1 rounded-lg font-bold sm:mr-auto'>Login</button>
                    </Link>
                }
                <AiOutlineShoppingCart onClick={toggleCart} className=' text-xl md:text-3xl cursor-pointer' />

            </div>

            <div ref={ref} className={`sidebar overflow-y-auto absolute top-0 right-0 bg-pink-100 px-8 py-10 transition-transform ${sidebar ? 'translate-x-full' : 'translate-x-0'} duration-500 w-96 h-[100vh]`}>
                <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                <span onClick={toggleCart} className='absolute top-5 right-3 text-2xl cursor-pointer text-pink-500'><AiFillCloseCircle />
                </span>

                <ol className='list-decimal font-semibold'>
                    {Object.keys(cart).length === 0 && <div className='flex justify-center items-center'>No items in Cart</div>
                    }
                    {
                        Object.keys(cart).map((item) => {
                            return (
                                <li key={item}>
                                    <div className="item flex my-5">

                                        <div className=' font-semibold'>{cart[item].Name}</div>
                                        <div className=' w-1/3 flex items-center justify-center font-semibold text-lg '>

                                            <AiFillMinusCircle onClick={() => { removeFromCart(item, 1, cart[item].Price, cart[item].Name, cart[item].size, cart[item].variant) }} className='cursor-pointer text-pink-500' /><span className='mx-2 text-sm'>
                                                {cart[item].qty}
                                            </span><AiFillPlusCircle onClick={() => { addToCart(item, 1, cart[item].Price, cart[item].Name, cart[item].size, cart[item].variant) }} className='cursor-pointer text-pink-500' /></div>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ol>
                <div className="total font-semibold mt-6 text-lg">Subtotal: ₹{subTotal}</div>
                <div className='flex justify-center space-x-7'>


                    <button disabled={Object.keys(cart).length === 0} onClick={handlecheckoutbutton} className=" disabled:bg-pink-300 flex justify-center items-center  mt-6 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='me-2' /> <span className='font-semibold'> CheckOut</span> </button>
                    <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className=" disabled:bg-pink-300 flex justify-center items-center  mt-6 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm"><span className='font-semibold'> Clear Cart</span> </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar