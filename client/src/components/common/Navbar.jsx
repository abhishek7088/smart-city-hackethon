import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser } from "../../slices/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const token=useSelector((state)=>state.auth.token);
  const dispatch=useDispatch();
  const logoutHandler=()=>{
    localStorage.removeItem('token');
    dispatch(setToken(null));
    localStorage.removeItem('user');
    dispatch(setUser(null));
    navigate('/login');
  }

  console.log(token);
  return (
    <nav className="w-full flex items-center justify-between bg-white shadow-md px-6 py-3 ">
      <h1 className="text-xl font-bold text-gray-900">SMART CITY</h1>
      
      <div className="flex items-center space-x-6 text-gray-700">
        <button className="hover:text-blue-500 transition" onClick={() => navigate("/")}>Home</button>

        <div className="relative group">
          <button className="hover:text-blue-500 transition">Resources ▼</button>
          <div className="absolute left-0 mt-2 w-40 bg-white border rounded-md shadow-md hidden group-hover:block">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => navigate("/resource1")}>Resource 1</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => navigate("/resource2")}>Resource 2</button>
          </div>
        </div>

        <button className="hover:text-blue-500 transition" onClick={() => navigate("/report")}>Report Issue</button>
        <button className="hover:text-blue-500 transition" onClick={() => navigate("/track")}>Track Progress</button>
        <button className="hover:text-blue-500 transition" onClick={() => navigate("/contact")}>Contact Us</button>
      </div>

      <div className="flex space-x-3">
        {!token && (<><button className="text-gray-600 hover:text-blue-500 transition" onClick={() => navigate("/login")}>Log In</button>
        <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition" onClick={() => navigate("/signup")}>Sign In</button></>)}

        {token && (<button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition" onClick={logoutHandler}>Log Out</button>)}
      </div>
    </nav>
  );
};

export default Navbar;
