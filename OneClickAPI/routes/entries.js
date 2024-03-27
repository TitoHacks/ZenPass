const express = require("express");
const router = express.Router();
const Entry = require("../models/entryModel");
const Utils = require("../utils/utils");
const hibp = require("hibp");
const dotenv = require("dotenv");
const domainUtils = require("get-root-domain");

dotenv.config();  // Load environment variables from .env file 
const apiKey = process.env.REACT_APP_HAVE_I_BEEN_PWNED_API_KEY;
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

router.get("/checkLeak",async(request,response)=>{
    try{
        let breaches = await hibp.breachedAccount(request.query.email, {apiKey:apiKey,domain:request.query.domain});
        console.log(breaches);
        console.log("Domain filter: " + request.query.domain);
        if(breaches != null){
            response.status(200).send(breaches);
        }else{
            response.status(300).send("No data leaks found for this account");
        }
    }
    catch(error){
        console.log(error);
        if(error instanceof hibp.RateLimitError){
            console.log(error.retryAfterSeconds);
            let errorMsg = {
                retry: error.retryAfterSeconds,
            }
            console.log(errorMsg);
            response.status(301).send(errorMsg);
        }else{
            response.status(500).send("No se ha proporcionado un email!");
        }

        
    }

        
    
    
})

router.get("/leakDetails",async(request,response)=>{
    try{
        let breachInfo = await hibp.breach(request.query.name,{apiKey:apiKey});
        if(breachInfo != null){
            response.status(200).send(breachInfo);
        }else{
            response.status(300).send("No breach info found!");
        }
    }catch(error){
        console.log(error);
        response.status(500).send("No breach name specified");
    }
})

router.post("/updateEntry",async(request,response)=>{
    try{
        console.log(request.body);
        const updatedEntry = await Entry.findByIdAndUpdate(request.body._id,request.body);
        response.status(200).send("Entry updated successfully!");
    }catch(error){
        console.log(error);
        response.status(500).send("Error updating entry");
    }
    
})

router.post("/deleteAllData",async(request,response)=>{

    try{
        await Entry.deleteMany({ownerId:request.body._id});
        response.status(200).send("Datos eliminados correctamente!");
    }catch(error){
        console.log(error);
        response.status(500).send("Error eliminando datos");
    }

})



module.exports = router;