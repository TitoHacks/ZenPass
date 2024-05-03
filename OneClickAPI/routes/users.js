const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");
const Utils = require("../utils/utils");

router.post("/newUser",async(request,response)=>{
    try{
        console.log(request.body);
        if(await User.exists({username:request.body["username"]}) == null && await User.exists({email:request.body["email"]}) == null){
            const newUser = await User.create(request.body);
            response.status(200).send("User registered successfully");
        }else{
            response.status(401).send("Mail or usename already in use");

        }
       
    }catch(error){
        console.log(error);
        response.status(500).send(error);
    }
    
})

router.post("/login",async(request,response)=>{
    try{
        let existsUser = await User.exists({email:request.body["email"]});
        if(existsUser){
            let userObj = await User.find({email:request.body["email"]});
            console.log(userObj[0])
            let matched = await Utils.matchesPassword(request.body["password"],userObj[0]["password"]);
            console.log("Match: " +  matched);
            if(matched){
                response.status(200).send(JSON.stringify(userObj[0]));
            }else{
                response.status(401).send("Incorrect username / password combination");
            }
        }else{
            response.status(401).send("User not found");
        }
    }catch(error){
        console.log(error);
        response.status(500).send(error);
    }
})


module.exports = router;