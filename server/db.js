import 'dotenv/config';
import mysql from 'mysql2/promise';
if (process.env.NODE_ENV === 'production' && (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME)) throw new Error('Configure credenciais de banco em produção');
export const db = mysql.createPool({host:process.env.DB_HOST || '127.0.0.1', port:Number(process.env.DB_PORT || 3306), user:process.env.DB_USER || 'root', password:process.env.DB_PASSWORD ?? 'example', database:process.env.DB_NAME || 'compras', connectionLimit:10, dateStrings:true});
