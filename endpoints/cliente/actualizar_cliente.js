import { Router } from "express";
import pool from "../../bdConnection.js";

//siempre llegaran a actulizarse todos los campos debido a que desde el frontend siempre llegaran todos los campos, sobreescritos o no
const put_actualizar_cliente= async(req, res)=>{
    try{
        const{id}= req.params;
        //debo verificar al momento de hacer le fronted si estos datos de verdad los puedos recibir mediante el body o por params
        const {nombre, apellido, cedula, fecha_nacimiento, clave, horario_actividades}= req.body; //datos para la tabla datos
        const {plan, fecha_de_pago}= req.body; //datos para la tabla cliente
        if(!nombre || !apellido || !cedula || !fecha_nacimiento || !clave ||  !horario_actividades || !plan || !fecha_de_pago ){
            return res.status(409).json({
                success: false,
                message:"No se ha podido hacer la edicion"
            })
        }
         // Iniciar transacción (en caso de error revierte las sentencias y proteje la intrigrad de la base de datos)
        await pool.query("BEGIN");

        //sql para actulizar datos de la tabal datos 
        const sql_datos= `
        UPDATE public.datos
        SET nombre=$1, apellido=$2, cedula=$3, fecha_nacimiento=$4, clave=$5, horario_actividades=$6
        WHERE id=$7;
        `
        const result_tabla_datos= await pool.query(sql,[nombre, apellido, cedula, fecha_nacimiento, clave, horario_actividades, id])

        //sql para actulizar datos de la tabla clente 
        const sql_cliente=`
        UPDATE public.cliente
        set plan=$1, fecha_de_pago=$2
        WHERE  id=$3
        `
        const result_cliente= await pool.query(sql_cliente, [plan, fecha_de_pago, id]);

        await pool.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: "Cliente actualizado correctamente",
    });

    }catch(err){
        console.log("ha sucedido un error", err);
            // si entra aqui mediante el roallback revierte todas las sentencias sql
      await pool.query("ROLLBACK");
        res.status(500).json({
            success: false,
        error: "Error interno del servidor",
        })
    }
}

export default put_actualizar_cliente;