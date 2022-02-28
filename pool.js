const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'alwaysmusic',
    max: 20,
    min: 2,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

async function agregar() {
    const client = await pool.connect();
    const res = await client.query("insert into alumnos (nombre, rut, curso, nivel) values ('Perro Perrez', '18.123.456-3', 'lira', 3) returning *");
    console.log(res.rows);
    pool.end()
    return;
};

agregar();
