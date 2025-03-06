import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"

import { setToken, setUser } from "../slices/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(""); 

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      console.log(response)
      
      localStorage.setItem("token", JSON.stringify(response.data.token));
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      localStorage.setItem("user",JSON.stringify(response.data.user));

      navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed! Please try again.");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-gray-600 text-2xl font-bold text-center">Login to your account</h2>

        <div className="flex space-x-4">
          <button type="button" className="flex-1 py-2 bg-red-500 text-white rounded-lg">Google</button>
          <button type="button" className="flex-1 py-2 bg-blue-500 text-white rounded-lg">Facebook</button>
        </div>

        <div className="text-center text-gray-500">Or</div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</button>

        <p className="text-center text-gray-500">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </form>
  );
};

export default Login;
