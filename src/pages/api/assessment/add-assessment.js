import Assessment from "@/models/Assessment";
import connectDB from "@/middlewares/connectDB";
import { asyncHandler } from "@/utilis-Backend/AsyncHandler.util";
import { ApiResponse } from "@/utilis-Backend/apiResponse.util";
import { ApiError } from "@/utilis-Backend/Error.util";

const handler = async (req, res) => {
    try {
        if (req.method !== "POST") {
            return res.status(405).json(new ApiResponse(405, "Error", "Method Not Allowed - Request must be POST"));
        }

        const { 
            assessmentTitle,
            subject,
            assessmentType, 
            duration,
            difficultyLevel,
            passingPercentage,
            numberOfQuestions,
            marksPerQuestion,
            topicsCovered,
            assessmentFile
        } = req.body;

        // Validate required fields
        if (!assessmentTitle || !subject || !assessmentType) {
            return res.status(400).json(new ApiResponse(400, "Error", "Missing required fields: assessmentTitle, subject, assessmentType"));
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
            topicsCovered
        });

        // Create new assessment
        const newAssessment = new Assessment({
            title: assessmentTitle,
            subject,
            assessmentType,
            duration: parseInt(duration),
            difficulty: difficultyLevel,
            passingPercentage: parseInt(passingPercentage),
            numberOfQuestions: parseInt(numberOfQuestions),
            marksPerQuestion: parseInt(marksPerQuestion),
            totalMarks: parseInt(numberOfQuestions) * parseInt(marksPerQuestion),
            topicsCovered: Array.isArray(topicsCovered) ? topicsCovered : topicsCovered?.split(',').map(t => t.trim()),
            assessmentFile,
            createdDate: new Date(),
            status: "Draft"
        });

        const savedAssessment = await newAssessment.save();

        return res.status(201).json(
            new ApiResponse(201, "Success", "Assessment created successfully", savedAssessment)
        );

    } catch (error) {
        console.error("Error creating assessment:", error);
        return res.status(500).json(
            new ApiResponse(500, "Error", "Internal server error", error.message)
        );
    }
};

export default connectDB(handler);


