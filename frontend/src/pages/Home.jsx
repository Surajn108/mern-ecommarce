import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import { Link } from "react-router";

export default function Home() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState([]);
  const [category, setCategory] = useState([]);

  const loadProducts = async () => {
    const res = await api.get(`/products?search=${search}&category${category}`);
    setProduct(res.data);
  };

  useEffect(
    () => {
      loadProducts();
    },
    [search],
    [category],
  );

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
      </div>

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

        <option value="fashion ">fashion</option>

        <option value="mobile">mobile</option>
        <option value="tablet">tablet</option>
      </select>
    </div>

        {/*Products Grid*/}
        <div className="grid-col-2">
            
        </div>



  );
}
