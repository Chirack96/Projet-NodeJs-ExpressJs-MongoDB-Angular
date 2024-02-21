const { title } = require("process");
const Product = require("../models/Product");
const fs = require("fs");


exports.createProduct = (req, res, next) => {
console.log(req.body)

  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    userId: req.auth.userId,
    quantity: req.body.quantity,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  product
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
}


exports.modifyProduct = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    
    const productObject = req.file
        ? {
            ...JSON.parse(req.body.product),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
            }`,
        }
        : { ...req.body };
    
    delete productObject._userId;
    Product.findOne({ _id: req.params.id })
        .then((product) => {
        if (product.userId != req.auth.userId && req.auth.isAdmin == false) {
            res.status(401).json({ message: "Not authorized" });
        } else {

            Product.updateOne(
            { _id: req.params.id },
            { ...productObject, _id: req.params.id }
            )
            .then(() => res.status(200).json({ message: "Objet modifié!" }))
            .catch((error) => res.status(401).json({ error }));
        }
        })
        .catch((error) => {
        res.status(400).json({ error });
        });
    }


exports.deleteProduct = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    Product.findOne({ _id: req.params.id })
        .then((product) => {
        if (product.userId != req.auth.userId && req.auth.isAdmin == false) {
            res.status(401).json({ message: "Not authorized" });
        } else {
            const filename = thing.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


exports.getOneProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .then((product) => res.status(200).json(product))
        .catch((error) => res.status(404).json({ error }));
    }

    
exports.getAllProducts = (req, res, next) => {
  console.log("reqgfujyf");
        Product.find()
        .then((products) => {
          console.log("products", products);
          res.status(200).json(products);
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    }
    