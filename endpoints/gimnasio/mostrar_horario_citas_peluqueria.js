import { Router } from "express";
import pool from "../../bdConnection.js";

//en esa funcion se mostraran los horarios disponibles por cada peluqero, para las personas ES SOLO PARA LOS HORARIOS 
//OJO, hay otro archivo(POR AHOR ANO CREADO) el cual se encaragara de modificar y gestionar las citas de la peluqueria 
const get_horario_citas_peluqueria = async (req, res )=>{
    try{
            const {nombre}= req.params;
            if(nombre){
            const sql=`SELECT
                hd.id, 
                d.nombre AS nombre_peluqero,
                hd.fecha,
                hd.hora_inicio,
                hd.hora_fin,
                hd.disponible
                FROM horarios_disponibles hd
                JOIN personal p ON hd.id_peluquero= p.id
                JOIN datos d ON p.datos_personal= d.id
                WHERE p.rol= '4' AND d.nombre=$1;
            `
            const result= await pool.query(sql,[nombre]);
            if(result.rowCount===0){
                return res.status(404).json({ 
                    error: "cita no encontrado",
                    details: `No existe peluquero de nombre: ${nombre}`
                });
            }
            return res.json( result.rows[0]);
        }else{
            const sql_todo=`
            SELECT
                hd.id, 
                d.nombre AS nombre_peluqero,
                hd.fecha,
                hd.hora_inicio,
                hd.hora_fin,
                hd.disponible
                FROM horarios_disponibles hd
                JOIN personal p ON hd.id_peluquero= p.id
                JOIN datos d ON p.datos_personal= d.id
                WHERE p.rol= '4'
            ` 
            const result= await pool.query(sql_todo);
            return res.json(result.rows);
        }
    }catch(err){
        console.log("ha sucedido un error". err);
    }
}
export default get_horario_citas_peluqueria;