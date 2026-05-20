🍕 Prime Pizza - Backend

O Prime Pizza é uma API REST corporativa desenvolvida para o gerenciamento completo de uma pizzaria em tempo real. A aplicação permite o controle de usuários (administradores/funcionários), cardápio categorizado, upload em nuvem e um fluxo dinâmico de pedidos desde a abertura até a finalização na cozinha.

🚀 Tecnologias Utilizadas

Runtime: Node.js

Linguagem: TypeScript

Framework Web: Express

Banco de Dados & ORM: Prisma Client

Autenticação: JSON Web Token (JWT) & BcryptJS

Gerenciamento de Mídia: Cloudinary API (Upload de imagens em nuvem)

Upload Local Temporário: Multer

🛠️ Arquitetura e Organização do Código

O projeto segue os princípios de separação de responsabilidades (SoC), dividindo a lógica em camadas limpas para facilitar a manutenção e escalabilidade:

Controllers: Responsáveis por receber as requisições HTTP, validar os dados de entrada mínimos, gerenciar os streams de arquivos (como o envio seguro para o Cloudinary via HTTPS) e devolver as respostas ao cliente.

Services: Camada isolada contendo as regras de negócio puras da aplicação, validações rigorosas de campos obrigatórios e a comunicação direta com o banco de dados através do Prisma.

Middlewares: Filtros de requisições reutilizáveis, como o sistema de guarda de rotas (isAuthenticated) que extrai, valida tokens JWT usando variáveis de ambiente e anexa o contexto do usuário (user_id) às rotas subsequentes.

🔒 Variáveis de Ambiente Necessárias

Para rodar o projeto localmente ou em produção, é necessário configurar um arquivo .env na raiz do backend com as seguintes chaves:

Snippet de código
DATABASE_URL="sua_string_de_conexao_do_banco"
JWT_SECRET="sua_chave_secreta_para_tokens"
CLOUDINARY_NAME="seu_cloud_name"
CLOUDINARY_KEY="sua_api_key_do_cloudinary"
CLOUDINARY_SECRET="seu_api_secret_do_cloudinary"

🔗 Principais Endpoints da API

Autenticação e Usuários
POST /users - Cadastro de novos administradores.

POST /session - Login com validação de hash de senha e geração de token JWT.

GET /me - Retorna o perfil do usuário logado (Rota Protegida).

Cardápio (Categorias e Produtos)
POST /category - Criação de categorias (ex: "Pizzas Doces", "Bebidas") (Rota Protegida).

GET /category - Listagem de categorias cadastradas (Rota Protegida).

POST /product - Cadastro de produtos com envio automático do banner para o Cloudinary (Rota Protegida).

GET /category/product - Filtra e lista produtos baseados no ID da categoria (Rota Protegida).

Fluxo de Pedidos (Orders)
POST /order - Abertura de uma nova mesa/pedido (Rota Protegida).

DELETE /order - Cancelamento de um pedido (Rota Protegida).

POST /order/add - Vincula itens, produtos e quantidades a um pedido existente (Rota Protegida).

DELETE /order/remove - Remove um item específico do pedido (Rota Protegida).

PUT /order/send - Envia o pedido para a fila da cozinha (muda o status) (Rota Protegida).

GET /orders - Lista os pedidos ativos em andamento (Rota Protegida).

GET /order/detail - Exibe os detalhes e itens de um pedido específico (Rota Protegida).

PUT /order/finish - Finaliza e encerra o pedido (Rota Protegida).

⚙️ Como Executar o Projeto

Siga os passos abaixo para clonar, configurar e rodar o ecossistema do backend na sua máquina local.

Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:

Node.js (Versão LTS recomendada)

Um banco de dados relacional (PostgreSQL ou MySQL) ativo ou rodando via Docker.

👤 Desenvolvedor

Desenvolvido com dedicação por Paulo Magio. Se você quiser entrar em contato, trocar ideias sobre desenvolvimento de software ou acompanhar meus projetos, fique à vontade:

LinkedIn: linkedin.com/in/paulo-magio
