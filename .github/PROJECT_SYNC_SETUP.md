# 🔄 GitHub Project Sync Setup

Este documento explica como configurar a sincronização automática entre Issues e o GitHub Project Board.

## 📋 O que faz

O workflow `.github/workflows/sync-project.yml` automaticamente:

1. ✅ **Adiciona Issues/PRs** ao Project Board quando criados
2. ✅ **Move cards** entre colunas baseado nas labels:
   - `backlog` → Coluna "Backlog"
   - `in-progress` → Coluna "In Progress"
   - `review` → Coluna "In Review"
   - `done` → Coluna "Done"
3. ✅ **Fecha cards** quando Issues/PRs são fechados

---

## 🔧 Configuração Necessária

### **1. Criar Personal Access Token (PAT)**

1. Acesse: https://github.com/settings/tokens/new
2. Configure o token:
   - **Nome:** `GH_PROJECT_TOKEN`
   - **Expiration:** 90 days (ou custom)
   - **Scopes necessários:**
     - ✅ `repo` (Full control of private repositories)
     - ✅ `project` (Full control of projects)
     - ✅ `write:org` (Read and write org projects)

3. Clique em **Generate token**
4. **COPIE O TOKEN** (você não verá novamente!)

### **2. Adicionar Token aos Secrets do Repositório**

1. Acesse: https://github.com/ricardo-benicio/byteburger/settings/secrets/actions
2. Clique em **"New repository secret"**
3. Configure:
   - **Name:** `GH_PROJECT_TOKEN`
   - **Value:** Cole o token que você copiou
4. Clique em **"Add secret"**

---

## ✅ Verificação

Após configurar, faça um teste:

```bash
# Atualizar uma label de uma issue
gh issue edit 6 --add-label "in-progress"
```

O workflow será acionado e a Issue #6 deve mover automaticamente para a coluna "In Progress" no Project Board.

---

## 📊 Mapeamento Labels → Colunas

| Label | Coluna no Project |
|-------|-------------------|
| `backlog` | Backlog |
| `in-progress` | In Progress |
| `review` | In Review |
| `done` | Done |
| Issue fechada | Done |

---

## 🐛 Troubleshooting

### Workflow não está executando?

1. Verifique se o secret `GH_PROJECT_TOKEN` está configurado
2. Vá em: https://github.com/ricardo-benicio/byteburger/actions
3. Veja os logs de execução para erros

### Token expirou?

1. Gere um novo token seguindo o passo 1
2. Atualize o secret em: https://github.com/ricardo-benicio/byteburger/settings/secrets/actions

### Issues não aparecem no Project?

Verifique se o Project URL está correto no arquivo `sync-project.yml`:
```yaml
project-url: https://github.com/users/ricardo-benicio/projects/16
```

---

## 🔄 Sincronização Manual (fallback)

Se o workflow falhar, você sempre pode sincronizar manualmente:

```bash
# Via GitHub CLI (requer GraphQL)
gh project item-add 16 --owner @me --url https://github.com/ricardo-benicio/byteburger/issues/X
```

Ou simplesmente arraste as Issues no board manualmente.

---

## 📝 Notas

- O workflow executa automaticamente quando labels mudam
- Não precisa fazer nada manualmente após configurar
- Funciona tanto para Issues quanto Pull Requests
- As Issues continuam sendo atualizadas via `sprint-status.yaml` normalmente
