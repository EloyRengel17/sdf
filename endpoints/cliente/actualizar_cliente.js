import { Router } from "express";
import pool from "../../bdConnection.js";

const put_actualizar_cliente= async(req, res)=>{
    try{
        const{id}= req.params;
        const {nombre, apellido, cedula, fecha_nacimiento, clave, horario_actividades}= req.body; //datos para la tabla datos
        const {plan, estado_pago_mes}= req.body;
        
        if(estado_pago_mes){
           const sql=`
           UPDATE public.cliente
            SET estado= true
            WHERE id=4;
           `
        }

        const sql=`

        `

    }catch(err){
        console.log("ha sucedido un error", err);
        res.status(500).json({
            success: false,
        error: "Error interno del servidor",
        })
    }
}

export default put_actualizar_cliente;