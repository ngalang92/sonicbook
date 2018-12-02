const app = require("./app");
const fs = require("fs");
const http = require("http");
const server = http.createServer(app);
const port = normalizePort(process.env.PORT || "3000");
const path = require('path')
const multer = require('multer')
const songController = require("./controllers/songController")
app.set("port", port);

server.listen(port);


function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

server.on("listening", () => {
  console.log(`server is listening for requests on port ${server.address().port}`);
});



var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './src/assets/songs')
	},
	filename: function(req, file, callback) {
		//console.log(file);
    //songController.create(req, file, callback);
    var songName = file.originalname.split(".").slice(0, -1).join(".") + path.extname(file.originalname);
		callback(null, songName)
	}

})

app.post('/songs/create', function(req, res) {
	var upload = multer({
		storage: storage,
    fileFilter: function(req, file, callback) {
      console.log(file);
      	var ext = path.extname(file.originalname)
      //console.log(ext);
      	if (ext !== '.mp3' && ext !== '.wav' && ext !== '.aiff' && ext !== '.mp4'&& ext !== '.m4a') {
      		return callback(res.end("Audio file extensions only, please try again."), null)
      	}
        songController.create(req, file, callback); //will use meta data from multer to use in PSQL
      	callback(null, true)
      }
	}).single("song")
	upload(req, res, function(err) {
    //console.log(req);
    res.redirect("/songs")
	})
});


var editStorage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './src/assets/songs')
	},
	filename: function(req, file, callback) {
		//console.log(file);
    //songController.update(req, file, callback);
    var songName = file.originalname.split(".").slice(0, -1).join(".") + path.extname(file.originalname);
		callback(null, songName)
	}

})

app.post('/songs/:id/:originalname/update', function(req, res) { //receiving the post request from routes and edit.ejs
	var upload = multer({
		storage: editStorage,
    fileFilter: function(req, file, callback) {
      //console.log(file);
        songController.update(req, file, callback); //this will use meta info from multer to update SQL
      	var ext = path.extname(file.originalname)
      	if (ext !== '.mp3' && ext !== '.wav' && ext !== '.aiff' && ext !== '.mp4' && ext !== '.m4A') {
      		return callback(res.redirect("/songs"), null)
      	}
      	callback(null, true)
      }
	}).single("song")
	upload(req, res, function(err) {
    //console.log(req);
    res.redirect("/songs")

	})
});
