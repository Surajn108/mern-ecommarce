import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../api/axios";
import heroImage from "../assets/hero.png";

const categories = [
  "Laptop",
  "Mobile",
  "Tablet",
  "Fashion",
  "Electronic",
];

const highlights = [
  { label: "Curated drops", value: "120+" },
  { label: "Fast dispatch", value: "24h" },
  { label: "Trusted reviews", value: "4.8/5" },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    const res = await api.get(
      `/products?search=${search}&category=${category}`
    );
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    await api.post(`/cart/add`, { userId, productId });

    const cartRes = await api.get(`/cart/${userId}`);
    const items = cartRes.data?.items ?? [];

    const total = items.reduce((sum, item) => sum + item.quantity, 0);

    localStorage.setItem("cartCount", String(total));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500"
              >
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search products, brands, categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-600 focus:bg-white"
              />
            </div>

            <div className="lg:w-72">
              <label
                htmlFor="category"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-600 focus:bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-950 p-5 text-white shadow-[0_20px_60px_rgba(15,23,42,0.14)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Live Catalog
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-black">{products.length}</p>
              <p className="text-sm text-slate-300">
                products matching your current filters
              </p>
            </div>
            <p className="max-w-[12rem] text-right text-xs leading-5 text-slate-400">
              Narrow by category or search directly to tighten the collection.
            </p>
          </div>
        </div>
      </section>

      <section id="catalog" className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
              Featured Catalog
            </p>
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Find the next thing worth adding.
            </h2>
          </div>
          
        </div>

        {products.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-lg font-semibold text-slate-900">
              No products match those filters.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Try a broader search term or switch back to all categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product, index) => (
              <article
                key={product._id}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/92 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(8,47,73,0.16)]"
              >
                <Link
                  to={`/product/${product._id}`}
                  className="flex h-full flex-col"
                >
                  <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.28),transparent_58%),linear-gradient(180deg,#f8fafc,#eef2ff)] px-5 pb-3 pt-5">
                    <span className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700 backdrop-blur">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="mx-auto h-52 w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {product.category || "Featured Product"}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-950">
                      {product.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {product.description || "Designed for everyday use with a balance of performance and style."}
                    </p>
                  </div>
                </Link>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Price
                    </p>
                    <p className="text-xl font-black text-slate-950">
                      ${product.price}
                    </p>
                  </div>

                  <button
                    onClick={() => addToCart(product._id)}
                    className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
