// middlewares/validation.middleware.js

module.exports.validateCandidate = (req, res, next) => {
  const { name, age, email } = req.body;

  // Name validation
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Name is required and must be text" });
  }

  // Age validation
  if (!age || isNaN(age) || age <= 0) {
    return res.status(400).json({ error: "Valid age is required" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  next(); // move to controller
};
