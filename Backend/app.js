const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const storeProductRoutes = require('./routes/storeProduct');
const userProductRoutes = require('./routes/userProduct');
const userRoutes = require('./routes/user');
const path = require('path');
const cors = require('cors');



mongoose.connect('mongodb+srv://mavidapatrick:Rennes35000@cluster0.qiaejfh.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

  app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
});

app.use(bodyParser.json());


app.use('/storeProduct', storeProductRoutes);
app.use('/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/user-product', userProductRoutes);

module.exports = app;