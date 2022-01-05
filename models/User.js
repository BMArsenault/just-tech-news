const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {}

// define table columns and configuration
User.init(
  {
        // define an id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
        // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
        // define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
      isEmail: true
      }
    },
        // define a password column
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // this means the password must be at least four characters long
        len: [4]
        }
      }
    },
    {
      hooks: {
         // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
  },
      },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
      sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
      timestamps: false,
    // don't pluralize name of database table
      freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
      underscored: true,
    // make it so our model name stays lowercase in the database
      modelName: 'user'
    }
);

module.exports = User;