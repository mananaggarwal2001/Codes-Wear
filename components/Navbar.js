import Image from 'next/image'
import React from 'react'
import logo from '../pages/Images/logo.png'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { useRef } from 'react'
import { BsFillBagCheckFill } from 'react-icons/Bs'
const Navbar = () => {
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
        <div className='flex flex-col md:flex-row md:justify-start  justify-center items-center py-3 shadow-lg w-full'>
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

            <div ref={ref} className=" z-[10000000000] sidebar absolute top-0 right-0 bg-pink-100 px-8 py-10 transition-transform translate-x-full duration-500 w-96 h-full">
                <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                <span onClick={toggleCart} className='absolute top-5 right-3 text-2xl cursor-pointer text-pink-500'><AiFillCloseCircle />
                </span>

                <ol className='list-decimal font-semibold'>
                    <li>
                        <div className="item flex my-5">

                            <div className=' font-semibold'>T-Shirts - Wear the Code</div>
                            <div className=' w-1/3 flex items-center justify-center font-semibold text-lg '>
                                <AiFillMinusCircle className='cursor-pointer text-pink-500' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='cursor-pointer text-pink-500' /></div>
                        </div>
                    </li>
                    <li>
                        <div className="item flex my-5">

                            <div className=' font-semibold'>T-Shirts - Wear the Code</div>
                            <div className=' w-1/3 flex items-center justify-center font-semibold text-lg '>
                                <AiFillMinusCircle className='cursor-pointer text-pink-500' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='cursor-pointer text-pink-500' /></div>
                        </div>
                    </li>
                    <li>
                        <div className="item flex my-5">

                            <div className=' font-semibold'>T-Shirts - Wear the Code</div>
                            <div className=' w-1/3 flex items-center justify-center font-semibold text-lg '>
                                <AiFillMinusCircle className='cursor-pointer text-pink-500' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='cursor-pointer text-pink-500' /></div>
                        </div>
                    </li>
                    <li>
                        <div className="item flex my-5">

                            <div className=' font-semibold'>T-Shirts - Wear the Code</div>
                            <div className=' w-1/3 flex items-center justify-center font-semibold text-lg '>
                                <AiFillMinusCircle className='cursor-pointer text-pink-500' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='cursor-pointer text-pink-500' /></div>
                        </div>
                    </li>
                    <li>
                        <div className="item flex my-5">

                            <div className=' font-semibold'>T-Shirts - Wear the Code</div>
                            <div className=' w-1/3 flex items-center justify-center font-semibold text-lg '>
                                <AiFillMinusCircle className='cursor-pointer text-pink-500' /><span className='mx-2 text-sm'>1</span><AiFillPlusCircle className='cursor-pointer text-pink-500' /></div>
                        </div>
                    </li>
                </ol>
                <div className='flex justify-center space-x-7'>
                    <button className="flex justify-center items-center  mt-16 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='me-2' /> <span className='font-semibold'> CheckOut</span> </button>
                    <button className="flex justify-center items-center  mt-16 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm"><span className='font-semibold'> Clear Cart</span> </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar