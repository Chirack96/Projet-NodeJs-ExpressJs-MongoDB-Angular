const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // unique: true => email must be unique
    password: { type: String, required: true },
    admin: { type: Boolean, required: false },
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);