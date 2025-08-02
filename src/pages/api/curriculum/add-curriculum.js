import Curriculum from "@/models/Curriculum";
import connectDB from "@/middlewares/connectDB";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { name, subject, grade, board, bookTitle, author, publisher, edition, numberOfChapters, topics, file } = req.body;
            const { userId } = req.user;
            let newCurriculum = new Curriculum({
                name, subject, grade, board, bookTitle, author, publisher, edition, numberOfChapters, topics, file,uploadedBy:userId
            })
            await newCurriculum.save();

            return res.status(200).json({
                type: "success",
                message: "Curriculum added successfully",
                user: sendUser,
                token
            });
        } catch (err) {
            console.error("Curriculum addition error:", err);
            return res.status(500).json({
                type: "error",
                message: "Something went wrong while adding curriculum.",
                errorCode: "LOGIN_FAILED",
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
