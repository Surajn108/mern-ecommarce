import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const router = express.Router();


//Create a product 
router.post('/add' , createProduct);

//Get all Products
router.get('/' , getProducts);

//Update Product
router.put('/update/:id', updateProduct);

//Deletet Product 
router.delete('/delete/:id', deleteProduct);

export default router ;