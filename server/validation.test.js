import {test} from 'node:test';
import assert from 'node:assert/strict';
import { requestSchema, quoteSchema, supplierSchema, loginSchema, idSchema } from './validation.js';
test('valida datas reais, campos obrigatórios e comprimentos',()=>{
 assert.equal(requestSchema.safeParse({title:'Material',description:'Reposição',deadline:'2027-02-30'}).success,false);
 assert.equal(requestSchema.safeParse({title:'Material',description:'Reposição',deadline:'2027-02-28'}).success,true);
 assert.equal(supplierSchema.safeParse({name:'X',document:'123',email:'invalido',phone:'123'}).success,false);
 assert.equal(loginSchema.safeParse({email:'a@b.com',password:'x'.repeat(73)}).success,false);
});
test('rejeita identificadores e valores inválidos',()=>{
 for(const id of ['0','-1','1e2','abc']) assert.equal(idSchema.safeParse(id).success,false);
 assert.equal(quoteSchema.safeParse({supplierId:1,amountCents:0}).success,false);
 assert.equal(quoteSchema.safeParse({supplierId:1,amountCents:4294967296}).success,false);
 assert.equal(quoteSchema.safeParse({supplierId:1,amountCents:2500}).success,true);
});
