import pkg from 'pg';   
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;  

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,    
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432 
});

pool.connect()
  .then(() => console.log('Connected to the PostgreSQL database'))
  .catch((err) => console.error('Database connection error:', err.stack));

export default pool;
