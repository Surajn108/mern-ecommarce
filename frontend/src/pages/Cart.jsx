import {useEffect , useState} from 'react';
import api from '../api/axios';

export default function Cart(){
    const userId = localStorage.getItem("userId");
    const [cart , setCart]= useState(null);

    //Load cart data
    const loadCart =  async()=>{
        if(!userId) return;
        const res = await api.get(`/get/${userId}`);
        setCart[res.data];
    };

    useEffect(()=>{
        loadCart();
    },[])

    const removeItem = ()=>{
        
    }
}