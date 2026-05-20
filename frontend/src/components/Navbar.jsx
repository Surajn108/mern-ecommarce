import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) {
        setCartCount(0);
        return;
      }

      const res = await api.get(`/cart/${userId}`);
      const total = res.data.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };

    loadCart();
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg shadow-slate-950/15">
            S
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-700">
              Suraj Store
            </p>
            <p className="text-sm font-semibold text-slate-950">
              Devices, fashion, and daily upgrades
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-cyan-600 hover:text-cyan-700"
          >
            <span className="text-base">Cart</span>
            {cartCount > 0 && (
              <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-slate-950 px-2 py-1 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {!userId ? (
            <>
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-cyan-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
