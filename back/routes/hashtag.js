const express = require("express");
const { getHashtagPosts } = require("../controller/hashtagController");

const router = express.Router();

router.get("/:hashtag/posts", getHashtagPosts);

module.exports = router;
