import {useState , useEffect} from "react";
import {useNavigate , Link} from "react-router";
import api from "../api/axios.js";

export default function Navbar(){
        

        const navigate = useNavigate();
        const [cartCount, setCartCount] = useState(0);

        const userId = localStorage.getItem("userId");
       

   

    useEffect(() => {
        const loadCartCount = async()=>{
            if(!userId) setCartCount(0);
            else{
                const res = await api.get(`/cart/${userId}`);
                const total = res.data.items.reduce(
                    (sum , item)=> sum + item.quantity, 0
                );
                setCartCount(total);
            }
        };
        loadCartCount();
        window.addEventListener("cartUpdated", loadCartCount);

        return () => {
            window.removeEventListener("cartUpdated", loadCartCount);
        };
      }, [userId]);

   const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
   };

   return (
   <nav className="bg-white shadow-md">
    <Link to="/" className="flex items-center py-4 px-2">
    Suraj's Store
    </Link>

    <div className="flex space-x-4">
        <Link to="/cart" className="flex items-center py-4 px-2">
            🛒
                {
                    cartCount > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                            {cartCount}
                        </span>
                    )
                }
        </Link>

        {
            user ?(
                <>
                <Link to="/login" className="flex items-center py-4 px-2">
                Login
                </Link>
                <Link to="/register" className="flex items-center py-4 px-2">
                Register
                </Link>
                </>
            ):(
                <button onClick={logout} className="flex items-center py-4 px-2">
                Logout
                </button>   
            )
        }
    </div>
   
   </nav>
   );
}
