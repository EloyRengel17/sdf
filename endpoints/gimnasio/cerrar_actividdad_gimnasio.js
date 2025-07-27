import { Router } from "express";
import pool from "../../bdConnection.js";

const put_cerrar_actividad=async (req,res) => {
    try{
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
                sql_salir=`
                    UPDATE public.clientes_activos
                    SET  hora_salida=NOW()
                    WHERE id_clientes_activos=$1
                `
                const result_salir= await pool.query(sql_salir,[id_cliente]);
                 // Confirmar transacción
                await pool.query("COMMIT");
                res.json({mensaje:"El cliente ha salido del gimnasio exitosamente "});
    }catch(err){
        console.log("ha sucedido un error", err);
        await pool.query("ROLLBACK");
        res.status(500).json({
            success: false, 
            error: "Error interno del servidor",
    });
    }
}