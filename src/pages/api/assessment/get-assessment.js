import Curriculum from "@/models/Curriculum";
import connectDB from "@/middlewares/connectDB";
import jwt from "jsonwebtoken";
import Assessment from "@/models/Assessment";
import mongoose from "mongoose";
const handler = async (req, res) => {
    
  if (req.method === "GET") {
    try {
         const { assessmentId } = req.body;

      if (!assessmentId) {
        return res.status(400).json({
          type: "error",
          message: "assessmentId  is required",
        });
      }

      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          type: "error",
          message: "Unauthorized",
        });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({
          type: "error",
          message: "Invalid token",
        });
      }

      const assessment = await Assessment.findOne({
        _id: new mongoose.Types.ObjectId(assessmentId),
        createdBy: decoded.userId,
      });

      console.log(assessment);

      return res.status(200).json({
        type: "success",
        message: "Curriculums retrieved successfully",
        assessment,
      });
    } catch (err) {
      console.error("assessment retrieve error:", err);
      return res.status(500).json({
        type: "error",
        message: "Something went wrong while getting assessment.",
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
