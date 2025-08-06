import Curriculum from "@/models/Curriculum";
import connectDB from "@/middlewares/connectDB";
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            console.log("in delete----------------")

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

            const { curriculumId } = req.body;

            if (!curriculumId) {
                return res.status(400).json({
                    type: "error",
                    message: "Curriculum ID is required"
                });
            }

            // Check if curriculum exists and belongs to the user
            const existingCurriculum = await Curriculum.findOne({
                _id: curriculumId,
                uploadedBy: decoded.userId
            });

            if (!existingCurriculum) {
                return res.status(404).json({
                    type: "error",
                    message: "Curriculum not found or you don't have permission to update it"
                });
            }

            // delete the curriculum
            await Curriculum.findByIdAndDelete(curriculumId);

            return res.status(200).json({
                type: "success",
                message: "Curriculum Deleted successfully",
            });

        } catch (err) {
            console.error("Curriculum delete error:", err);
            return res.status(500).json({
                type: "error",
                message: "Something went wrong while deleting curriculum.",
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