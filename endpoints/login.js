import { Router } from "express";
import pool from "../bdConnection.js";
import bcrypt from "bcrypt"; //libreria para poder comparar la clave hasehada

const login = async (req, res) => {
  try {
    const { usuario, clave } = req.body;

    // 1. Verificar en la tabla datos si la CEDULA y CLAVE son correctos
    const sqlDatos = `SELECT id, clave FROM datos WHERE cedula = $1`;
     const datos_result = await pool.query(sqlDatos, [usuario]);

        if (datos_result.rowCount === 0) {
        return res.status(404).json({
            error: "Credenciales incorrectas"
        });
        }
        //guardo en la variable lo que me traje de la consulta sql
          const userData = datos_result.rows[0]; 
          const isPasswordValid = await bcrypt.compare(clave, userData.clave);  //comparacion de la libreria para la clave

          if (!isPasswordValid) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
          }

         const id = datos_result.rows[0].id; //Para almacenar el id en caso tal que el usuario y contraseña sea correctas

    // 2. Verificar si pertenece a personal
    const sql_personal = `SELECT datos.nombre, datos.apellido, datos.cedula, personal.rol, personal.foto
      FROM personal
      JOIN datos ON personal.datos_personal = datos.id
      WHERE personal.datos_personal = $1`;
    const personalResult = await pool.query(sql_personal, [id]);

    if (personalResult.rowCount > 0) {
      return res.json({
        ...personalResult.rows[0], // "spread syntax". Sirve para copiar todas las propiedades del objeto rows[0] dentro del return
        tipo: "personal"
      });
    }

    // 3. Verificar si pertenece a cliente
    const sqlCliente = `
      SELECT datos.nombre, datos.apellido, datos.cedula, clientes.plan
      FROM clientes
      JOIN datos ON clientes.datos_cliente = datos.id
      WHERE clientes.datos_cliente = $1
    `;
    const clienteResult = await pool.query(sqlCliente, [id]);

    if (clienteResult.rowCount > 0) {
      return res.json({
        ...clienteResult.rows[0],
        tipo: "cliente"
      });
    }

    // 4. Si no pertenece a ninguna de las dos tablas
    return res.status(403).json({
      error: "Usuario no registrado como cliente ni como personal"
    });

  } catch (err) {
    console.log("Ha sucedido un error:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export default login;
