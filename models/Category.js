const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model { }

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;


/**-----------------------
 * ?       INFO
 *------------------------**/
// ? id: 
// This is the primary key for the Category table. It is of type 
// INTEGER, it cannot be null, and it auto-increments.

//? category_name: 
// This is a string attribute that cannot be null.

// ? primaryKey: true: 
// In a database table, the primary key is a unique 
// identifier for each record. Each table can have only one 
// primary key. Setting primaryKey: true in a Sequelize model 
// attribute will make Sequelize generate the SQL to designate 
// that column as the primary key.

// ? autoIncrement: true: 
// This is used in conjunction with the INTEGER datatype and will 
// make the value of the field automatically increase by 1 for 
// each new record, starting at 1. This is often used with primary 
// key fields to create a unique ID for each record automatically. 
// So, the first record inserted will have an ID of 1, the second 
// record an ID of 2, and so on. Setting autoIncrement: true in a 
// Sequelize model attribute will make Sequelize generate the SQL 
// to set that column to auto-increment.

//? sequelize: 
// This is the configured Sequelize instance.
//? timestamps: 
// This is set to false to not automatically add timestamp fields 
// (createdAt and updatedAt) to the model.
//? freezeTableName: 
// This is set to true to prevent Sequelize from pluralizing the 
// model name to define the table name in the database. 
//? underscored: 
// This is set to true to use snake_case rather than camelCase for 
// the automatically added timestamp fields.
//? modelName: 
// This defines the name of the model.