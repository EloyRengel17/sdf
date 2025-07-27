import express from "express";
import cors from "cors";
import router  from "./rutas/rutas.js";
import "./cron_desactivar_Usuarios.js"//funcion que sirver para cambiar el estado de un cliente el cual tenga mas de un mes sin cancelar(se activa de manera automatica)
import "./cron_hora_salida_cliente.js"// funcion que se encarga de agregar la hora de salida AUTOMATICAMENTE en caso tal que la persona no la haya hecho

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