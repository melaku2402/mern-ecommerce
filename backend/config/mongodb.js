import mongoose from "mongoose";

mongoose.connection.on('connected',()=>{
    console.log('DB connected');
})

const connectDB = async () =>{
    await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);
}

export default connectDB