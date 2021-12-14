const express = require("express");
const { loadPosts } = require("../controller/postsController");
const router = express.Router();

router.get("/", loadPosts);

module.exports = router;
