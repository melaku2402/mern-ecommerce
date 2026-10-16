import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js'
dotenv.config();
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js';
import productRouter from './routes/ProductRoute.js';
import cartRouter from "./routes/cartRoute.js";
import orderRoute from './routes/orderRoute.js';
// app Config
const app = express()
const port = process.env.PORT || 4000


// middlewares
app.use(express.json())
app.use(cors())
connectDB()
connectCloudinary()

// api end points
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRoute)



app.get("/", (req, res) => {
  res.send("API Working!")
});

app.listen(port,()=>console.log('Server started on PORT :'+port))