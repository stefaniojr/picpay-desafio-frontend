# **PayFriends**

PayFriends é uma aplicação em Angular em que um usuário pode adicionar, alterar e deletar pagamentos. Além disso, ele pode realizar o login e logout nela, respeitando as proteções de rota. A aplicação foi desenvolvida utilizando algumas libs bem populares como Angular Material e Bootstrap.

## Setup do projeto

- Angular CLI: 12.1.4
- Node: 12.20.2
- Angular: 12.1.4

## Como Rodar?

- Instale as dependências usando o comando `npm install`
- Na raiz do repositório, rode este comando `ng serve` para iniciar o servidor de desenvolvimento.
- A Aplicação estará disponível na porta `http://localhost:4200/`

<br/>

### **API**

A aplicação faz uso do JSON Server para simular uma API.

Para rodar (deixar aberto em uma outra aba do terminal, para que ele fique escutando suas ações de CRUD!), digite o seguinte comando na RAÍZ do projeto: 

`npm run api`

O endpoint estará disponível na porta `http://localhost:3000/`

**Rotas:** <br />
`GET: /tasks`<br />
`POST: /tasks`<br />
`PUT: /tasks`<br />
`PATCH: /tasks`<br />
`DELETE: /tasks`<br />

`GET: /users` <br />
`POST: /users` <br />
`PUT: /users` <br />
`PATCH: /users` <br />
`DELETE: /users` <br />
<br/>

*Extra*</br>
A aplicação faz uso do json-server-auth (Ver https://www.npmjs.com/package/json-server-auth). Para adicionar um novo usuário, utilize o endpoint:

`POST: /REGISTER` <br />

Assim, um novo usuário será criado com uma senha criptografada no arquivo db.json. O usuário de teste **também está com uma senha criptograda**, portanto, abaixo são exibidas as informações de acesso do mesmo:

`{ "email": "usuario@gmail.com", "password": "usuario" }`
