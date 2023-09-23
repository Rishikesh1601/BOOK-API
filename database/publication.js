const mongoose = require("mongoose");

//create Publication schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name : String,
    books : [String]
})

//create a model 
const PublicationModel = mongoose.model("publications",PublicationSchema);

//export model
module.exports = PublicationModel;