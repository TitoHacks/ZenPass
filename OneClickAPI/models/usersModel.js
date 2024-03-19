const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Por favor, inserta un usuario"]
    },
    password:{
        type:String,
        required: [true, "Por favor, inserta una contraseña"]
    },
    email:{
        type:String,
        required: [true, "Por favor, inserta un email"]
    }
})


module.exports = mongoose.model("User",usersSchema);