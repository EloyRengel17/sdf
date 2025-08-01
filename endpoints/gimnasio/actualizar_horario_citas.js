import { Router } from "express";
import pool from "../../bdConnection.js";
//siempre llegaran a actulizarse todos los campos debido a que desde el frontend siempre llegaran todos los campos, sobreescritos o no
const put_horario_cita= async( req , res)=>{
    try{
        const {id_peluquero, fecha, hora_inicio, hora_fin, disponible}= req.body;
        const {id_horario}= req.params;
        if(!id_peluquero || !fecha || !hora_inicio || !hora_fin || !disponible){
             return res.status(404).json({
                success: false,
                message:"No se ha podido hacer la edicion"
            })
        }
        const sql_actulalizar_horario=`
        UPDATE public.horarios_disponibles
        SET id_peluquero=$1, fecha=$2, hora_inicio=$3, hora_fin=$4, disponible=$5
        WHERE id=$6;
        `
        const result_actualizar_horario= await pool.query(sql_actulalizar_horario,[id_peluquero, fecha, hora_inicio, hora_fin, disponible, id_horario]);

        return res.status(200).json({
        success: true,
        message: "Cliente actualizado correctamente",
    });
    }catch(err){
        console.log("ha sucedido un error", err);
        res.status(500).json({
            success:false,
            message: "ha sucedido un error interno en el servidor"
        });
    }
}

export default put_horario_cita;