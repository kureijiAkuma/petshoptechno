import React from "react";
import { NavLink } from "react-router-dom";
import home from "../icons/home.svg"
import heart from "../icons/heart.svg"
import bag from "../icons/bag.svg"
import wallet from "../icons/wallet.svg"
import phone from "../icons/phone.svg"
import info from "../icons/info.svg"
import cart from "../icons/cart.svg"
import userdefault from "../icons/user.svg"
import logo from "../images/logo.png"
import background from "../images/bg_nav.png"


export default function Navbar(props) {
    return (
        <nav className="w-full h-1/6  flex shadow-md shadow-black/50  justify-between items-center bg-fixed bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${background})` }}>

            <NavLink to="/signin" className="h-fit flex items-center ml-10 px-2 hover:bg-red-100 rounded-3xl">
                <img className="p-1 size-9" src={userdefault} alt="" />
                <h1 className="pl-1 pt-1 pr-2 font-Roboto font">Username</h1>
            </NavLink>


            <div className="flex items-center">
                <NavLink to="/" className="flex flex-col justify-center items-center mx-2 px-2 font-Roboto font-normal h-fit">
                    <img className="" src={home} alt="" />
                    <h1 className="text-base">Home</h1>
                </NavLink>

                <NavLink to="/adopt" className="flex flex-col justify-center items-center mx-2 px-2 font-Roboto font-normal h-fit">
                    <img src={heart} alt="" />
                    <h1 className="text-base">Adopt</h1>
                </NavLink>

                <NavLink to="/shop" className="flex flex-col justify-center items-center mx-2 px-2 font-Roboto font-normal h-fit">
                    <img src={bag} alt="" />
                    <h1 className="text-base">Shop</h1>
                </NavLink>

                <NavLink to="/adopt_2">
                    <img className="h-fit mx-2 px-1 py-4 " src={logo} alt="" />
                </NavLink>

                <NavLink to="/" className="flex flex-col justify-center items-center mx-2 px-2 font-Roboto font-normal h-fit">
                    <img src={wallet} alt="" />
                    <h1 className="text-base">Donate</h1>
                </NavLink>

                <NavLink to="/" className="flex flex-col justify-center items-center mx-2 px-2 font-Roboto font-normal h-fit">
                    <img src={phone} alt="" />
                    <h1 className="text-base">Contact</h1>
                </NavLink>

                <NavLink to="/" className="flex flex-col justify-center items-center mx-2 px-2 font-Roboto font-normal h-fit">
                    <img src={info} alt="" />
                    <h1 className="text-base">About</h1>
                </NavLink>
            </div>

            <a className="h-fit flex items-center mr-10" href="">
                <img className="p-1 size-8" src={cart} alt="" />
                <h1 className="px-1 pt-1 font-Roboto font">Cart</h1>
            </a>

        </nav>
    )

}