const fs = require("fs")
const songQueries = require("../db/queries.songs.js");
 module.exports = {
  index(req, res, next){
    songQueries.getAllSongs((err, songsData) => {
        if(err){
          //console.log(err);
          res.redirect(500, "static/index");
        } else {
          //console.log(songsData);
          res.render("songs/index", {songsData});
        }
      })
  },
  upload(req, res, next){
      res.render("songs/upload");
  },
  create(req, res, next){
    //console.log(req);
     let newSong = {  //sending this object to songQueries to send to PSQL
       fieldname: res.fieldname,
       originalname: res.originalname,
       encoding: res.encoding,
       mimetype: res.mimetype,
       userId: req.user.dataValues.id
     };
     songQueries.uploadSong(newSong, (err, song) => {
       if(err){
         res.redirect(500, "/songs/upload");
       } else {
         res.redirect(303, `/songs/${song.id}`);
       }
     });
   },


   show(req, res, next){
     songQueries.getSong(req.params.id, (err, song) => {
       if(err || song == null){
         //console.log(err);
         res.redirect(404, "/");
       } else {
         res.render("songs/show", {song});
       }
     });
   },

   destroy(req, res, next){
     //console.log(req.params);
     songQueries.deleteSong(req.params.id, req.params.originalname, (err, song) => {
       if(err){
         res.redirect(500, `/songs/${song.id}`)
       } else {
         res.redirect(303, "/songs")
       }
     });

   },

   edit(req, res, next){
     songQueries.getSong(req.params.id, (err, song) => {
       if(err || song == null){
         res.redirect(404, "/");
       } else {
         res.render("songs/edit", {song});
       }
     });
   },

   delete(req, res, next){
     //console.log(req);
     //console.log(res);
     songQueries.getSong(req.params.id, (err, song) => {
       if(err || song == null){
         res.redirect(404, "/");
       } else {
         res.render("songs/delete", {song});
       }
     });
   },

   update(req, res, next){  //using PSQL metadata from current song to pass id into songQueries.updateSong
     //console.log(req);
     songQueries.updateSong(req.params.id, res, (err, song) => {
       if(err || song == null){
         res.redirect(404, `/songs/${req.params.id}/update`);
       } else {
         console.log("Song Updated.")
       }
     });
   },


}
