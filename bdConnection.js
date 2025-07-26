import { Pool } from 'pg';

const pool = new Pool({
  user: "postgres",
  password: "admin",
  host: "localhost",
  database: "gimnasioVac25",
  port: 5432
});

export default pool;


/*
credenciales de la base de datos en railway
const pool = new Pool({
  user: "postgres",
  password: "xuBJKbJUZHGGfFZHkGLcmvolwWKbCEeY",
  host: "gondola.proxy.rlwy.net",
  database: "railway",
  port: 36019,
  ssl: { rejectUnauthorized: false }
});
*/ 