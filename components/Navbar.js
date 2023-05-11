import Image from 'next/image'
import React from 'react'
import logo from '../pages/Images/logo.png'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { useRef } from 'react'
import { BsFillBagCheckFill } from 'react-icons/Bs'
const Navbar = (props) => {
    const { cart, addToCart, removeFromCart, clearCart, subTotal } = props
    const ref = useRef()
    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full');
            ref.current.classList.add('translate-x-0');
        } else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }
    }
    return (
        <div className='flex flex-col md:flex-row md:justify-start  justify-center items-center py-3 shadow-lg w-full bg-white z-10 sticky top-0'>
            <div className="logo md:mx-5">
                <Link href={'/'}><Image src={logo} width={200} height={40} alt='codewear Logo' /></Link>
            </div>
            <div className="nav">
                <ul className='flex items-center space-x-3 font-bold text-md md:text-md'>
                    <Link href={'/websitepages/tshirts'}><li className='hover:underline'>TShirts</li></Link>
                    <Link href={'/websitepages/hoodies'}><li className='hover:underline'>Hoodies</li></Link>
                    <Link href={'/websitepages/stickers'}><li className='hover:underline'>Stickers</li></Link>
                    <Link href={'/websitepages/mugs'}><li className='hover:underline'>Mugs</li></Link>
                </ul>
            </div>
            <div onClick={toggleCart} className="cart absolute right-0 mx-3 top-5">
                <AiOutlineShoppingCart className=' text-xl md:text-2xl cursor-pointer' />
            </div>

            <div ref={ref} className={`sidebar absolute top-0 right-0 bg-pink-100 px-8 py-10 transition-transform ${Object.keys(cart).length===0 ? 'translate-x-full' : 'translate-x-0'} duration-500 w-96 h-[100vh]`}>
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
                    <Link href={'/websitepages/checkout'}><button className="flex justify-center items-center  mt-6 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='me-2' /> <span className='font-semibold'> CheckOut</span> </button>
                    </Link>
                    <button onClick={clearCart} className="flex justify-center items-center  mt-6 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm"><span className='font-semibold'> Clear Cart</span> </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar