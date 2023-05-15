/* eslint-disable no-undef */
// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
})

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'tags',
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'products',
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

/**======================
 *?    Info
 *========================**/

//? Product.belongsTo(Category) 
// creates a relationship where a Product can belong to one 
// Category. This inserts a category_id foreign key in the 
// Product table.

//? Category.hasMany(Product) 
// creates a relationship where a Category can have multiple 
// Products.

//? onDelete: 'CASCADE' means that when a Category is deleted, 
// all associated Products will also be deleted.

//? Product.belongsToMany(Tag, { through: ProductTag }) 
// creates a relationship where a Product can have multiple Tags. 
// The through option tells Sequelize to use the ProductTag model 
// to create this many-to-many relationship.

//? Tag.belongsToMany(Product, { through: ProductTag }) 
// creates a relationship where a Tag can have multiple Products. 
// It also uses the ProductTag model to create this many-to-many 
// relationship.

//? as:
// option is used to provide an alias for this association, which 
// can be used in eager loading and other Sequelize methods.