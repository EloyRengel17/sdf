import { Router } from "express";
import pool from "../../bdConnection.js";

const get_cliente= async (req, res) => {
    try{
        const {id}= req.params  // constaente que se recibe por el link
        if(id){
            const sql=` SELECT cliente.id, datos.nombre, datos.apellido, datos.cedula, datos.fecha_nacimiento, datos.horario_actividades, cliente.plan, cliente.fecha_de_pago, datos.estado
            FROM cliente
            JOIN datos on cliente.datos_cliente= datos.id
            WHERE cliente.id= $1; 
            `
            const result= await pool.query(sql, [id]);
            if(result.rowCount === 0){
                return res.status(404).json({
                    error:"no se ha encontrado nada",
                    details:`no existe cliente con id: ${id}`
                });
            }
            return res.json(result.rows[0]);
        }
        else{
            const sql=` SELECT cliente.id, datos.nombre, datos.apellido, datos.cedula, datos.fecha_nacimiento, datos.horario_actividades, cliente.plan, cliente.fecha_de_pago, datos.estado
            FROM cliente
            JOIN datos on cliente.datos_cliente= datos.id`
            const result= await pool.query(sql);
            res.json(result.rows);
        }
    }
    catch(err){
        console.log("ha sucedido un error". err);
    }
}
export default get_cliente;