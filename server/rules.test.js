import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateTransition } from './rules.js';
test('somente comprador envia solicitação com cotação', () => {
 assert.throws(() => validateTransition('aberta','em_aprovacao','solicitante',1));
 assert.throws(() => validateTransition('aberta','em_aprovacao','comprador',0));
 assert.doesNotThrow(() => validateTransition('aberta','em_aprovacao','comprador',1));
});
test('aprovação exige aprovador e justificativa em rejeição', () => {
 assert.throws(() => validateTransition('em_aprovacao','aprovada','comprador',1));
 assert.throws(() => validateTransition('em_aprovacao','rejeitada','aprovador',1,''));
 assert.doesNotThrow(() => validateTransition('em_aprovacao','rejeitada','aprovador',1,'Valor acima do orçamento'));
});
