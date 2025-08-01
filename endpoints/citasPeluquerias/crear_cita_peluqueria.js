import { Router } from "express";
import pool from "../../bdConnection.js";

const post_cita_peluqueria =async(req, res)=>{
    try{
        //OOJoo, LUEGO REVISAR SI DE VERDAD ESTOY RECIBIENDO LAS VARIABLES DE ESTA FORMA
            const {id_horario}= req.body;
            const {id_cliente, id_peluquero}= req.params;
            if(!id_cliente || !id_horario || !id_peluquero){
                return res.status(409).json({
                    success:false,
                    message:"no se ha podido hacer la reserva, porfavor verifique los campos"
                });
            }
            //sql para crear la cita (reserva) de la peluqueria
            const sql_crear_cita=`
            INSERT INTO public.citas(
            id_cliente, id_peluquero, id_horario, estado)
            VALUES ($1, $2, $3, 'Reservado');
            `
            const result_crear_cita= await pool.query(sql_crear_cita, [id_cliente,id_peluquero,id_horario]);

            res.json({mensaje:`Se ha hecho la reserva de manera exitosa`,
            success: true });
    }catch(err){
        console.log("ha sucedido un error", err);
        res.status(500).json({
            success:false,
            message:"Ha sucedido un error interno en el servidor"
        });
    }
}
export default post_cita_peluqueria;
//recordar que desde el frontend se debe agarrar el id del cliente( en la tabala cliente) el id del peluquero (en la tabla de personal) y el id del horario a seleccionar 