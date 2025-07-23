import {Pool} from 'pg';

const pool= new Pool({
    user: "postgres",
    password: "admin",
    host: "localhost",
    database:"gimnasioVac25",
    port: 5432,
})
export default pool;