import { json, Router } from "express";
import pool from "../../bdConnection.js";

const put_citas_peluquerias= async (req, res)=>{
    try{
            const {id_cita}= req.params;
            const sql_eliminar_cita=`
                DELETE FROM public.citas
	            WHERE id=$1 ;
            `
            const result_eliminar_cita= await pool.query(sql_eliminar_cita,[id_cita]);
            if(result_eliminar_cita.rowCount===0){
                return res.status(404).json({
                    success:false,
                    message:"NO se ha podido borrar la cita"
                });
            }
            return res.status(200).json({
            success: true,
            message: "Cita eliminada exitosamente.",
    });
    }catch(err){
        console.log("Ha sucedido un error", err);
        res.status(500).json({
            success:false,
            message:"Error interno del servidor"
        })
    }
}
export default put_citas_peluquerias;