import express from "express";
import {addProduct,getProducts,getProduct,updateProduct,deleteProduct} from "../controllers/product.controller.js"; // Make sure to include the file extension '.js'

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
