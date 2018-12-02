const express = require("express");
const router = express.Router();


const commentController = require("../controllers/commentController");
const validation = require("./validation");


router.post("/songs/:id/comments/create", validation.validateComments, commentController.create);
router.post("/songs/:id/comments/:id/destroy", commentController.destroy);

module.exports = router;
