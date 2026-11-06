# Instruções para agentes e colaboradores

- Antes de iniciar uma correção, melhoria ou função, crie ou identifique uma issue no GitHub que descreva o problema e o resultado esperado.
- Trabalhe em branch própria. Abra um pull request para a branch principal e mencione todas as issues relacionadas na descrição (use `Closes #N` quando o PR resolver integralmente a issue).
- Deploys devem ser feitos a partir de alterações revisadas por pull request e das verificações aprovadas. Nunca contorne proteção de branch; não inclua segredos ou dados reais em commits, testes, logs ou PRs.
- Execute os testes e verificações pertinentes; explique no PR o que foi validado e o que depende de infraestrutura externa.
- Preserve as permissões de acesso, valide entradas no servidor, mantenha as dependências auditadas e documente limitações de segurança.
