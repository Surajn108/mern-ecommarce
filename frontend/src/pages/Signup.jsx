import { useState } from "react";
import api from "../api/axios.js";

export default function Signup() { 

    const [form , setForm] = useState({
        name:"",
        email:"",
        password:"", 
    });

    const [msg , setMsg] = useState("");

    const handleChange = (e)=>{
        setForm({
          ...form,
          [e.target.name] : e.target.value ,
        });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          const response =  await api.post("/auth/signup" , form);
          setMsg(response.data.message);
        }catch(error){
          setMsg(error?.response?.data?.message || "An error occured");
        }
    };

    return( 
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-4">
    
    <h2 className="text-2xl font-semibold text-center text-gray-800">
      Create Account
    </h2>

    {msg && (
      <div className="text-center text-sm text-red-500">
        {msg}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
      </div>

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
        Create Account
      </button>

    </form>
  </div>
</div>
      
    )
  
};