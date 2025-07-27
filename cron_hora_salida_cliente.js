import cron from "node-cron";
import pool from "./bdConnection.js";

//esta funcion se activa automaticamente cada 5 minutos y tiene la funcion de agregar la hora de salida del cliente en caso tal de que no se halla ingresado 
cron.schedule("*/5 * * * *", async ()=>{
    try{
        const sql_salida=`
       UPDATE clientes_activos
      SET hora_salida = hora_entrada + INTERVAL '2 hours 30 minutes'
      WHERE hora_salida IS NULL
        AND NOW() >= hora_entrada + INTERVAL '2 hours 30 minutes';
        `;
        const result= await pool.query(sql_salida);
          console.log("Se cerraron sesiones vencidas automáticamente.");
    }catch(err){
        console.log("ha sucedido un error", err);

    }
} )