const express = require("express");

const router = express.Router();

// In-memory data: resets whenever the server restarts.
let blogPosts = [
  {
    id: 1,
    title: "Welcome to My Blog",
    content: "This is my first blog post.",
    author: "Niranjan"
  },
  {
    id: 2,
    title: "Learning Node.js",
    content: "I am learning backend development with Express.",
    author: "Niranjan"
  }
];

// GET /posts - Get all posts
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: blogPosts.length,
    data: blogPosts
  });
});

// GET /posts/:id - Get one post
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = blogPosts.find((item) => item.id === id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  res.status(200).json({
    success: true,
    data: post
  });
});

// POST /posts - Create a post
router.post("/", (req, res) => {
  const { title, content, author } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof content !== "string" ||
    !content.trim() ||
    typeof author !== "string" ||
    !author.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Title, content, and author are required"
    });
  }

  const newPost = {
    id: Date.now(),
    title: title.trim(),
    content: content.trim(),
    author: author.trim()
  };

  blogPosts.push(newPost);

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: newPost
  });
});

// PUT /posts/:id - Update a post
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = blogPosts.find((item) => item.id === id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  const { title, content, author } = req.body;

  if (
    (title !== undefined &&
      (typeof title !== "string" || !title.trim())) ||
    (content !== undefined &&
      (typeof content !== "string" || !content.trim())) ||
    (author !== undefined &&
      (typeof author !== "string" || !author.trim()))
  ) {
    return res.status(400).json({
      success: false,
      message: "Provided fields must be non-empty strings"
    });
  }

  if (title !== undefined) post.title = title.trim();
  if (content !== undefined) post.content = content.trim();
  if (author !== undefined) post.author = author.trim();

  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: post
  });
});

// DELETE /posts/:id - Delete a post
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = blogPosts.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  const deletedPost = blogPosts.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
    data: deletedPost
  });
});

module.exports = router;