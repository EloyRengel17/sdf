import { Router } from "express";
import pool from "../../bdConnection.js";
import bcrypt from "bcrypt";//libreria para hashear la clave "npm install bcrypt"

const post_crear_personal= async (req,res )=>{
    try{
         const {nombre, apellido, cedula, fecha_nacimiento, clave, horario_actividades, rol, foto, altura, peso, skills, informacion}= req.body;
          //validacion para verificar que no hayan campos vacios
         if(!nombre || !apellido || !cedula || !fecha_nacimiento || !clave || !horario_actividades || !rol || !foto || !altura || !peso || !skills || !informacion){
         return  res.status(404).json({
                success:false,
                error:"todos los campos son obligatorios"
            });
                
         }
          //sql para buscar si la cedula se encuentra registrada en el sistema antes del registro
           const sql_cedula_duplicada= ` SELECT * FROM datos WHERE cedula=$1`
            const result_duplicado= await pool.query(sql_cedula_duplicada, [cedula]);

            // comprobacion, si hay un resultado mayor a 0 
            if(result_duplicado.rowCount>0){
                 return res.status(409).json({
                    success:false,
                    error:"Numero de cedula registrado den el sistema"
                });
            }else{
                    //lineas de la libreria para hasehar la clave
                    const saltRounds = 10;
                    const hashedPassword = await bcrypt.hash(clave, saltRounds);
                       
                    const sql=`
                    INSERT INTO public.datos(
                    nombre, apellido, cedula, fecha_nacimiento, clave, horario_actividades)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING id;
                    `
                    const result= await pool.query(sql,[nombre, apellido, cedula, fecha_nacimiento, hashedPassword, horario_actividades]);

                    //agarraro el id de la insercion de los datos en la tabla datos para usarlo en la insercion en la tabla clientes;
                     const datos_id= result.rows[0].id;

                    const sql_cliente= `
                    INSERT INTO public.personal(
                    datos_personal, rol, foto, altura, peso, skills, informacion)
                    VALUES ($1, $2, $3, $4, 5$, 6$, 7$);`
                    const ingresar_cliente= await pool.query(sql_cliente, [datos_id,rol, foto,altura, peso, skills, informacion]);

                    res.json({mensaje:"Personal creado con exito", id: datos_id});
            }
    }catch(err){
        console.log("ha sucedido un error", err)
         res.status(500).json({
        success: false,
        error: "Error interno del servidor",
    });
    }
}
export default post_crear_personal;