module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const songRoutes = require("../routes/songs")
    const commentRoutes = require("../routes/comments");

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(songRoutes);
    app.use(commentRoutes);
  }
}
