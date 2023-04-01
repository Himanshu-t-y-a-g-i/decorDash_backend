const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name:String,
    image: Object,
    brand: String,
    originalPrice:Number,
    discountPrice:Number,
    category: String
})

const prodModel = mongoose.model("product", schema);

module.exports = { prodModel };