const commentQueries = require("../db/queries.comments.js");
const Authorizer = require("../policies/comment.js");

module.exports = {
  create(req, res, next){
console.log(req);
    let newComment = {

        body: req.body.body,
        userId: req.user.dataValues.id,
        songId: req.params.id
      };

      console.log(newComment);

      commentQueries.createComment(newComment, (err, comment) => {

        if(err){
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });

  },

  destroy(req, res, next){
    commentQueries.deleteComment(req, (err, comment) => {
      if(err){
        res.redirect(err, req.headers.referer);
      } else {
        res.redirect(req.headers.referer);
      }
    });
  }
}
