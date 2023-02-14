import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import CartCard from './components/CartCard'
import { get_cart_data } from '@/services/admin'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import {BsCartPlusFill} from 'react-icons/bs'


export default function cart() {
    const [cartItem, setCartItem] = useState([]);
    const [userID, setUserID] = useState(undefined);

    const getLatestCartData = async () => {
        const getUser = localStorage.getItem('user')
        const user = JSON.parse(getUser);
        setUserID(user?._id);
        const data = await get_cart_data(user?._id);
        setCartItem(data);
    }

    useEffect(() => {
        getLatestCartData();
    }, [])


    return (
        <div className='w-full h-screen bg-slate-900'>
            <Navbar pos={""} />
            <div className='w-full h-96 bg-white flex flex-col px-4 py-2'>
                <h1 className='text-2xl font-bold mb-4 '>MY CART ITEMS</h1>
                {
                    cartItem?.length === 0 ? (
                        <div className='w-full h-full  overflow-auto px-4 py-2 flex items-center justify-center flex-col'>
                            <h1 className='text-2xl font-bold mb-4 '>No Items in Cart</h1>
                            <Link href='/frontend/landing' className='px-4 h-12 bg-orange-600 text-xl font-bold text-white flex items-center justify-center text-center rounded-xl'><BsCartPlusFill className='text-3xl '/> Start Shopping</Link>
                        </div>
                    ) : (
                        <div className='w-full h-full  overflow-auto px-4 py-2'>
                            {
                                cartItem?.map((item) => {
                                    return (
                                        <CartCard item={item} key={item._id} userID={userID} reupdate={getLatestCartData} />
                                    )
                                })
                            }
                        </div>
                    )
                }


                <div className='w-full p-2 flex items-end flex-col justify-center'>
                    <h1 className='uppercase text-2xl font-bold py-3 border-b-2 border-gray-900 '>Total Price</h1>
                    <p className='text-2xl font-semibold p-2'>$10000</p>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div >
    )
}
