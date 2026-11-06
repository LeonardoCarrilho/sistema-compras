import { db } from './db.js';
import bcrypt from 'bcryptjs';
const hash = await bcrypt.hash('demo12345', 12);
for (const [name,email,role] of [['Ana Solicitante','solicitante@demo.local','solicitante'],['Bruno Comprador','comprador@demo.local','comprador'],['Carla Aprovadora','aprovador@demo.local','aprovador']]) await db.execute('INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE name=VALUES(name), password_hash=VALUES(password_hash), role=VALUES(role)',[name,email,hash,role]);
const [existing] = await db.query('SELECT COUNT(*) AS total FROM suppliers');
if (!existing[0].total) await db.query("INSERT INTO suppliers (name,document,email,phone) VALUES ('Papelaria Exemplo','00.000.000/0001-00','contato@exemplo.local','(11) 3000-0000'),('Suprimentos Modelo','11.111.111/0001-11','vendas@exemplo.local','(11) 3000-1111')");
console.log('Contas demonstrativas criadas. Senha: demo12345');
await db.end();
