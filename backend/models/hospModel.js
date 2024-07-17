const mongoose = require("mongoose");

const hospschema = new mongoose.Schema({
    name: { type: String, require: true },
    address: { type: String, require: true, unique: true },
    contact: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    since: { type: String, require: true }
})

const Hospital = mongoose.model("Hospital", hospschema);
module.exports = Hospital;  //exporting the model to use in other files.  // Hospital