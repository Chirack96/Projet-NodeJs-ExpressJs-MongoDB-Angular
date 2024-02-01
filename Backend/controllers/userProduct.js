const UserProduct = require('../models/UserProduct');
const Product = require('../models/Product');
exports.getAllUserProduct = async(req, res, next) => {
    console.log("get all user product");
  UserProduct.find()
    .then(userProduct => res.status(200).json(userProduct))
    .catch(error => res.status(400).json({ error }));
}

exports.createUSerProduct = async(req, res, next) => {
  const userProduct = new UserProduct({
    id_user: req.body.user_id,
    id_product: req.body.product_id,
  });
  console.log("userProduct", userProduct);
  userProduct.save()
    .then(() => {res.status(201).json({ message: 'produit enregistré !'})
  console.log("produit enregistré !");
  
  })
    .catch(error => {res.status(400).json({ error });console.log(error)});
}

exports.getProductUser = async (req, res, next) => {
  try {
    console.log(req.query.user_id);
    const userProducts = await UserProduct.find({ id_user: req.query.user_id });

    const productsDetails = await Promise.all(userProducts.map(async (product) => {
      const productDetails = await Product.findById(product.id_product);
      if (!productDetails) return null;

      console.log(productDetails.title);
      return {
        id: product.id_product,
        title: productDetails.title,
        description: productDetails.description,
        price: productDetails.price,
        image: productDetails.imageUrl
      };
    }));


    const filteredProducts = productsDetails.filter(product => product !== null);

    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
};
exports.deleteProductUser = async(req, res, next) => {
  console.log(req.query.user_id);
  console.log(req.query.product_id);
  UserProduct.deleteMany({  id_product: req.query.product_id})
    .then(() => res.status(200).json({ message: 'Produit supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}