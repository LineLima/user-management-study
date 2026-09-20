# User Management API + Angular

## 1. Objetivo

Aplicação de gerenciamento de usuários desenvolvida para demonstrar uma API REST segura com autenticação, autorização baseada em perfis e uma interface web em Angular.

A aplicação permite realizar login, listar, cadastrar, editar e excluir usuários de acordo com as permissões de cada perfil.

## 2. Tecnologias utilizadas

### Backend

* C#
* .NET 10
* ASP.NET Core Web API
* Entity Framework Core
* SQLite
* JWT (JSON Web Token)
* BCrypt

### Frontend

* Angular 21
* TypeScript
* HTML
* CSS

## 3. Perfis de acesso

| Perfil        | Permissões                        |
| ------------- | --------------------------------- |
| Administrator | Acesso completo                   |
| Operator      | Listar e atualizar usuários       |
| Client        | Acessar somente os próprios dados |

## 4. Autenticação

O usuário realiza login informando e-mail e senha.

A API verifica a senha utilizando BCrypt. Quando as credenciais são válidas, um JWT é gerado e retornado para a aplicação Angular.

O Angular armazena o token e o envia nas requisições protegidas utilizando o cabeçalho:

`Authorization: Bearer <token>`

O token possui validade de 60 minutos.

### Informações presentes no JWT

* ID do usuário
* Nome
* E-mail
* Perfil
* Data de emissão
* Data de expiração

A validade de 60 minutos foi utilizada como uma forma de limitar o período de utilização de um token caso ele seja comprometido.

## 5. Endpoints

### Login

`POST /api/auth/login`

Realiza a autenticação do usuário e retorna o JWT.

### Listar usuários

`GET /api/users`

Permissão:

* Administrator
* Operator

### Consultar usuário

`GET /api/users/{id}`

Permissão:

* Administrator
* Operator
* Client, somente para seus próprios dados.

### Criar usuário

`POST /api/users`

Permissão:

* Administrator

### Atualizar usuário

`PUT /api/users/{id}`

Permissão:

* Administrator
* Operator

### Excluir usuário

`DELETE /api/users/{id}`

Permissão:

* Administrator

## 6. Principais códigos HTTP

| Código | Significado                                      |
| ------ | ------------------------------------------------ |
| 200    | Operação realizada com sucesso                   |
| 201    | Recurso criado com sucesso                       |
| 204    | Recurso excluído com sucesso                     |
| 401    | Usuário não autenticado ou credenciais inválidas |
| 403    | Usuário autenticado, mas sem permissão           |
| 404    | Recurso não encontrado                           |
| 409    | Conflito, como e-mail já cadastrado              |

## 7. OAuth 2.0

OAuth 2.0 é um protocolo de autorização utilizado para permitir que uma aplicação obtenha acesso limitado a recursos em nome de um usuário.

Em um fluxo OAuth 2.0, o usuário autoriza uma aplicação por meio de um servidor de autorização. Após a autorização, a aplicação recebe tokens que podem ser utilizados para acessar recursos protegidos.

Uma das principais vantagens é que a aplicação cliente não precisa receber ou armazenar diretamente a senha do usuário.

Nesta aplicação, OAuth 2.0 é apresentado apenas como conceito e não foi implementado, pois a autenticação utilizada no projeto é baseada em JWT.

## 8. Análise de segurança

### 8.1 Roubo ou comprometimento do token

Um JWT comprometido pode ser utilizado enquanto estiver válido.

**Mitigação:**

* utilização de HTTPS em ambientes reais;
* tempo de expiração limitado;
* validação da assinatura e validade do token.

### 8.2 Armazenamento de senhas

Armazenar senhas em texto puro permitiria que uma pessoa com acesso ao banco obtivesse as credenciais dos usuários.

**Mitigação:**

* as senhas são armazenadas utilizando BCrypt;
* a senha original não é armazenada no banco de dados.

### 8.3 Acesso não autorizado aos endpoints

Um usuário autenticado não deve necessariamente possuir acesso a todas as operações.

**Mitigação:**

* autenticação com JWT;
* autorização baseada em roles;
* utilização de `[Authorize]` nos endpoints protegidos;
* restrição específica para o perfil Client.

## 9. Como executar

### Backend

Entre na pasta da API:

```bash
cd UserManagement.Api
```

Execute:

```bash
dotnet run
```

A API estará disponível em:

```text
http://localhost:5256
```

### Frontend

Entre na pasta do Angular:

```bash
cd user-management-ui
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
ng serve
```

A aplicação estará disponível em:

```text
http://localhost:4200
```

## 10. Usuários para demonstração

A aplicação cria usuários iniciais para demonstração:

| E-mail                                              | Senha        | Perfil        |
| --------------------------------------------------- | ------------ | ------------- |
| [admin@example.com](mailto:admin@example.com)       | Admin123!    | Administrator |
| [operator@example.com](mailto:operator@example.com) | Operator123! | Operator      |
| [client@example.com](mailto:client@example.com)     | Client123!   | Client        |

Essas credenciais são destinadas somente à demonstração local do projeto.

## 11. Banco de dados

A aplicação utiliza SQLite.

O banco `users.db` é criado automaticamente pela aplicação e as tabelas são gerenciadas pelo Entity Framework Core utilizando migrations.

## 12. Testes realizados

A aplicação foi executada localmente com:

* API ASP.NET Core;
* frontend Angular;
* autenticação por JWT;
* proteção da rota de usuários;
* operações de gerenciamento de usuários.
