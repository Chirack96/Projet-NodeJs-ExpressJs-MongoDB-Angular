const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Remplacez par votre service de messagerie
  auth: {
    user: 'lebeauc29@gmail.com', // Remplacez par votre adresse email réelle
    pass: 'auah vewa ryaa ybvi' // Remplacez par votre mot de passe réel ou le mot de passe d'application
  }
});

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
        email: req.body.email,
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

exports.requestPasswordReset = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure plus tard
    await user.save();

    const resetUrl = `http://localhost:4200/finalresetpassword/${resetToken}`;
    const mailOptions = {
      to: user.email,
      from: 'yourEmail@example.com',
      subject: 'Réinitialisation du mot de passe',
      html: `Bonjour,<br><br>` +
            `Vous recevez cet email car vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n` +
            `Veuillez cliquer sur le lien suivant, ou copiez-le dans votre navigateur pour compléter le processus :\n\n` +
            `<a href="${resetUrl}">${resetUrl}</a><br><br>` +
            `Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email et votre mot de passe restera inchangé.`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Un e-mail de réinitialisation de mot de passe a été envoyé à ' + user.email + '.' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.resetPassword = async (req, res, next) => {
  console.log("resetPassword: ",req.body);
  try {
    const { password } = req.body.newPassword;
    const { token } = req.params.token;

    if (!password) {
      return res.status(400).json({ error: "Le mot de passe ne peut pas être vide." });
    }

   const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(401).json({ error: "Le jeton de réinitialisation du mot de passe est invalide ou a expiré." });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    const mailOptions = {
      to: user.email,
      from: 'lebeauc29@gmail.com',
      subject: 'Votre mot de passe a été modifié',
      text: `Bonjour,\n\n` +
            `Ceci est une confirmation que le mot de passe de votre compte ${user.email} vient d'être modifié.\n`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Votre mot de passe a été modifié.' });
  }
  catch (error) {
    res.status(500).json({ error });
  }
};