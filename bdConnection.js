import { Pool } from 'pg';

const pool = new Pool({
  user: "postgres",
  password: "xuBJKbJUZHGGfFZHkGLcmvolwWKbCEeY",
  host: "gondola.proxy.rlwy.net",
  database: "railway",
  port: 36019,
  ssl: { rejectUnauthorized: false }
});

export default pool;
