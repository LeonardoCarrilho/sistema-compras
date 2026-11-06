export function validateTransition(from, to, role, quotes, reason = '') {
 if (from === 'aberta' && to === 'em_aprovacao' && role === 'comprador' && quotes > 0) return;
 if (from === 'em_aprovacao' && role === 'aprovador' && (to === 'aprovada' || (to === 'rejeitada' && reason.trim()))) return;
 throw new Error('Transição não permitida ou justificativa ausente.');
}
