import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useParams } from "react-router";

export default function ProductDetails(){
    const {id} = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadProduct = async()=>{
        setLoading(true);
        setProduct(null);
        try {
            const res = await api.get(`/products`);

            const pro = res.data.products?.find(product => product._id === id);
            setProduct(pro || null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProduct();
    }, [id]); 

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            {loading ? (
                <div className="max-w-4xl mx-auto rounded-2xl bg-white p-8 shadow-sm border border-gray-100 text-center">
                    <h1 className="text-lg font-medium text-gray-700">Loading product details...</h1>
                </div>
            ) : product ? (
                <div className="max-w-4xl mx-auto rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="bg-gray-100 p-8 flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full max-h-80 object-contain"
                            />
                        </div>

                        <div className="p-8 flex flex-col gap-4">
                            <span className="inline-flex w-fit items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                                {product.category}
                            </span>

                            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                                {product.title}
                            </h1>

                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="mt-2">
                                <p className="text-3xl font-extrabold text-emerald-600">
                                    ${product.price}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>    
            ) : (
                <div className="max-w-4xl mx-auto rounded-2xl bg-white p-8 shadow-sm border border-gray-100 text-center">
                    <h1 className="text-xl font-semibold text-gray-800">Product not found</h1>
                    <p className="mt-2 text-gray-500">This item may have been removed or is unavailable.</p>
                </div>
            )}
        </div>
    );
}