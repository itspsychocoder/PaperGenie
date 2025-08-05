import Curriculum from "@/models/Curriculum";
import connectDB from "@/middlewares/connectDB";
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({
                    type: "error",
                    message: "Unauthorized"
                });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                return res.status(401).json({
                    type: "error",
                    message: "Invalid token"
                });
            }

            const curriculums = await Curriculum.find({ uploadedBy: decoded.userId });

            return res.status(200).json({
                type: "success",
                message: "Curriculums retrieved successfully",
                curriculums
            });
        } catch (err) {
            console.error("Curriculum retrieve error:", err);
            return res.status(500).json({
                type: "error",
                message: "Something went wrong while getting curriculums.",
                error: err.message,
            });
        }
    } else {
        return res.status(405).json({
            type: "error",
            message: "Method Not Allowed.",
            errorCode: "METHOD_NOT_ALLOWED",
        });
    }
};

export default connectDB(handler);
