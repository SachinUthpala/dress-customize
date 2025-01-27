import express from "express";
import { AddToCart, GetCartByUser } from "../controler/cart.controller.js";

const router = express.Router();

router.post("/addToCart", AddToCart);
router.get("/getCartByUser/:id", GetCartByUser);


export default router;
