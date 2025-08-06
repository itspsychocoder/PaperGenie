import Curriculum from "@/models/Curriculum";
import connectDB from "@/middlewares/connectDB";
import jwt from "jsonwebtoken";
import Assessment from "@/models/Assessment";
import mongoose from "mongoose";
import { ApiResponse } from "@/utilis-Backend/apiResponse.util";
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      // console.log("token --------- ",token)
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

      const { assessmentId } = req.body;

      if (!assessmentId) {
        return res.status(400).json({
          type: "error",
          message: "assessmentId  is required",
        });
      }
      console.log("user id : ", decoded.userId);
      // Check if curriculum exists and belongs to the user
      const existingAssessment = await Assessment.findOne({
        _id: new mongoose.Types.ObjectId(assessmentId),
        createdBy: decoded.userId,
      });

      if (!existingAssessment) {
        return res.status(404).json({
          type: "error",
          message: "existingAssessment not found ",
        });
      }

      // delete the curriculum
      const response = await Assessment.findByIdAndDelete(assessmentId);
      console.log("response from find and dell", response);
      if (!response) {
        return res
          .status(401)
          .json(
            new ApiResponse(401, "Failur", "Assessment not found in response ")
          );
      }
      return res.status(200).json({
        type: "success",
        message: "assessment Deleted successfully",
      });
    } catch (err) {
      console.error("assessment delete error:", err);
      return res.status(500).json({
        type: "error",
        message: "Something went wrong while deleting assessment.",
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
