// 1
const mongoose = require ("mongoose");

//2
const { Schema, model} = mongoose;

//3
const AdminSchema = new Schema ({
    name: { type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: Number,
});

//4 
module.exports = Admin = model('admin', AdminSchema);