import authController from "../controllers/auth.controller.js"
import {Router} from "express"
import validate from "../middlewares/validate.middleware.js"
import authValidators from "../validator/auth.validator.js"


const router=Router()

router.route("/register").post(validate(authValidators.signUpSchema),authController.register)
router.route("/login").post(validate(authValidators.signInSchema),authController.login)

export default router
