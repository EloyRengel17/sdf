import { Router } from "express";
import pool from "../../bdConnection.js";

const get_citas_peluquerias= async (req, res) =>{
    try{
        const {id_cliente}= req.params;
        //si entra en el condicional solo se mostraran las citas que tenga ese cliente
        if(id_cliente){
            const sql_cita_del_cliente= `
           SELECT 
                c.id,
                dc.nombre AS nombre_cliente,
                dp.nombre AS nombre_peluquero,
                hd.hora_inicio AS horario_cita,
                c.estado
            FROM citas c
            JOIN cliente cl ON c.id_cliente = cl.id
            JOIN datos dc ON cl.datos_cliente = dc.id
            JOIN personal pe ON c.id_peluquero = pe.id
            JOIN datos dp ON pe.datos_personal = dp.id
            JOIN horarios_disponibles hd ON c.id_horario=hd.id
            WHERE dc.id=$1
            `
            const result_cita_del_cliente= await pool.query(sql_cita_del_cliente,[id_cliente]);
            if(result_cita_del_cliente.rowCount===0){
                return res.status(409).json({
                    success: false,
                    message:"No cuenta con reservaciones"
                });
            }
           return res.json(result_cita_del_cliente.rows);

        }else{
             const sql_citas_peluqueria= `
          SELECT 
            c.id,
            dc.nombre AS nombre_cliente,
            dp.nombre AS nombre_peluquero,
            hd.hora_inicio AS horario_cita,
            c.estado
        FROM citas c
        JOIN cliente cl ON c.id_cliente = cl.id
        JOIN datos dc ON cl.datos_cliente = dc.id
        JOIN personal pe ON c.id_peluquero = pe.id
        JOIN datos dp ON pe.datos_personal = dp.id
        JOIN horarios_disponibles hd ON c.id_horario=hd.id;
            `
            const result_citas_peluquerias= await pool.query(sql_citas_peluqueria);
            if(result_citas_peluquerias.rowCount===0){
                  return res.status(409).json({
                    success: false,
                    message:"No hay reservaciones para mostrar"
                });
            } 
            return res.json(result_citas_peluquerias.rows);
        }

    }catch(err){
        console.log("ha sucedido un error", err);
        res.status(500).json({
            success: false,
            message: "ha sucedido un error interno en el servidor"
        });
    }
}
export default get_citas_peluquerias;