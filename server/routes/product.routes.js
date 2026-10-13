import { Router } from "express";
import productController from "../controllers/product.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router=Router()
router.route("/").post(upload.single("image"),productController.createProduct);
export default router
    