import authController from "../controllers/auth.controller.js"
import {Router} from "express"
import validate from "../middlewares/validate.middleware.js"
import signUpSchema from "../validator/auth.validator.js"

const router=Router()

router.route("/register").post(validate(signUpSchema),authController.register)
router.route("/login").post(authController.login)

export default router
