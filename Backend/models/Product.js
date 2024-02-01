const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
    quantity: { type: Number, required: false },
});
module.exports = mongoose.model('Product', productSchema);