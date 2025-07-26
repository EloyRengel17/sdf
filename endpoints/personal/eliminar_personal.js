import { Router } from "express";
import pool from "../../bdConnection.js";

const delete_eliminar_personal =async(req, res)=>{
    try{
            const {id}= req.params
            const {estado}= req.body;
          const  sql= `UPDATE public.datos
                SET  estado=$2
                WHERE id=$1;
            `  
            const result= await pool.query(sql,[id,estado])

            if(result.rowCount===0){
                return res.status(404).json({
                    error:"no se ha podido cambiar el estado"
                });
            }
            res.json({
                 message: "Estado cambiado con exito",
            });
    }catch(err){
        console.log("ha sucedido un error", err)
        res.status(500).json({
             success: false,
        error: "Error interno del servidor",
        })
    }
}
export default delete_eliminar_personal;