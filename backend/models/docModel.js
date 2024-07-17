const mongoose = require("mongoose");

const docschema = new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: String, require: true},
    experience: {type: String, require: true},
    specialization: {type: String, require: true},
    hospital: {type: String, require: true},
    address: {type: String, require: true},
    contact: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    detail: {type: String, require: true}
},
{
    timestamps: true
})

const Doc = mongoose.model("Doc", docschema);
module.exports = Doc;