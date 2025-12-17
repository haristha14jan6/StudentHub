//@ts-nocheck
export const protect = (req, res, next) => {
  // TEMPORARY for testing student submission
  req.user = {
    id: "66abcdef1234567890abcd12", // any random Mongo ObjectId format
    role: "student"
  };
  next();
};

