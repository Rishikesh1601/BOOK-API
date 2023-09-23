const mongoose = require("mongoose");

//create a author schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name : String,
    books : [String]
})

//create a model
const AuthorModel = mongoose.model("Authors",AuthorSchema);

//export model
module.exports = AuthorModel;