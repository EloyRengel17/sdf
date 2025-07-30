import cron from "node-cron";
import pool from "./bdConnection.js";

cron.schedule("06 13 * * *", async () => {
  try {
    //la variable sql_corte1 es para comprobar si tu estado de mes esta en "por pagar" y comprobar si ya hay mas de 30 dias y cortar el acceso al gimnasio
    const sql_corte1 = `
    UPDATE datos d
        SET estado = false
        FROM cliente c
        WHERE c.datos_cliente = d.id
        AND c.fecha_de_pago IS NOT NULL
        AND NOW() >= c.fecha_de_pago + INTERVAL '1 day'
        AND d.estado = true
		AND c.estado_pago_mes='por pagar';
    `;
    await pool.query(sql_corte1);
    

    //la variable sql_corte2 es para verificar que el el acceso al gimnasio(estado) ya es denagado y asi poder cambiar el estado del pago del mes
    const sql_corte2=`
    UPDATE cliente c
        SET estado_pago_mes = 'pago no procesado'
        FROM datos d
        WHERE c.datos_cliente = d.id
        AND c.fecha_de_pago IS NOT NULL
        AND NOW() >= c.fecha_de_pago + INTERVAL '1 day'
        AND d.estado = false
		AND c.estado_pago_mes='por pagar';
    `
    await pool.query(sql_corte2);

    //la variable sql_aviso es para cambiar el estado de 'pago realizado' a 'por pagar' pero sigue estando acitvo debido a que no se le ha vencido los 30 dias de la mensualidad
    const sql_aviso=`UPDATE cliente c
        SET estado_pago_mes = 'por pagar'
        FROM datos d
        WHERE c.datos_cliente = d.id
        AND c.fecha_de_pago IS NOT NULL
        AND NOW() >= c.fecha_de_pago - INTERVAL '3 days'
        AND d.estado = true
		AND c.estado_pago_mes='pago realizado';
    `

    await pool.query(sql_aviso);
    console.log("Estado de usuarios actualizados automáticamente");

  } catch (err) {
    console.error("Error al ejecutar el cron de suspensión automática:", err);
  }
});


/*
SELECT d.id AS id_datos, c.id AS id_cliente, c.fecha_ultimo_pago
FROM datos d
JOIN cliente c ON c.datos_cliente = d.id
WHERE c.fecha_ultimo_pago IS NOT NULL
  AND NOW() >= c.fecha_ultimo_pago + INTERVAL '1 month'
  AND d.estado = true;
*/ 

/*pago no procesado*/ 
//AND NOW() >= c.fecha_de_pago + INTERVAL '27 days'