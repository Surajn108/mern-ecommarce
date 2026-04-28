import { useState, useEffect } from "react";
import axios from "../api/axios.js";
import { Link } from "react-router";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const loadProducts = async()=>{
    const response = await api.get("/products");
    setProducts[response.data];
  }

  const deletedProduct = async(id)=>{
    try{
        await api.delete("");
    }catch (error) {
      setMsg(error?.response?.data?.message || "An error occured");
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-100">
      <h2 className="text-2l mb-6">Product List</h2>
      <Link to="/admin/products/add" className="br-blue-500"> Add new Products</Link>
      <div className="flex">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Title</th>
              <th className="border border-gray-200 px-4 py-2">Price</th>
              <th className="border border-gray-200 px-4 py-2">Stock</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {
                products.map((product)=>(
                    <tr key={product.id} className="text-center">
                    <td className="border border-gray-200 px-4 py-2">{product. title}</td>
                    <td className="border border-gray-200 px-4 py-2">${product.price}</td>:
                    <td className="border border-gray-200 px-4 py-2">{product.stock}</td>
                    <td className="border border-gray-200 px-4 py-2">
                    <Link to={`/admin/products/edit/${product.id}`} className="text-b">
                    Edit
                    </Link>
                    <button onClick={()=>deletedProduct(product.id)} className="text-red-500 hover:underline">
                    Delete
                    </button>
                    </td>

                    </tr>


                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
