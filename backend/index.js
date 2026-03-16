import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import { connectDB } from "./config/db.js";

import { setServers } from "node:dns/promises";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";

import authRouter from "./routes/auth.routes.js";
setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config()


// app config
const app = express();
const port =process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  withCredentials:true
}));

app.use(cookieParser())
app.use("/api/auth",authRouter)




// DB connection
connectDB();

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});
