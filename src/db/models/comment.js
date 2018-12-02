'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    body: {
     type: DataTypes.STRING,
     allowNull: false
   },
   songId: {
     type: DataTypes.INTEGER,
     allowNull: false
   },
   userId: {
     type: DataTypes.INTEGER,
     allowNull: false
   }
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Song, {
      foreignKey: "songId",
      onDelete: "CASCADE"
    });

    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

  };
  return Comment;
};
