import { useState, useEffect } from "react";
import axios from "../api/axios.js";
import { Link } from "react-router";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-100">
      <h2 className="text-2l">Product List</h2>
      <Link to="/admin/products/add">Add new Products</Link>
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
        </table>
      </div>
    </div>
  );
}
