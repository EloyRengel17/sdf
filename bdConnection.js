import {Pool} from 'pg';

const pool= new Pool({
    user: postgres,
    password: acwksOsQZStBkjmENXkEXsXJKNycHeyy,
    host: maglev.proxy.rlwy.net,
    database: railway,
    port: 23575,
    ssl: { rejectUnauthorized: false }
})
export default pool;