// db.js
import postgres from 'postgres'
import dotenv from 'dotenv'

dotenv.config();

const username = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PW);
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;

const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`
console.log(connectionString)

const sql = postgres(connectionString)

export default sql
