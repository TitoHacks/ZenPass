const express = require("express");
const router = express.Router();
const Entry = require("../models/entryModel");
const Utils = require("../utils/utils");

router.post("/newEntry",async(request,response)=>{
    try{
        console.log(request.body);
        const newEntry = await Entry.create(request.body);
        response.status(200).send("Contraseña añadida correctamente");
       
    }catch(error){
        console.log(error);
        response.status(500).send(error);
    }
    
})

router.get("/getEntries", async(request,response)=>{
        console.log(request.query);
        const entries = await Entry.find({ownerId:request.query.passnovaUID});
        response.status(200).send(entries);
})

router.get("/isReused", async(request,response)=>{
    const entries = await Entry.find({password:request.query.password});
    if(entries.length > 0 ){
        response.status(200).send("{reused:true}");
    }
    response.status(200).send("{reused:false}");
})


router.post("/deleteEntry",async(request,response)=>{
    try{
        let entryId = request.body.passwordId;
        await Entry.deleteOne({_id:entryId});
        response.status(200).send("Credencial eliminada correctamente");
    }catch(error){
        response.status(500).send("No se ha podido eliminar la credencial: " + error);
    }
    

})



module.exports = router;