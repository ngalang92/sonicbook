const fs = require("fs");
const path = require("path");
const Song = require("./models").Song;
const Comment = require("./models").Comment;
const User = require("./models").User;

module.exports = {

  getAllSongs(callback){

    var songsData = [];
    var songData = {};
    return Song.all()
     .then((songs) => {
       for (let i=0; i <songs.length; i++){
         let songData = {...songs[i].dataValues} //retrieving all songs from database
         songData.fileName = songData.originalname.split(".").slice(0, -1).join(".");
         songsData.push(songData);
       }
      //console.log(songsData);
        callback(null, songsData);
    })
    .catch((err) => {
      callback(err);
    })
  },

  uploadSong(newSong, callback){

    return Song.create({
      fieldname: newSong.fieldname,
      originalname: newSong.originalname,
      encoding: newSong.encoding,
      mimetype: newSong.mimetype,
      userId: newSong.userId,
      userName: newSong.userName
   })

 },

 getSong(id, callback){
   return Song.findById(id, {
      include: [
        {model: Comment, as: "comments", include: [
          {model: User }
        ]}
      ]
    })
   .then((song) => {
     callback(null, song);
   })
   .catch((err) => {
     callback(err);
   })
 },

 deleteSong(id, originalname, callback){
   //console.log(id);
   fs.unlink(("./src/assets/songs/" + originalname), (err) => {
     if (err) throw err;
   })
  //console.log(id);
   return Song.destroy({
     where: {id}
     })
   .then((id) => {
     //console.log(id);
     callback(null, id);
     })
   .catch((err) => {
     callback(err);
   })
  },


  updateSong(id, updatedSong, callback){ //getting updatedSong from multer metadata
     return Song.findById(id)
     .then((song) => {
       //console.log(song);
       fs.unlink(("./src/assets/songs/" + song.originalname), (err) => {
         if (err) throw err;
       })
       if(!song){
         return callback("Song not found");
       }

       //console.log(song);
       //console.log(updatedSong);
       song.update(updatedSong, {  //updating PSQL metadata
         fields: Object.keys(updatedSong)
       })
       .then(() => {
         callback(null, song);
       })
       .catch((err) => {
         callback(err);
       });
     });
   }

}
