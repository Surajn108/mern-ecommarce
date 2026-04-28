import { useState, useEffect } from "react";
import axios from "../api/axios.js";
import { Navigate, useNavigate, useParams } from "react-router";

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

  const allowdFields = [
    "title",
    "description",
    "price",
    "category",
    "image",
    "stock",
  ];
}
