const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const extractToken = (rawToken) => {
  // Check if rawToken is an array
  if (!Array.isArray(rawToken)) {
    return null;
  }

  const cookiesIndex = rawToken.indexOf("Cookies");

  if (cookiesIndex !== -1 && cookiesIndex + 1 < rawToken.length) {
    const cookiesValue = rawToken[cookiesIndex + 1];
    const match = cookiesValue.match(/token=([^;]+)/);

    if (match) {
      return match[1];
    }
  }

  return null;
};

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const rawToken = req.rawHeaders;
  const token = extractToken(rawToken);

  console.log(token);
  if (!token) {
    return next(new ErrorHandler("Please login to update the profile", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  console.log(req.user);

  next();
});
