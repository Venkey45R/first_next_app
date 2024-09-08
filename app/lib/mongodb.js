import mongoose from "mongoose";
const connectMongoDB = async () => {
    const uri = process.env.MONGO_DB_URI;
    if (!uri) {
        console.error("MongoDB URI is not defined");
        return;
    }
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error in connection", error);
    }
}

export default connectMongoDB;
