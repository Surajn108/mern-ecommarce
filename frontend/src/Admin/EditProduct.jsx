import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get("/products");
        if (cancelled) return;
        const p = res.data.find((item) => item._id === id);
        if (!p) {
          setMsg("Product not found");
          setLoading(false);
          return;
        }
        setForm({
          title: p.title ?? "",
          description: p.description ?? "",
          price: p.price != null ? String(p.price) : "",
          category: p.category ?? "",
          image: p.image ?? "",
          stock: p.stock != null ? String(p.stock) : "",
        });
      } catch (e) {
        if (!cancelled) {
          setMsg(e?.response?.data?.message || "Failed to load product");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };
      await api.put(`/products/update/${id}`, payload);
      navigate("/admin/products");
    } catch (error) {
      setMsg(error?.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Edit Product
        </h2>
        {msg && (
          <p className="text-sm text-red-600 text-center" role="alert">
            {msg}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
            className="w-full border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
