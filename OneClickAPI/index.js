const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const PORT = 8083;
const userRoutes = require("./routes/users");
const entryRoutes = require("./routes/entries");
const cors = require("cors");
const corsOptions = {
    origin: "https://zenpassmanager.onrender.com",
}
dotenv.config();  // Load environment variables from .env file 
app.use(express.json());
app.use("/api",userRoutes)
app.use("/api/entry",entryRoutes)
app.use(cors(corsOptions));



//CONNECT TO MONGO DB
mongoose.set("strictQuery",false)

mongoose.connect(process.env.REACT_APP_DB_CONNECTION_STRING).then(()=>{
    console.log("Base de datos conectada!");
}).catch((error)=>{
    console.log("Error al conectar con la base de datos : " + error);
});
/////////////////////




app.get("/api/test",(request,response)=>{
    response.json({hola:"maquina"})
})





app.listen(PORT,()=> console.log(`Sirviendo en http://localhost:${PORT}`));

