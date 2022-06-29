import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiShoppingCart } from "react-icons/gi";
import { AiFillCloseCircle,AiFillPlusCircle,AiFillMinusCircle } from "react-icons/ai";
import { IoBagSharp} from "react-icons/io5";
import { MdAccountCircle} from "react-icons/md";



const Navbar = ({Logout,user,cart,addToCart,removeFromCart,clearCart,subTotal}) => {
  const [dropdown,setDropdown]=useState(false)
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
        ref.current.classList.add("translate-x-full");
        ref.current.classList.remove("translate-x-0");
    }
  };
  const ref = useRef();

  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:justify-start sticky top-0 bg-white z-10 py-2 shadow-xl">
      <div className="logo mr:auto md:mx-5">
        <Link href={"/"}>
          <a>
            <Image src="/Logo.png" width={100} height={100} />
          </a>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md">
          <Link href={"/dominos"}>
            <a>
              <li className="  dark:text-sky-900 hover:underline decoration-pink-600 underline-offset-8 decoration-4">Dominos</li>
            </a>
          </Link>
          <Link href={"/burgrill"}>
            <a>
              <li className="  dark:text-sky-900 hover:underline decoration-pink-600 underline-offset-8 decoration-4 ">Burgrill</li>
            </a>
          </Link>
          <Link href={"/nivia"}>
            <a>
              <li className=" dark:text-sky-900 hover:underline decoration-pink-600 underline-offset-8 decoration-4">Nivia</li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-0 mx-5 items-center top-10 cursor-pointer flex">
        <a onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} >
      {dropdown&&<div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute right-8 top-7 py-4 rounded-md px-5 w-36 bg-white shadow-lg border ">
          <ul>
            <Link href={'/myaccount'}><a><li className="py-1 hover:text-pink-800 font-bold text-sm">My Account</li></a></Link>
            <Link href={'/orders'}><a><li className="py-1 hover:text-pink-800 font-bold text-sm">Orders</li></a></Link>
            <a ><li onClick={Logout} className="py-1 hover:text-pink-800 font-bold text-sm">Logout</li></a>
          </ul>
        </div>}
        {user.value&&<MdAccountCircle className="text-xl md:text-3xl mx-2"/>}
        </a>
        {!user.value&&<Link href={'/login'}><a>
          <button className="bg-pink-500 mx-2 px-2 py-1 rounded-md text-sm text-white ">Login</button>
        </a></Link>}
        <GiShoppingCart onClick={toggleCart} className="text-xl md:text-3xl" />
      </div>
       
      <div
        ref={ref}
        className={`sideCart overflow-y-scroll absolute top-0 w-72 h-[100vh] right-0 bg-pink-100 py-10 transform transition-transform  ${Object.keys(cart).length!==0?'translate-x-0':'translate-x-full'} px-8`}
      >
        <h2 className="font-bold text-center text-xl">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 text-center right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
        {Object.keys(cart).length==0 && <div className="my-4 font-normal">Your cart is empty!</div>}
        {Object.keys(cart).map((k)=>{return <li key={k}>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">{cart[k].name}</div>
              <div className="w-1/3 font-semibold justify-center items-center flex text-lg  "><AiFillMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price, cart[k].name,cart[k].size,cart[k].variant)}} className="text-pink-500 cursor-pointer"/><span className="mx-2 text-sm">{cart[k].qty}</span><AiFillPlusCircle onClick={()=>{addToCart(k,1,cart[k].price, cart[k].name,cart[k].size,cart[k].variant)}} className="text-pink-500 cursor-pointer"/></div>
            </div>
        </li>})}
        <div className="font-bold my-2">Subtotal:₹{subTotal}</div>
        </ol>
        <div className="flex ">
        <Link href={'/checkout'}><button className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-800 rounded text-sm "><IoBagSharp className="m-1"/>Checkout</button></Link>
        <button onClick={clearCart} className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-800 rounded text-sm">Clear Cart</button>
        
        </div>
      </div>
      </div>
  );
};

export default Navbar;
