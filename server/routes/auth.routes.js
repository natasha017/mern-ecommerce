import registerController from "../controllers/auth.controller.js"

import {Router} from "express"
const router=Router()

router.route("/register").get(registerController)

export default router
