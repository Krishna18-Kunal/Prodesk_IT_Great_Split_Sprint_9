const express = require("express");

const router = express.Router();

// Mock login endpoint for sprint demonstration only
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  // This is a demo token, not a real JWT.
  const mockToken = `mock-jwt-${Date.now()}-${Buffer.from(email).toString("base64")}`;

  res.status(200).json({
    success: true,
    message: "Mock login successful",
    token: mockToken,
    user: {
      email
    }
  });
});

module.exports = router;