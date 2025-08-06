import { asyncHandler } from "@/utilis-Backend/AsyncHandler.util.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/Error.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "@/utilis-Backend/apiResponse.util.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.header("authorization")?.accessToken;

  if (!token) throw new ApiResponse(401,"Error", "UnAtuhorized User without access token");

  const userDataToken = await jwt.verify( token, process.env.ACCESS_TOKEN_SECRET );
  if (!userDataToken)
    throw new ApiResponse(
      401,"error",
      "Invalid or Pirated JWT TOKEN Calling Police to you IP xD"
    );
  const userData = await User.findById(userDataToken._id);
  req.user = userData;

  // console.log(user)
  next();
});
export { verifyJWT };
