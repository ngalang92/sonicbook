const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController")
const upload = require('../config/song-config.js');



//recieves requests from ejs pages and passes to songController
router.get("/songs", songController.index);
router.get("/songs/upload", songController.upload);
router.get("/songs/:id/:originalname", songController.show);
router.get("/songs/:id/:originalname/delete", songController.delete);
router.post("/songs/:id/:originalname/destroy", songController.destroy);
router.get("/songs/:id/:originalname/edit", songController.edit);
//router.get("/songs/:id/delete")






module.exports = router;
