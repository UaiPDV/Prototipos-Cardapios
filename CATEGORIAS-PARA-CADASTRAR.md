# 📁 Categorias para Cadastrar no Sistema

## 🎯 Categorias Esperadas pelo Sistema

O arquivo `api.js` está configurado para reconhecer **5 categorias principais**,
cada uma com sua imagem específica:

### Lista de Categorias:

| Nº  | Código da Categoria | Nome Sugerido   | Imagem Associada       |
| --- | ------------------- | --------------- | ---------------------- |
| 1   | `BEBIDAS`           | Bebidas         | `img/bebidasgeral.jpg` |
| 2   | `BEBIDAS_QUENTES`   | Bebidas Quentes | `img/bebidasgeral.jpg` |
| 3   | `SALGADOS`          | Salgados        | `img/salgados.jpg`     |
| 4   | `PADARIA`           | Padaria         | `img/paes.webp`        |
| 5   | `SOBREMESAS`        | Sobremesas      | `img/doces.png`        |

---

## 📋 JSON Pronto para Cadastro

### Opção 1: Cadastrar uma por vez (via admin/cadProduto.html)

Abra `admin/cadProduto.html`, vá na aba **"Gerenciar Categorias"** e preencha:

#### Categoria 1 - Bebidas

```
Código: BEBIDAS
Nome: Bebidas
```

#### Categoria 2 - Bebidas Quentes

```
Código: BEBIDAS_QUENTES
Nome: Bebidas Quentes
```

#### Categoria 3 - Salgados

```
Código: SALGADOS
Nome: Salgados
```

#### Categoria 4 - Padaria

```
Código: PADARIA
Nome: Padaria
```

#### Categoria 5 - Sobremesas

```
Código: SOBREMESAS
Nome: Sobremesas
```

---

## 🔧 Opção 2: Cadastro via cURL (Terminal)

Use estes comandos no PowerShell para cadastrar todas de uma vez:

```powershell
# Categoria 1 - Bebidas
curl -X 'POST' `
  'https://dev.bixs.com.br/v1/api/groups?source=uai_pdv_mais' `
  -H 'accept: application/json' `
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJ1c2VybmFtZSI6IlBlZHJvIiwiY3BmQ25waiI6IiIsImVtYWlsIjoicGVkcm9AYml4cy5jb20uYnIiLCJpc0FkbWluIjp0cnVlLCJzdWIiOiIxMiIsImV4cCI6MTc2Mjk3NDg3OSwiaWF0IjoxNzYyODg4NDc5fQ.0JR1wHx5rMujJvx1VhZkm_RgRotHPM-OYPmGTqXjhrQ' `
  -H 'Content-Type: application/json' `
  -d '{
  "group_code": "BEBIDAS",
  "name": "Bebidas"
}'

# Categoria 2 - Bebidas Quentes
curl -X 'POST' `
  'https://dev.bixs.com.br/v1/api/groups?source=uai_pdv_mais' `
  -H 'accept: application/json' `
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJ1c2VybmFtZSI6IlBlZHJvIiwiY3BmQ25waiI6IiIsImVtYWlsIjoicGVkcm9AYml4cy5jb20uYnIiLCJpc0FkbWluIjp0cnVlLCJzdWIiOiIxMiIsImV4cCI6MTc2Mjk3NDg3OSwiaWF0IjoxNzYyODg4NDc5fQ.0JR1wHx5rMujJvx1VhZkm_RgRotHPM-OYPmGTqXjhrQ' `
  -H 'Content-Type: application/json' `
  -d '{
  "group_code": "BEBIDAS_QUENTES",
  "name": "Bebidas Quentes"
}'

# Categoria 3 - Salgados
curl -X 'POST' `
  'https://dev.bixs.com.br/v1/api/groups?source=uai_pdv_mais' `
  -H 'accept: application/json' `
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJ1c2VybmFtZSI6IlBlZHJvIiwiY3BmQ25waiI6IiIsImVtYWlsIjoicGVkcm9AYml4cy5jb20uYnIiLCJpc0FkbWluIjp0cnVlLCJzdWIiOiIxMiIsImV4cCI6MTc2Mjk3NDg3OSwiaWF0IjoxNzYyODg4NDc5fQ.0JR1wHx5rMujJvx1VhZkm_RgRotHPM-OYPmGTqXjhrQ' `
  -H 'Content-Type: application/json' `
  -d '{
  "group_code": "SALGADOS",
  "name": "Salgados"
}'

# Categoria 4 - Padaria
curl -X 'POST' `
  'https://dev.bixs.com.br/v1/api/groups?source=uai_pdv_mais' `
  -H 'accept: application/json' `
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJ1c2VybmFtZSI6IlBlZHJvIiwiY3BmQ25waiI6IiIsImVtYWlsIjoicGVkcm9AYml4cy5jb20uYnIiLCJpc0FkbWluIjp0cnVlLCJzdWIiOiIxMiIsImV4cCI6MTc2Mjk3NDg3OSwiaWF0IjoxNzYyODg4NDc5fQ.0JR1wHx5rMujJvx1VhZkm_RgRotHPM-OYPmGTqXjhrQ' `
  -H 'Content-Type: application/json' `
  -d '{
  "group_code": "PADARIA",
  "name": "Padaria"
}'

# Categoria 5 - Sobremesas
curl -X 'POST' `
  'https://dev.bixs.com.br/v1/api/groups?source=uai_pdv_mais' `
  -H 'accept: application/json' `
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJ1c2VybmFtZSI6IlBlZHJvIiwiY3BmQ25waiI6IiIsImVtYWlsIjoicGVkcm9AYml4cy5jb20uYnIiLCJpc0FkbWluIjp0cnVlLCJzdWIiOiIxMiIsImV4cCI6MTc2Mjk3NDg3OSwiaWF0IjoxNzYyODg4NDc5fQ.0JR1wHx5rMujJvx1VhZkm_RgRotHPM-OYPmGTqXjhrQ' `
  -H 'Content-Type: application/json' `
  -d '{
  "group_code": "SOBREMESAS",
  "name": "Sobremesas"
}'
```

---

## 📝 Opção 3: Script PowerShell Automatizado

Copie e cole este script completo no PowerShell:

```powershell
# Script para cadastrar todas as categorias de uma vez

$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJ1c2VybmFtZSI6IlBlZHJvIiwiY3BmQ25waiI6IiIsImVtYWlsIjoicGVkcm9AYml4cy5jb20uYnIiLCJpc0FkbWluIjp0cnVlLCJzdWIiOiIxMiIsImV4cCI6MTc2Mjk3NDg3OSwiaWF0IjoxNzYyODg4NDc5fQ.0JR1wHx5rMujJvx1VhZkm_RgRotHPM-OYPmGTqXjhrQ"
$baseUrl = "https://dev.bixs.com.br/v1/api/groups?source=uai_pdv_mais"

$categorias = @(
    @{ group_code = "BEBIDAS"; name = "Bebidas" },
    @{ group_code = "BEBIDAS_QUENTES"; name = "Bebidas Quentes" },
    @{ group_code = "SALGADOS"; name = "Salgados" },
    @{ group_code = "PADARIA"; name = "Padaria" },
    @{ group_code = "SOBREMESAS"; name = "Sobremesas" }
)

foreach ($categoria in $categorias) {
    Write-Host "Cadastrando categoria: $($categoria.name)..." -ForegroundColor Cyan

    $body = @{
        group_code = $categoria.group_code
        name = $categoria.name
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body -ContentType "application/json" -Headers @{
            "Authorization" = "Bearer $token"
            "accept" = "application/json"
        }

        Write-Host "✅ Categoria '$($categoria.name)' cadastrada com sucesso!" -ForegroundColor Green
        Write-Host ""
    }
    catch {
        Write-Host "❌ Erro ao cadastrar '$($categoria.name)': $_" -ForegroundColor Red
        Write-Host ""
    }

    Start-Sleep -Milliseconds 500
}

Write-Host "🎉 Processo finalizado!" -ForegroundColor Yellow
```

---

## ⚙️ Opção 4: Via Interface Web (Recomendado)

### Passo a Passo:

1. **Abra** `admin/cadProduto.html` no navegador
2. **Clique** na primeira aba: **"Gerenciar Categorias"**
3. **Preencha** o formulário para cada categoria:

    | Código          | Nome            |
    | --------------- | --------------- |
    | BEBIDAS         | Bebidas         |
    | BEBIDAS_QUENTES | Bebidas Quentes |
    | SALGADOS        | Salgados        |
    | PADARIA         | Padaria         |
    | SOBREMESAS      | Sobremesas      |

4. **Clique** em "Adicionar Categoria" para cada uma
5. **Clique** em "🔄 Atualizar" para ver a lista atualizada

---

## 🖼️ Imagens das Categorias

Para que as categorias apareçam com suas imagens corretas, certifique-se de ter
estes arquivos na pasta `img/`:

-   ✅ `img/bebidasgeral.jpg` (para BEBIDAS e BEBIDAS_QUENTES)
-   ✅ `img/salgados.jpg` (para SALGADOS)
-   ✅ `img/paes.webp` (para PADARIA)
-   ✅ `img/doces.png` (para SOBREMESAS)

> **💡 Dica**: Se você não tiver essas imagens, o sistema automaticamente gerará
> placeholders com o nome da categoria.

---

## 🔍 Como Verificar se Funcionou

Após cadastrar as categorias, abra o **Console do Navegador** (F12) no
`index.html` e você deverá ver:

```
✔ Categorias (API) adaptadas com sucesso:
┌─────────┬──────────────────┬─────────────────────┬────────────────────────┐
│ (index) │        id        │        nome         │       imagemUrl        │
├─────────┼──────────────────┼─────────────────────┼────────────────────────┤
│    0    │   'BEBIDAS'      │     'Bebidas'       │ 'img/bebidasgeral.jpg' │
│    1    │'BEBIDAS_QUENTES' │ 'Bebidas Quentes'   │ 'img/bebidasgeral.jpg' │
│    2    │   'SALGADOS'     │     'Salgados'      │ 'img/salgados.jpg'     │
│    3    │   'PADARIA'      │     'Padaria'       │ 'img/paes.webp'        │
│    4    │  'SOBREMESAS'    │    'Sobremesas'     │ 'img/doces.png'        │
└─────────┴──────────────────┴─────────────────────┴────────────────────────┘
```

---

## ⚠️ Importante

-   **Códigos Exatos**: Use EXATAMENTE os códigos listados (`BEBIDAS`,
    `BEBIDAS_QUENTES`, etc.) para que as imagens sejam associadas corretamente
-   **Maiúsculas**: Os códigos devem estar em MAIÚSCULAS
-   **Sem Espaços**: O `group_code` não deve ter espaços (use underscore `_` se
    necessário)

---

## 🎨 Personalizando Mais Categorias

Se você quiser adicionar mais categorias além das 5 padrão, elas funcionarão
normalmente, mas:

1. Não terão imagens pré-definidas (usarão placeholder)
2. Para adicionar imagem customizada, edite o arquivo `api.js` na linha ~237:

```javascript
const imagensCategorias = {
	BEBIDAS: 'img/bebidasgeral.jpg',
	BEBIDAS_QUENTES: 'img/bebidasgeral.jpg',
	SALGADOS: 'img/salgados.jpg',
	PADARIA: 'img/paes.webp',
	SOBREMESAS: 'img/doces.png',

	// Adicione suas categorias aqui:
	SUA_CATEGORIA: 'img/sua-imagem.jpg',
};
```

---

**✨ Pronto para Começar!**

Escolha a opção que preferir e comece a cadastrar suas categorias! 🚀
