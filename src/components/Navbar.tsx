import { Link } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { useState } from "react"
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [nav,setNav] = useState(false)
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const handleNav = () => {
        setNav(!nav)
    }

    const handleLogout = async () => {
      await logout();
      navigate("/");
    };

  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
        <Link to='/'>
          <h1 className="text-2xl">Cryptobase</h1>
        </Link>
        <div className="hidden md:block">
            <ThemeToggle/>
        </div>
        <div className="hidden md:block">
            {user ? (
              <>
                <Link to='/account' className="p-4 hover:text-accent">Account</Link>
                <button onClick={handleLogout} className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl">Sign Out</button>
              </>
            ) : (
              <>
                <Link to='/signin' className="p-4 hover:text-accent">Signin</Link>
                <Link to='/signup' className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl">Signup</Link>
              </>
            )}
        </div>
        {/* {Menu Icon} */}
        <div onClick={handleNav} className="block md:hidden cursor-pointer z-10">
            {nav ? <AiOutlineClose size={25} className="text-accent"/> : <AiOutlineMenu size={25} className="text-accent"/>}
        </div>
        {/* {Mobile Menu} */}
        <div className={
            nav ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10"
             : "fixed left-[-100%] top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300"
             }
             >
            <ul className="w-full p-4">
                <li className="border-b py-6">
                    <Link to='/'>Home</Link>
                </li>
                {user && (
                  <li className="border-b py-6">
                      <Link to='/account'>Account</Link>
                  </li>
                )}
                <li className="py-6">
                    <ThemeToggle/>
                </li>
            </ul>
            <div className="flex flex-col w-full p-4">
                {user ? (
                  <button onClick={handleLogout} className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">Sign Out</button>
                ) : (
                  <>
                    <Link to='/signin'>
                    <button className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl">Sign In</button></Link>
                    <Link to='/signup'>
                    <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadowxl">Sign Up</button></Link>
                  </>
                )}
            </div>
        </div>
    </div>
  )
}
