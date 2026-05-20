import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../api/axios";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    const res = await api.get("/products/");
    const selectedProduct = res.data.find((item) => item._id === id);
    setProduct(selectedProduct);
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const addToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }

    const res = await api.post("/cart/add", {
      userId,
      productId: product._id,
    });

    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    localStorage.setItem("cartCount", String(total));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!product) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 px-6 py-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p className="text-lg font-semibold text-slate-900">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.28),transparent_55%),linear-gradient(180deg,#ffffff,#eef6ff)] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="flex h-full min-h-[24rem] items-center justify-center rounded-[1.5rem] bg-white/70 p-6 backdrop-blur">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[24rem] w-full object-contain drop-shadow-[0_18px_35px_rgba(15,23,42,0.2)]"
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-white/92 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 transition hover:border-cyan-600 hover:text-cyan-700"
          >
            Back to catalog
          </Link>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
              {product.category || "Featured Product"}
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600">
              {product.description ||
                "A focused product built for everyday use, with clean design and practical performance."}
            </p>
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-slate-950 p-5 text-white">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
              Price
            </p>
            <p className="mt-2 text-4xl font-black">${product.price}</p>
            <p className="mt-2 text-sm text-slate-300">
              Fast checkout flow with cart sync across the app.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={addToCart}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              Add to cart
            </button>
            <Link
              to="/cart"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-cyan-600 hover:text-cyan-700"
            >
              View cart
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
