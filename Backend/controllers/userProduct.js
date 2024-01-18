const UserProduct = require('../models/UserProduct');

exports.getAllUserProduct = async(req, res, next) => {
    console.log("get all user product");
  UserProduct.find()
    .then(userProduct => res.status(200).json(userProduct))
    .catch(error => res.status(400).json({ error }));
}

exports.createUSerProduct = async(req, res, next) => {
  //console.log("create user product", req.body);
  //console.log("create user product", req.body.user_id);
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

exports.getProductUser = async(req, res, next) => {
  console.log(req.query.user_id);
  UserProduct.find({ id_user: req.query.user_id})
    .then((userProduct) => {
      userProduct = userProduct.map((product) => {
        return {id:product.id_product, name:product.name, description:product.description, price:product.price, image:product.image};
      });
      userProduct = userProduct.filter((product) => {
        return product !== undefined;
      });
      
      
      res.status(200).json(userProduct)})
    .catch(error => res.status(400).json({ error }));
}


//Fais la methode filter dans le front pour recuperer les produits