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
        setForm
    };

    const handleSubmit=(e)=>{
        e.preventDefault;
    };

    return( 
      <div className="flex iteam-center">
        <div className="bg-white">
          <h2 className="text-2xl">

          {msg && (
        <div className="mb-4 text-center">
            {msg}
        </div>
    )};
<form
    onSubmit={handleSubmit}
    class="mx-auto max-w-md space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6"
  >
    <div>
      <label class="block text-sm font-medium text-gray-900" for="name">
        Name
      </label>

      <input
        class="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none"
        id="name"
        type="text"
        placeholder="Enter your name"
        value={form.name}
        onChange={handleChange}
        required
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-900" for="email">
        Email
      </label>

      <input
        class="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none"
        id="email"
        name="email"
        type="email"
        placeholder="Your email"
        value={form.email}
        onChange={handleChange}
        required
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-900" for="password">
        Password
      </label>

      <input
        class="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none"
        id="password"
        type="password"
        placeholder="Your password"
        value={form.password}
        onChange={handleChange}
        required
      />
    </div>

    <button
      class="block w-full rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600"
      type="submit"
    >
      Create account
    </button>

    
  </form>


          </h2>
        </div>
      </div>
      
    )
  
};


