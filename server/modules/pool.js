const pg = require('pg');
const { Router } = require('express');

const Pool = pg.Pool;

// DB CONNECTION
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000, 
});

pool.on('connect', ()=> {
    console.log('postgres is connected');
});

pool.on('error', (error)=> {
    console.log('error connecting to the database: ', error);
});

module.exports = pool;