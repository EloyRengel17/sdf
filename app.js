import express from "express";
import cors from "cors";
import router  from "./rutas/rutas.js";

const app= express();
app.use(cors());
app.use(express.json());
app.use("/api/",router );

const PORT = process.env.PORT || 3000;  // Usamos el puerto que da Render o 3000 si corres localmente
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
/*
app.listen(3000,()=>{
    console.log("escuchando en el puerto 3000");
})*/