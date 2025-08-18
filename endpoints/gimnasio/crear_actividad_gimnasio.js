import pool from "../../bdConnection.js";

const post_actividad_gimnasio = async (req, res) => {
  try {
    const { cedula_cliente } = req.body;
    //comprobamos qe la cedula no venga en blanco
    if (!cedula_cliente) {
      return res.status(409).json({
        success: false,
        error: "La cédula del cliente es requerida."
      });
    }

    await pool.query("BEGIN");

    // Verificar si el cliente está registrado y activo
    const sql_comprobacion = `
      SELECT c.id
      FROM cliente c
      JOIN datos d ON d.id = c.datos_cliente
      WHERE d.cedula = $1 AND d.estado = true;
    `;
    const result_comprobacion = await pool.query(sql_comprobacion, [cedula_cliente]);

    if (result_comprobacion.rowCount === 0) {
      await pool.query("ROLLBACK");
      return res.status(409).json({
        success: false,
        error: "El usuario no está registrado o tiene pagos pendientes."
      });
    }

    const id_cliente = result_comprobacion.rows[0].id;

    // Verificar si el cliente tiene una sesión abierta
    const sql_comprobacion_salida = `
      SELECT id_clientes_activos 
      FROM public.clientes_activos 
      WHERE id_cliente = $1 AND hora_salida IS NULL
      ORDER BY hora_entrada DESC
      LIMIT 1;
    `;
    const result_comprobacion_salida = await pool.query(sql_comprobacion_salida, [id_cliente]);

    if (result_comprobacion_salida.rowCount === 0) {
      // No hay sesión abierta hay que iniciar una nueva
      const sql_ingresar = `
        INSERT INTO public.clientes_activos(hora_entrada, id_cliente, hora_salida)
        VALUES (NOW(), $1, NULL);
      `;
      await pool.query(sql_ingresar, [id_cliente]);
      await pool.query("COMMIT");
      return res.json({
      success: true,
      message: "Sesión iniciada con éxito"
    });

    } else {
      // Hay sesión abierta hay que cerrarla
      const sesion_id = result_comprobacion_salida.rows[0].id_clientes_activos;
      const sql_salida = `
        UPDATE public.clientes_activos
        SET hora_salida = NOW()
        WHERE id_clientes_activos = $1;
      `;
      await pool.query(sql_salida, [sesion_id]);
      await pool.query("COMMIT");
     return res.json({
      success: true,
      message: "Sesión cerrada con éxito"
    });
    }

  } catch (err) {
    try { await pool.query("ROLLBACK"); } catch(e) { console.log("Error rollback", e); }
    console.log("Ha sucedido un error", err);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
};

export default post_actividad_gimnasio;


