import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getCurrectUser } from "../controllers/user.controllers.js"

const userRouter = express.Router()

userRouter.get("/current", isAuth , getCurrectUser)

export default userRouter