import { z } from 'zod';
const text = max => z.string().trim().min(1).max(max);
const date = z.iso.date().refine(v => { const d=new Date(v+'T00:00:00Z'); return !Number.isNaN(d.valueOf()) && d.toISOString().slice(0,10)===v; });
const positiveId=z.number().int().positive().max(2147483647);
export const idSchema=z.string().regex(/^[1-9]\d*$/).refine(v=>Number.isSafeInteger(Number(v))&&Number(v)<=2147483647);
export const loginSchema=z.object({email:z.email().max(190).transform(v=>v.toLowerCase()),password:z.string().min(1).max(72)}).strict();
export const supplierSchema=z.object({name:text(150),document:text(30),email:z.email().max(190),phone:text(40)}).strict();
export const requestSchema=z.object({title:text(150),description:text(5000),deadline:date}).strict();
export const quoteSchema=z.object({supplierId:positiveId,amountCents:z.number().int().positive().max(4294967295),notes:z.string().trim().max(500).default('')}).strict();
export const transitionSchema=z.object({status:z.enum(['em_aprovacao','aprovada','rejeitada']),quoteId:positiveId.optional(),reason:z.string().trim().max(400).default('')}).strict();
export function validate(schema, source='body'){return (req,res,next)=>{const result=schema.safeParse(req[source]);if(!result.success)return res.status(400).json({error:'Dados inválidos. Verifique os campos enviados.'});req[source]=result.data;next()}}
export function validateId(req,res,next){if(!idSchema.safeParse(req.params.id).success)return res.status(400).json({error:'Identificador inválido.'});next()}
