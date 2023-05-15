/* eslint-disable no-undef */
const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", (req, res) => {
  const productData = await Product.findAll({
    include: [
      {
        model: Category,

      },
      {
        model: Tag,
      },
    ]
  })
  res.json(productData)
});

// get one product
router.get("/:id", (req, res) => {
  const newProduct = await Product.create(req.body)
  res.json(newProduct)
});

// create new product
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;


/**----------------------
 *?    Info
 *------------------------**/

//  API routes in Express.js with Sequelize typically follow a 
// certain structure where they define endpoints corresponding to 
// CRUD (Create, Read, Update, Delete) operations. 

// The placement of res.json() in your code depends on the logic 
// of your route handler. The key thing to understand is that res.json() 
// is used to end the response process and send the data back to the client.

  //? .findAll() 
  // is used to fetch all products from the database. This operation is asynchronous 
  // and returns a promise, so you need to await its completion before you can send 
  // the result back to the client. Therefore, res.json(productData) is placed after 
  // the await statement.

//? .create(req.body)
// is used to create a new product in the database. This operation is also asynchronous 
// and returns a promise, so you need to await its completion before you can send the 
// result back to the client.Therefore, res.json(newProduct) is also placed after the 
// await statement in this route.
// 