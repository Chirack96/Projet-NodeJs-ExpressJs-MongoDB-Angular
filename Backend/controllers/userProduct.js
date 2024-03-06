const UserProduct = require('../models/UserProduct');
const Product = require('../models/Product');

exports.getAllUserProduct = async(req, res, next) => {
    console.log("get all user product");
  UserProduct.find()
    .then(userProduct => res.status(200).json(userProduct))
    .catch(error => res.status(400).json({ error }));
}

exports.createUSerProduct = async(req, res, next) => {

  UserProduct.findOne({ id_user: req.body.user_id, id_product: req.body.product_id })
    .then(userProduct => {
      if (userProduct) {
        return UserProduct.updateOne(
          { _id: userProduct._id },
          { $inc: { quantity: req.body.quantity++ } }
        ).then(() => {
          res.status(200).json({ message: 'Quantité mise à jour avec succès !' });
          console.log('Quantité mise à jour avec succès !');
          console.log(userProduct);
        });
      } else {
  const userProduct = new UserProduct({
    id_user: req.body.user_id,
    id_product: req.body.product_id,
    quantity: req.body.quantity
  });
  console.log("userProduct", userProduct);
  userProduct.save()
    .then(() => {res.status(201).json({ message: 'produit enregistré !'})
  console.log("produit enregistré !");
  
  })
    .catch(error => {res.status(400).json({ error });console.log(error)});
}
})
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
        image: productDetails.imageUrl,
        quantity: product.quantity,
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
  UserProduct.deleteOne({  id_product: req.query.product_id})
    .then(() => res.status(200).json({ message: 'Produit supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.updateProductUser = async (req, res, next) => {
  const { user_id, product_id, quantity } = req.body;
  console.log('Mise à jour demandée pour', { user_id, product_id, quantity });

  try {
    const existingProduct = await UserProduct.findOne({ id_user: user_id, id_product: product_id, });
    if (existingProduct) {
      await UserProduct.updateOne({ _id: existingProduct._id }, { $set: { quantity: quantity } });
      console.log('Quantité mise à jour avec succès !', { quantity });
      res.status(200).json({ message: 'Quantité mise à jour avec succès !' });
    } else {
      console.log('Produit non trouvé.');
      res.status(404).json({ message: 'Produit non trouvé.' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour', error);
    res.status(400).json({ error });
  }
};

