import {Router} from "express";
import pool from "../bdConnection.js";

const get_personal= async (req , res)=>{
    try{
        const {id}= req.params;
        if(id){
            //buscar datos por id especifico
            const sql=`SELECT personal.id, datos.nombre, datos.apellido, datos.cedula, datos.fecha_nacimiento, datos.horario_actividades, personal.rol, personal.foto
            FROM personal
            JOIN datos ON personal.datos_personal= datos.id
            WHERE personal.id=$1`;
            const result= await pool.query(sql, [id]);
            
             if (result.rowCount === 0) {
                return res.status(404).json({ 
                    error: "Producto no encontrado",
                    details: `No existe producto con ID: ${id}`
                });
            }
             return res.json(result.rows[0]);
        }else{
            //mostrar todo el personal
            const sql=`SELECT personal.id, datos.nombre, datos.cedula, personal.rol
             FROM personal
             JOIN datos ON personal.datos_personal= datos.id
             `;
            const result= await pool.query(sql)
           console.log(result.rows);
            return res.json(result.rows);

        }

    }catch(err){
        console.log("error", err);
    }
}
export default get_personal;