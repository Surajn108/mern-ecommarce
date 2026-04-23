import { useState } from "react";
import axios from "../api/axios.js";
import { useNavigate } from "react-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{

        await api.post('/products/add', form);

        alert("Product Added Successfully!");
        navigate("/admin/products")


    }catch (error) {
      setMsg(error?.response?.data?.message || "An error occured");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Add new Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={key}
              className="w-full p-2 border-gray-300"
            />
          ))}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
