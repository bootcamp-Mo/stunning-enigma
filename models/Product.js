/* eslint-disable no-undef */
// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isInt: true,
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;


/**----------------------
 *?    QUESTION HEADER
 *------------------------**/

//? validate:
// Validation rules are functions that run when data is being
//  saved into a model field. If the validation function returns 
//  an error, the save operation is cancelled and the error is 
//  passed up to the caller.
    //* is:
    // Matches a field value against a regular expression.
    //* min and max:
    // Validate that a number falls within a certain range.
    //* isEmail:
    // Checks if the field value is a valid email address.
    //* notEmpty:
    // Checks if the field value is not empty.
    //* isDecimal:
    // Checks if the field value is a decimal.
    //* length:
    // Validates the length of a string.
    //* isInt:
    // Checks if the field value is an integer.
    //* defaultValue:
    // Set a default value for a field.

//? references:
// property is used to establish a relationship between 
// different models through a foreign key. It essentially tells 
// Sequelize that the given field is not just a regular field, 
// but it is a reference (or a link) to another model.
    //* model:
    // This is the name of the model that the foreign key refers to.
    // This means that the foreign key is pointing to an instance in
    // the Category model.

    //* key:
    // This is the specific attribute in the referenced model that
    // the foreign key is linked to. In this case, it's the 'id' field
    // in the Category model.
    
  //? Explanations
  // When Sequelize creates the table, it will also create a foreign key 
  // constraint in the database. This ensures that any value that you try to 
  // insert into this field must correspond to a valid 'id' in the Category 
  // table. If you try to insert a value that doesn't correspond to a valid 
  // 'id', the database will reject the insert operation. This helps to 
  // maintain the referential integrity of your data.