const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
exports.signup =  async(req, res, next) => {
  console.log("signup: ",req.body);
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(401).json({ error: "Utilisateur déjà existant !" });
      }
    })
    .catch((error) => res.status(500).json({ error, msg: false }));
  bcrypt
    .hash(req.body.password, 10)
    .then(async (hash) => {
      const user = new User({
        username: req.body.username,
        //password: req.body.password
        password: hash,
      });
      console.log(user);
     await  user
        .save()

        .then(() => res.status(201).json({ message: "Utilisateur créé !" ,msg: true}))
        .catch((saveError) => {
        console.error("Error saving user:", saveError);
        res.status(400).json({ error: 'Error saving user to the database' });
      });
    })
    .catch((error) => res.status(500).json({ error, msg: false }));
};

exports.login = (req, res, next) => {
  console.log("login: ",req.body);
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            msg: true,
            token: jwt.sign(
              { userId: user._id, isAdmin: user.admin },
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error, msg: false }));
};

exports.getAllUsers = (req, res, next) => {
  console.log("getAllUsers");
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.getCurrentUser = (req, res, next) => {
  console.log("getCurrentUser");
  User.findOne({ _id: req.auth.userId })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json({ error }));
};

