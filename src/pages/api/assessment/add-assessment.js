import Assessment from "@/models/Assessment";
import connectDB from "@/middlewares/connectDB";
// import { asyncHandler } from "@/utilis-Backend/AsyncHandler.util";
import { ApiResponse } from "@/utilis-Backend/apiResponse.util.js";
import jwt from "jsonwebtoken";
import { Sedgwick_Ave_Display } from "next/font/google";
// import { ApiError } from "@/utilis-Backend/Error.util";
// import { verifyJWT } from "@/middlewares/verifyJWT.middleware";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json(new ApiResponse(405, "Method Not Allowed - Request must be POST"));
  }
  try {
    if (!req.body)
      return res.status(500).json(new ApiResponse(500, "Req. Body not found"));

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

    // Debug logging
    // console.log("Request method:", req.method);
    // console.log("Content-Type:", req.headers['content-type']);
    // console.log("Request body:", req.body);
    // console.log("Body keys:", Object.keys(req.body || {}));

    const {
      title,
      subject,
      assessmentType,
      duration,
      difficultyLevel,
      passingPercentage,
      numberOfQuestions,
      marksPerQuestion,
      topicsCovered,
      assessmentFile,
    } = req.body;

    console.log(title);
    const assessmentTitle = title;

    // Validate required fields
    if (!title || !subject || !assessmentType) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            "Error",
            "Missing required fields: assessmentTitle, subject, assessmentType"
          )
        );
    }

    console.log("Assessment data received:", {
      assessmentTitle,
      subject,
      assessmentType,
      duration,
      difficultyLevel,
      passingPercentage,
      numberOfQuestions,
      marksPerQuestion,
      topicsCovered,
    });
    console.log(decoded);
    // Create new assessment
    const newAssessment = new Assessment({
      assessmentTitle,
      subject,
      assessmentType,
      duration: parseInt(duration),
      difficulty: difficultyLevel,
      passingPercentage: parseInt(passingPercentage),
      numberOfQuestions: parseInt(numberOfQuestions),
      marksPerQuestion: parseInt(marksPerQuestion),
      totalMarks: parseInt(numberOfQuestions) * parseInt(marksPerQuestion),
      topicsCovered: Array.isArray(topicsCovered)
        ? topicsCovered
        : topicsCovered
        ? String(topicsCovered)
            .split(",")
            .map((t) => t.trim())
        : [],
      assessmentFile,
      createdBy: decoded.userId,
    });

    const savedAssessment = await newAssessment.save();
    if (!savedAssessment)
      return res
        .status(200)
        .json(
          new ApiResponse(
            500,
            "Failur",
            "Assessment not saved to Db",
            savedAssessment
          )
        );
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Success",
          "Assessment created successfully",
          savedAssessment
        )
      );
  } catch (error) {
    console.log("Error creating assessment:", error);
    return res.status(500).json(new ApiResponse(500, error.message));
  }
};

export default connectDB(handler);
