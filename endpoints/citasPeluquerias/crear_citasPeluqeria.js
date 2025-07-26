import { Router } from "express";
import pool from "../../bdConnection.js";

const post_crear_cita_peluqueria=async (req,res)=>{
    try{
        const {nombre_peluquero, fecha, hora_inicio, hora_fin, disponible}= req.body;
        if(!nombre_peluquero || !fecha || !hora_inicio || !hora_fin || disponible===undefined){
                return res.status(404).json({
                    success:false,
                error:"todos los campos son obligatorios"
                });
        }
            const sql=`
                INSERT INTO public.horarios_disponibles(
                 id_peluquero, fecha, hora_inicio, hora_fin, disponible)
                VALUES ( $1, $2, $3, $4, $5);
            `
            const result= await pool.query(sql, [nombre_peluquero, fecha, hora_inicio, hora_fin, disponible]);
    
        res.json({mensaje:`horario del peluquero ${nombre_peluquero} creado con exito`,
        success: true });

    }catch(err){
        console.log("Ha sucedido un error", err)
        res.status(500).json({
            success: false,
            error: "Error interno del servidor",
        })
    }
}
export default post_crear_cita_peluqueria;

//NOTA IMPORTANTE 
// En la consulta sql dice d_peluqero, se guarda el id, pero la idea es que se muestre el nombre, por ende dede el frontend deberia traer el id, pero mostrabdo el nombre