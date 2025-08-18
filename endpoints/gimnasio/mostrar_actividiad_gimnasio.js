import { Router } from "express";
import pool from "../../bdConnection.js";

const get_cantidad_clientes_activos = async (req, res) => {
  try {
    //sql valido para mostrar la cantidad de rows que hay cumpliendo la sentencia 
    const sql = `
      SELECT COUNT(*) AS cantidad
      FROM public.cliente c
      JOIN public.clientes_activos ca 
        ON ca.id_cliente = c.id
      WHERE ca.hora_salida IS NULL
        AND c.datos_cliente NOT IN (
          SELECT datos_personal FROM personal
  );

    `;

    const result = await pool.query(sql);
    const cantidad = result.rows[0].cantidad;

    //mostramos la "casilla cantidad" debido a que estamos utilizando un AS  en la sentencia sql anterior
    return res.json({ cantidad: cantidad });

  } catch (err) {
    console.error("Ha sucedido un error:", err);
    res.status(500).json({
      success: false,
      message: "Ha sucedido un error interno en el servidor",
    });
  }
};

export default get_cantidad_clientes_activos;
