import { Router } from "express";
import productController from "../controllers/product.controller.js";
const router=Router()

router.route("/").post(productController.createProduct);
export default router
    