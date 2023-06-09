/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-undef */
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag },
      ]
    })
    res.json(productData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag },
      ]
    })
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id' })
      return
    }
    res.json(productData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    if (!req.body.price) {
      throw new Error('Product price is required');
    }

    const productData = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: productData.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// update product
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const productTags = await ProductTag.findAll({
      where: {
        product_id: req.params.id,
      },
    });

    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => ({
        product_id: req.params.id,
        tag_id,
      }));

    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    res.status(200).json({ message: 'Product updated successfully.' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  console.log('Attempting to delete product:', req.params.id);
  try {
    const productData = await Product.destroy({
      where: { id: req.params.id }
    })

    console.log('Deletion response:', productData);

    if (!productData) {
      console.log('No product with this id:', req.params.id);
      res.status(404).json({ message: 'No product with this id' })
      return;
    }

    console.log('Product deleted successfully:', req.params.id);
    res.status(200).json({ message: 'Product deleted successfully.' })
  } catch (err) {
    console.error('Error during deletion:', err);
    res.status(500).json(err)
  }
});

module.exports = router;


/**----------------------
 *?    Info
 *------------------------**/

// API routes in Express.js with Sequelize typically follow a 
// certain structure where they define endpoints corresponding to 
// CRUD (Create, Read, Update, Delete) operations. 

//? router.post('/'): 
// This defines a new route for POST requests to the root URL ('/').

//? async (req, res) => { ... }: 
// This is an asynchronous function that takes a request and a response as 
// arguments. It's asynchronous because it uses the await keyword, which means 
// it can handle promises in a way that's easier to read and write.

//? try { ... } catch (err) { ... }: 
// This is a try-catch block. The code inside the try block is executed, and 
// if any errors are thrown, execution moves to the catch block.

//? res.json() 
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

//? async: 
// When placed before a function declaration, it means the function is asynchronous and 
// will return a Promise.

//? await: 
// It can only be used inside an async function and makes JavaScript wait until that 
// Promise settles and returns its result. Therefore, res.json(newProduct) is placed 
// after the await statement.

// await pauses the execution of the async function, it doesn't block the rest of
// the program. Other functions or lines of code outside the async function can still
// execute while the async function is waiting for Promises to resolve.

//? try...catch
// this is a common way to handle errors that may occur during the execution of code. 
// It's especially useful when dealing with asynchronous code (like database operations), 
// where errors are likely to occur due to external factors such as network issues, 
// database unavailability, etc.

        // try {
        // } catch () {
        // }

  //* try block
  // contains the code that may potentially throw an error.

  // If there is an error inside the try block, it immediately switches to the catch
  // block, which is designed to handle the error.

  //* catch block
  // In the catch block the error object is available, generally it's logged and some
  // sort of error message is sent back to the client.

        // catch (err) {
        //   res.status(errorCode 404 ).json(err);
        // }

  //? status codes
  // Informational responses (100 – 199)
  // Successful responses (200 – 299)
  // Redirection messages (300 – 399)
  // Client error responses (400 – 499)
  // Server error responses (500 – 599)
  // Error codes (https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)


/**------------------------------------------------------------------------
 * *                                Basic Delete route 
                                        I think
router.delete('/:id', (req, res) => {
  try {
    const somethingData = await Something.destroy({
      where: { id: req.params.id, },
    })
    if (!somethingData) {
      res.status(404).json({ message: 'message about nothing connected to id' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
 *------------------------------------------------------------------------**/

