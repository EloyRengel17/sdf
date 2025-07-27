import { Router } from "express";
import pool from "../../bdConnection.js";

const put_pago_cliente = async (req, res) => {
  try {
    const { cedula } = req.body;
    // Iniciar transacción (en caso de error revierte las sentencias y proteje la intrigrad de la base de datos)
    await pool.query("BEGIN");

    //sql para buscar al cliente por la cedula y en caso de encontrarlo ponerle la proxima fecha de pago un mes
    // despues y poner el estado de pago como'como pago realizado'
    const sql = `
            UPDATE cliente c
            SET 
            fecha_de_pago = fecha_de_pago + INTERVAL '1 month',
            estado_pago_mes = 'pago realizado'
            FROM datos d
            WHERE c.datos_cliente = d.id
            AND d.cedula = $1;`;
    const result = await pool.query(sql, [cedula]);

    const sql_cambio_estado = `
            UPDATE datos
            set estado=true
            WHERE cedula= $1;
       `;
    const result_estado = await pool.query(sql_cambio_estado, [cedula]);
    if (result.rowCount === 0 || result_estado.rowCount === 0) {
      // si entra aqui mediante el roallback revierte todas las sentencias sql
      await pool.query("ROLLBACK");
      return res.status(404).json({
        success: false,
        message: "Cliente no encontrado",
      });
    }
    // Confirmar transacción
    await pool.query("COMMIT");
    res.status(200).json({
      success: true,
      message: "Pago actualizado correctamente",
      // nueva_fecha_pago: nuevaFecha,
    });
  } catch (err) {
     await pool.query("ROLLBACK");
    console.log("ha sucedido un error", err);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
};
export default put_pago_cliente;
/*
 RETURNING c.fecha_de_pago AS nueva_fecha_pago;
 
    const nuevaFecha = resultPago.rows[0].nueva_fecha_pago;
*/
