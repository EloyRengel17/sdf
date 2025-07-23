import express from "express";
import cors from "cors";
import router  from "./rutas/rutas.js";

const app= express();
app.use(cors());
app.use(express.json());
app.use("/api/",router );

app.listen(3000,()=>{
    console.log("escuchando en el puerto 3000");
})