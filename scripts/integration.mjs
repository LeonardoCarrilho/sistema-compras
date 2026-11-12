import assert from 'node:assert/strict';
const base='http://127.0.0.1:3000/api';
async function request(path,token,body){const response=await fetch(base+path,{method:body?'POST':'GET',headers:{'content-type':'application/json',...(token?{cookie:token}:{})},...(body?{body:JSON.stringify(body)}:{})});const json=await response.json();return {status:response.status,json,cookie:response.headers.get("set-cookie")?.split(";")[0]};}
async function login(role){const r=await request('/login',null,{email:role+'@demo.local',password:'demo12345'});assert.equal(r.status,200);assert.equal(r.json.token,undefined);assert.match(r.cookie,/^session=/);return r.cookie}
const s=await login('solicitante'), c=await login('comprador'), a=await login('aprovador');
assert.equal((await request('/requests',null)).status,401);
const cross=await fetch(base+'/login',{method:'POST',headers:{'content-type':'application/json',origin:'https://attacker.invalid'},body:JSON.stringify({email:'solicitante@demo.local',password:'demo12345'})});assert.equal(cross.status,403);
const head=await fetch(base+'/me',{headers:{cookie:s}});assert.equal(head.headers.get('x-content-type-options'),'nosniff');assert.ok(head.headers.get('content-security-policy'));
assert.equal((await request('/requests',s,{title:'X',description:'Y',deadline:'2027-02-30'})).status,400);
assert.equal((await request('/requests/1e2',s)).status,400);
assert.equal((await request('/suppliers',s,{name:'Negado',document:'123',email:'x@x.com',phone:'123'})).status,403);
const supplier=await request('/suppliers',c,{name:'Fornecedor Teste',document:'123',email:'teste@example.com',phone:'123'});assert.equal(supplier.status,201);
const created=await request('/requests',s,{title:'Compra de materiais',description:'Materiais para escritório',deadline:'2027-02-01'});assert.equal(created.status,201);const id=created.json.id;
assert.equal((await request(`/requests/${id}/transition`,c,{status:'em_aprovacao',quoteId:1})).status,400);
assert.equal((await request(`/requests/${id}/quotes`,c,{supplierId:supplier.json.id,amountCents:12500,notes:'Entrega em 5 dias'})).status,201);
let detail=await request(`/requests/${id}`,s);assert.equal(detail.json.quotes.length,1);const quoteId=detail.json.quotes[0].id;
assert.equal((await request(`/requests/${id}/transition`,c,{status:'em_aprovacao',quoteId})).status,200);
assert.equal((await request(`/requests/${id}/transition`,c,{status:'aprovada'})).status,400);
assert.equal((await request(`/requests/${id}/transition`,a,{status:'rejeitada',reason:''})).status,400);
assert.equal((await request(`/requests/${id}/transition`,a,{status:'aprovada'})).status,200);
detail=await request(`/requests/${id}`,s);assert.equal(detail.json.status,'aprovada');assert.equal(detail.json.selected_quote_id,quoteId);assert.equal(detail.json.history.length,4);
assert.equal((await request(`/requests/${id}/quotes`,c,{supplierId:supplier.json.id,amountCents:500,notes:''})).status,409);
console.log('Fluxo completo e permissões: OK');
