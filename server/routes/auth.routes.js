import authController from "../controllers/auth.controller.js"

import {Router} from "express"
const router=Router()

router.route("/register").post(authController.register)
router.route("/login").post(authController.login)

export default router
