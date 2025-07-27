import { Router } from "express";
import pool from "../../bdConnection.js";

const post_actividad_gimnasio = async (req, res) => {
  try {
    const { cedula_cliente } = req.params;
    //comprobar que la cedula no venga en blanco o mal formada
    if(!cedula_cliente){
        return res.status(409).json({
            success: false,
            error:"La cedula del cliente es requerida."
        });
    }
   // Iniciar transacción (en caso de error revierte las sentencias y proteje la intrigrad de la base de datos)
    await pool.query("BEGIN");
    //sql para comprobar que la cedula este en la base de datos y cumpla con todos los requisitos
    const sql_comprobacion = `
                    SELECT id
                    FROM datos
                    Where  cedula=$1 and
                    estado = true;
            `;
            const result_comprobacion= await pool.query(sql_comprobacion,[cedula_cliente]);

                if(result_comprobacion.rowCount===0){
                   // si entra aqui mediante el roallback revierte todas las sentencias sql
                    await pool.query("ROLLBACK");
                    return res.status(409).json({
                        success: false,
                        error: "El usuario no está registrado en el sistema o tiene pagos pendientes."
                    })
                }
                //almaceno el id del cliente para luego insertarlo en la tabla de la actividad del gimnasio
                const id_cliente= result_comprobacion.rows[0].id;
                //sql para la insercion de los clientes den la tabal de actividad del gimnasio
                const  sql_ingresar= `
                    INSERT INTO public.clientes_activos(
                    hora_entrada, id_cliente, hora_salida)
                    VALUES ( NOW(), $2, NULL);
                `
                const result_ingresar= await pool.query(sql_ingresar,[id_cliente]);
                // Confirmar transacción
                await pool.query("COMMIT");
                res.json({mensaje:"cliente creado con exito"});
  } catch (err) {
     await pool.query("ROLLBACK");
    console.log("Ha sucedido un error", err);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
};

export default post_actividad_gimnasio;
