'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
     type: DataTypes.STRING,
     allowNull: false,
    },
    email: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
       isEmail: { msg: "Must be a valid email" },
     },
    },
    password: {
     type: DataTypes.STRING,
     allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "standard"
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Song, {
      foreignKey: "userId",
      as: "songs"
    })

    User.hasMany(models.Comment, {
      foreignKey: "userId",
      as: "comments"
    });
  };



  User.prototype.isStandard = function() {
    return this.role === "standard";
  };
  User.prototype.isPremium = function() {
    return this.role === "premium";
  };

/*
  User.prototype.isAdmin = function() {
    return this.role === "admin";
  };
*/


  return User;
};
