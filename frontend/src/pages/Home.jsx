import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import { Link } from "react-router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    const res = await axios.get(`/products?search=${search}&category=${category}`);
    setProducts(res.data.products || []);
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  return (
    <div className="p-6">
      {/*Search*/}
      <div className="mb-4 flex gap-3 ">
        <input
          className="border p-2 py-2 rounded w-1/2"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>

        {/*Category*/}
        <select
          className="border p-2 py-2 rounded "
          value={category}
          onChange={(e) => {
              setCategory(e.target.value);
             
          }}
        >
          <option value="">All category</option>

          <option value="Laptop">Laptop</option>

          <option value="Fashion">Fashion</option>

          <option value="Mobile">Mobile</option>
          <option value="Camera">Camera</option>

          <option value="Tablet">Tablet</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="border p-3 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain bg-white rounded"
            />
            <h2 className="mt-2 font-semibold text-lg">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
