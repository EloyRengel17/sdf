import { Router } from "express";
import pool from "../../bdConnection.js";

const delete_horario_citas= async (req , res)=>{
    try{
        const {id}= req.params;
        const sql_eliminar_horario_cita=`
        DELETE FROM public.horarios_disponibles
	    WHERE id=$1;
        `
        const result_eliminar_horario_cita= await pool.query(sql_eliminar_horario_cita, [id]);
        if(result_eliminar_horario_cita.rowCount===0){
            return res.status(404).json({
                success: false,
                message:"No se ha podido hacer la eliminacion"
            });
        }
        return res.json({
            success:true,
            message:"Eliminacion hecha correctamente"
        });
    }catch(err){
        console.log("ha sucedido un error", err);
        res.status(500).json({
            success:false,
            message:"ha sucedido un error interno con el servidor"
        });
    }
}
export default delete_horario_citas;