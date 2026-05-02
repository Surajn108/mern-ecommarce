import express from "express";
import {
    addToCart,
    removeItem,
    updateQuantity,
    getCart,
} from "../controller/productController.js";

const router = express.Router();

//Add Item to Cart
router.post('/add', addToCart);

//Remove item from Cart
router.post('/remove' , removeItem);

//Update Quantity of Item
router.post('/update', updateQuantity);


//Get CArt ussing USerId
router.get('/:userId',getCart);


export default router ;