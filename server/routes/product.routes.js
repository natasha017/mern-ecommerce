import { Router } from "express";
import productController from "../controllers/product.controller.js";
import upload from "../middlewares/multer.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import productSchema from "../validator/product.validator.js";
import validateQuery from "../middlewares/validateQuery.js";
import productQuerySchema from "../validator/productQuery.js";

const router=Router()
router
.route("/")
.post(upload.single("image"),validate(productSchema),productController.createProduct);

router.route("/").get(validateQuery(productQuerySchema),productController.getAllProducts)

export default router
    