const mongoose = require("mongoose")

const entrySchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Por favor, inserta un titulo"]
    },
    username:{
        type:String,
        required: [true, "Por favor, inserta un nombre de usuario / email"]
    },
    password:{
        type:String,
        required: [true, "Por favor, inserta una contraseña"]
    },
    url:{
        type:String,
        required: [true, "Por favor, inserta una url"]
    },
    score:{
        type:String,
        required: [true,"Por favor, inserta un score"]
    },
    status:{
        type:Array,
        required: [true,"Por favor, inserta un array de estados"]
    },
    isWeb:{
        type:String,
        required:[false]
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Por favor, inserta el userId del propietario"]
    },
    iv:{
        type:String,
        required:[true,"Por favor, inserta el IV de la entrada"]
    }
})


module.exports = mongoose.model("Entry",entrySchema);