'use strict';
module.exports = (sequelize, DataTypes) => {
  var Song = sequelize.define('Song', {
    fieldname: DataTypes.STRING,
    originalname: DataTypes.STRING,
    encoding: DataTypes.BLOB,
    mimetype: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    userName: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.User, {
     foreignKey: "userId",
     onDelete: "CASCADE"
   });

   Song.hasMany(models.Comment, {
    foreignKey: "songId",
    as: "comments"
   });
  };
  return Song;
};
