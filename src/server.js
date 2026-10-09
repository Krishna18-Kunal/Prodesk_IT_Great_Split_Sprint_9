const express = require("express");

const logger = require("./middleware/logger");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 5000;

// Parse incoming JSON request bodies
app.use(express.json());

// Custom request logger
app.use(logger);

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sprint 9 Blog API is running!",
    endpoints: {
      getAllPosts: "GET /posts",
      getPostById: "GET /posts/:id",
      createPost: "POST /posts",
      updatePost: "PUT /posts/:id",
      deletePost: "DELETE /posts/:id",
      login: "POST /login"
    }
  });
});

// API routes
app.use("/posts", postsRouter);
app.use("/", authRouter);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Handle invalid JSON and other errors
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.status === 400
      ? "Invalid JSON request body"
      : "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`Blog API running on http://localhost:${PORT}`);
});