import connectDB from "@/middlewares/connectDB";

const handler = (req, res) => {
    res.status(200).json({ message: 'Hello, World!' });
}

export default connectDB(handler);