const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
tag: String
});

module.exports = mongoose.model("category", categorySchema);
