import { useState } from "react";
import api from "../api/axios.js";
import {useNavigate} from 'react-router';

export default function Login(){

    const [form , setForm] = useState({
        email:"",
        password:"",
    });

    const [msg , setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setForm({
            ...form ,
            [e.target.name]:e.target.value,
        })
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            const res =await api.post("/auth/login", form);
            
            //save to local Storage
            localStorage.setItem("token",res.data.token);

            setMsg("Login Successful");

            //Redirect to the Home page
            setTimeout(()=>{
                navigate("/");
            }, 1000);

        }catch(error){
            setMsg(error?.response?.data?.message || "An error occured");
        }

    };

    return( 
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-4">
      
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Login Your Account
      </h2>
  
      {msg && (
        <div className="text-center text-sm text-red-500">
          {msg}
        </div>
      )}
  
      <form onSubmit={handleSubmit} className="space-y-4">
  
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>
  
        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Your password"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>
  
        {/* Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          Login
        </button>
  
      </form>
    </div>
  </div>
        
      )
};