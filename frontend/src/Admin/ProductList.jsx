import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { Link } from "react-router";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      setMsg(error?.response?.data?.message || "Failed to load products");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/delete/${id}`);
      loadProducts();
    } catch (error) {
      setMsg(
        error?.response?.data?.message ||
          "An error occured while deleting Product"
      );
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-2xl mb-6">Product List</h2>
      {msg && (
        <p className="text-sm text-red-600 mb-4" role="alert">
          {msg}
        </p>
      )}
      <Link
        to="/admin/products/add"
        className="inline-block mb-4 text-blue-600 hover:underline"
      >
        Add new Products
      </Link>
      <div className="flex overflow-x-auto">
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
            {products.map((product) => (
              <tr key={product._id} className="text-center">
                <td className="border border-gray-200 px-4 py-2">
                  {product.title}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  ${product.price}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {product.stock}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="text-blue-600 mr-2 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
