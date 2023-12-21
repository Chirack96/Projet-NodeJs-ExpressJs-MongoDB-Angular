const mongoose = require("mongoose");
const userProductSchema = mongoose.Schema({
  id_user: { type: String, required: true },
  id_product: { type: String, required: true },
});
module.exports = mongoose.model("UserProduct", userProductSchema);
