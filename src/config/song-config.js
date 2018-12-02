const multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, '../assets/songs')
	},
	filename: (req, file, cb) => {
	  cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
	}
});

var upload = multer({song: storage});

module.exports = upload;
