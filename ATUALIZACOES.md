# 📋 Registro de Atualizações - API e Sistema

## 🔄 Alterações Realizadas em 11/11/2025

### 1. **Atualização das URLs da API**

#### ❌ URLs Antigas (sup.bixs.com.br):

```
https://sup.bixs.com.br/v1/auth/login
https://sup.bixs.com.br/v1/api/products
https://sup.bixs.com.br/v1/api/groups
```

#### ✅ URLs Novas (dev.bixs.com.br):

```
https://dev.bixs.com.br/v1/auth/admin/login
https://dev.bixs.com.br/v1/api/products
https://dev.bixs.com.br/v1/api/groups
```

---

### 2. **Atualização de Credenciais**

#### ❌ Credenciais Antigas:

```json
{
	"email": "pedrolucasmota2005.pl@gmail.com",
	"mac": "00000",
	"password": "plm200510",
	"source_app": "teste_app"
}
```

#### ✅ Credenciais Novas:

```json
{
	"email": "pedro@bixs.com.br",
	"password": "Pedro@2005"
}
```

#### 🔑 Token Atualizado:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJ1c2VybmFtZSI6IlBlZHJvIiwiY3BmQ25waiI6IiIsImVtYWlsIjoicGVkcm9AYml4cy5jb20uYnIiLCJpc0FkbWluIjp0cnVlLCJzdWIiOiIxMiIsImV4cCI6MTc2Mjk3NDg3OSwiaWF0IjoxNzYyODg4NDc5fQ.0JR1wHx5rMujJvx1VhZkm_RgRotHPM-OYPmGTqXjhrQ
```

---

### 3. **Arquivos Atualizados**

#### 📄 `api.js`

-   ✅ URL da API atualizada para `dev.bixs.com.br`
-   ✅ Rota de autenticação alterada para `/auth/admin/login`
-   ✅ Credenciais atualizadas
-   ✅ Token inicial atualizado
-   ✅ Removidos campos desnecessários (`mac`, `source_app`, `permanentToken`)

#### 📄 `teste-conexao.html`

-   ✅ Todas as URLs de teste atualizadas
-   ✅ Credenciais de teste atualizadas
-   ✅ Token de exemplo atualizado
-   ✅ Mensagens de erro atualizadas

#### 📄 `admin/cadProduto.html`

-   ✅ URL da API atualizada
-   ✅ Token de autenticação atualizado
-   ✅ **NOVO**: Adicionada URL da API de grupos/categorias
-   ✅ **NOVO**: Aba completa para gerenciar categorias
-   ✅ **NOVO**: Funções CRUD para categorias

---

### 4. **Novas Funcionalidades - Gerenciamento de Categorias**

#### ➕ Nova Aba: "Gerenciar Categorias"

**Recursos Implementados:**

1. **Adicionar Nova Categoria**

    - Campo: Código da Categoria
    - Campo: Nome da Categoria
    - Botão: Adicionar Categoria

2. **Listar Categorias**

    - Exibição em lista
    - Botão de atualizar (🔄)
    - Scroll automático para muitas categorias

3. **Editar Categoria**

    - Modal de edição
    - Atualização em tempo real
    - Validação de campos

4. **Excluir Categoria**
    - Confirmação antes de excluir
    - Aviso sobre produtos vinculados
    - Log detalhado da operação

---

### 5. **Endpoints da API de Categorias**

#### 📥 GET - Listar Categorias

```bash
curl -X 'GET' \
  'https://dev.bixs.com.br/v1/api/groups?source=uai_pdv_mais' \
  -H 'accept: application/json'
```

#### ➕ POST - Criar Categoria

```bash
curl -X 'POST' \
  'https://dev.bixs.com.br/v1/api/groups?source=uai_pdv_mais' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer {TOKEN}' \
  -H 'Content-Type: application/json' \
  -d '{
    "group_code": "SALGADOS",
    "name": "Salgados"
  }'
```

#### ✏️ PUT - Atualizar Categoria

```bash
curl -X 'PUT' \
  'https://dev.bixs.com.br/v1/api/groups/{id}?source=uai_pdv_mais' \
  -H 'Authorization: Bearer {TOKEN}' \
  -H 'Content-Type: application/json' \
  -d '{
    "group_code": "SALGADOS",
    "name": "Salgados Diversos"
  }'
```

#### ❌ DELETE - Excluir Categoria

```bash
curl -X 'DELETE' \
  'https://dev.bixs.com.br/v1/api/groups/{id}?source=uai_pdv_mais' \
  -H 'Authorization: Bearer {TOKEN}'
```

---

### 6. **Estrutura de Dados**

#### Categoria (Group):

```json
{
	"id": 1,
	"group_code": "SALGADOS",
	"name": "Salgados"
}
```

#### Produto (Product):

```json
{
	"id": 1,
	"name": "Coxinha",
	"description": "Coxinha de frango",
	"price": 5.5,
	"product_code": "COX001",
	"ean_code": "7891234567890",
	"group_code": "SALGADOS",
	"image_url": "https://exemplo.com/coxinha.jpg"
}
```

---

### 7. **Melhorias no Código**

-   ✅ Separação clara entre API de produtos e categorias
-   ✅ Código modular e reutilizável
-   ✅ Tratamento de erros robusto
-   ✅ Logs detalhados para debugging
-   ✅ Interface responsiva e intuitiva
-   ✅ Confirmações antes de ações destrutivas

---

## 🎯 Como Usar

### Para Produtos:

1. Abra `admin/cadProduto.html`
2. Use as abas de produtos conforme necessário
3. Todas as URLs já estão atualizadas automaticamente

### Para Categorias:

1. Abra `admin/cadProduto.html`
2. Clique na aba **"Gerenciar Categorias"**
3. Use o formulário para adicionar novas categorias
4. Clique em **"🔄 Atualizar"** para ver a lista
5. Use os botões **"Editar"** ou **"Excluir"** conforme necessário

---

## ⚠️ Observações Importantes

1. **Certificado SSL**: O servidor `dev.bixs.com.br` deve ter certificado SSL
   válido
2. **Token Expira**: O token tem data de expiração (exp: 1762974879)
3. **Permissões**: O usuário atual é admin (`isAdmin: true`)
4. **Source**: Todas as requisições usam `source=uai_pdv_mais`

---

## 🧪 Testes Recomendados

1. ✅ Testar autenticação
2. ✅ Criar categoria de teste
3. ✅ Criar produto vinculado à categoria
4. ✅ Editar categoria
5. ✅ Verificar se o produto ainda está vinculado
6. ✅ Testar exclusão (com cuidado)

---

## 📞 Suporte

Em caso de problemas com a API, verifique:

-   ✅ Token válido e não expirado
-   ✅ Servidor online em `https://dev.bixs.com.br`
-   ✅ Swagger disponível em `https://dev.bixs.com.br/swagger`
-   ✅ Console do navegador (F12) para erros detalhados

---

**Data da Atualização**: 11 de Novembro de 2025  
**Versão**: 2.0.0  
**Status**: ✅ Implementado e Testado
