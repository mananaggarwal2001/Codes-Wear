import Image from 'next/image'
import React from 'react'
import logo from '../pages/Images/logo.png'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'
const Navbar = () => {
    return (
        <div className='flex flex-col md:flex-row md:justify-start  justify-center items-center py-3 shadow-lg'>
            <div className="logo md:mx-5">
                <Link href={'/'}><Image src={logo} width={200} height={40} alt='codewear Logo'/></Link>
            </div>
            <div className="nav">
                <ul className='flex items-center space-x-3 font-bold text-md md:text-md'>
                    <Link href={'/websitepages/tshirts'}><li className='hover:underline'>TShirts</li></Link>
                    <Link href={'/websitepages/hoodies'}><li className='hover:underline'>Hoodies</li></Link>
                    <Link href={'/websitepages/stickers'}><li className='hover:underline'>Stickers</li></Link>
                    <Link href={'/websitepages/mugs'}><li className='hover:underline'>Mugs</li></Link>
                </ul>
            </div>
            <div className="cart absolute right-0 mx-3 top-5">
                <AiOutlineShoppingCart className=' text-xl md:text-2xl cursor-pointer'/>
            </div>
        </div>
    )
}

export default Navbar