# API-REST 

### Objetivos
A construção desta API tem como objetivo aprimomarar meus conhecimentos,<br>
adquirir novas habilidades e se aprofundar mais na linguagem NodeJS e<br>
suas bibliotecas. 

### Sobre a API
Esta API é composta por um total de 12 requisições, sendo elas:<br><br>
-Usuário<br><br>
*POST cadastarUsuario<br>
*POST loginUsuario<br>
<br>
-Pedidos<br><br>
*POST cadastrarPedidos<br>
*GET buscarPedidos<br>
*GET buscarPedidosId<br>
*PATCH atualizaPedidos<br>
*DELETE deletaPedidos<br>
<br><br>
-Produtos<br><br>
*POST cadastraProdutos<br>
*GET buscarProdutos<br>
*GET buscarProdutosId<br>
*PATCH atualizaProdutos<br>
*DELETE deletaProdutos<br>
<br><br>
--Usuário<br><br>
No método de cadastro de usuário foi adicionado Criptografia Hash na senha para <br>
codificar a senha do usuário antes de salvar no banco de dados, ainda no cadastro de usuário <br>
já foram validado se e-mail que o usuário está tentando cadastra já existe no banco de dados caso <br>
exista a API não permite o cadastro.<br><br>

--Login Usuários<br><br>
No método de login do usuário a API é responsavél por compra a senha digitada com o hash salvo <br>
no banco de dados no momento do cadastro, caso esteja correto a API irá retornar um Token que usuário irá usar dentro
dos métodos de produtos.
<br><br>
--Produtos<br><br>
Dentro os métodos de produtos foram adicionados autententicação JWT (Json Web Token),<br>
obrigando assim que o usuário esteja logado para cadastrar novos produto e deletar um <br>
produto já existente.
### Dependencias 
Para Instalar as Dependencias deste projetos digite:<br>
-npm install

### Inciar Servidor 
Para iniciar o servidor digite:<br>
-npm start
