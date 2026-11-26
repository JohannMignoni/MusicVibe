# MusicVibe

Plataforma web de compartilhamento de vídeos curtos musicais (até 60 segundos), desenvolvida em **Node.js**, **Express**, **EJS**, **Sequelize** e **MySQL**.

## Funcionalidades

- **Autenticação e Perfil de Usuário**: cadastro, login com hash de senha (`bcryptjs`), controle de sessão (`express-session`), edição de perfil e upload de foto de perfil (limite de 4 MB).
- **Vídeos Curtos**: upload de vídeos (até 100 MB) e capas/thumbnails via `multer`, feed principal, visualização individual com contador de visualizações.
- **Interações Sociais**: curtidas (`likes`) e comentários (`comments`) em vídeos.
- **Playlists**: criação e gerenciamento de playlists personalizadas com associação de múltiplos vídeos.
- **Busca e Categorias**: pesquisa de conteúdos e organização por categorias.

## Tecnologias Utilizadas

- **Back-end**: Node.js, Express 4, Express Validator, Express Session, Connect Flash, Multer, Morgan, Dotenv
- **Front-end (SSR)**: EJS, `express-ejs-layouts`, CSS customizado
- **Banco de Dados**: MySQL 8 com Sequelize 6 (`mysql2`)
- **Segurança**: `bcryptjs` para senhas e variáveis sensíveis isoladas via `.env`
- **Desenvolvimento**: Nodemon

## Estrutura do Projeto

```text
MusicVibe/
├── bin/www                  # Ponto de entrada do servidor HTTP
├── app.js                   # Configuração do Express, EJS, sessão, rotas e Sequelize
├── config/                  # Conexão MySQL (database.js), associações e constantes
├── middlewares/             # Autenticação, tratamento central de erros e uploads (Multer)
├── modules/                 # Arquitetura modular por domínio
│   ├── category/            # Categorias
│   ├── comment/             # Comentários
│   ├── like/                # Curtidas
│   ├── playlist/            # Playlists e vínculo playlist-vídeo
│   ├── search/              # Busca
│   ├── user/                # Usuários e autenticação
│   └── video/               # Vídeos e feed
├── routes/                  # Rota raiz (landing page)
├── views/                   # Templates EJS (layouts, pages e partials)
├── public/                  # Arquivos estáticos (stylesheets e uploads)
├── docs/                    # Documentação e Plano de Gerenciamento de Configuração (PGC)
├── .env.example             # Modelo de variáveis de ambiente
├── .gitignore               # Regras de arquivos ignorados pelo Git
└── package.json             # Scripts e dependências do projeto
```

## Pré-requisitos

- **Node.js** (LTS recomendado) e **npm**
- **MySQL** (versão 8 ou compatível)

## Como Executar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/JohannMignoni/MusicVibe.git
   cd MusicVibe
   ```

2. **Instale as dependências:**
   ```bash
   npm ci
   ```

3. **Configure as variáveis de ambiente:**
   Copie o arquivo `.env.example` para `.env` e preencha com as credenciais do seu MySQL local:
   ```bash
   cp .env.example .env
   ```
   Principais variáveis:
   - `PORT` (padrão: `3000`)
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `SESSION_SECRET`

4. **Crie o banco de dados no MySQL:**
   ```sql
   CREATE DATABASE musicvibe_db;
   ```

5. **Inicie a aplicação:**
   - Em modo de desenvolvimento (com hot-reload via `nodemon`):
     ```bash
     npm run dev
     ```
   - Em modo padrão:
     ```bash
     npm start
     ```

6. Acesse no navegador: `http://localhost:3000`

## Gestão de Configuração e DevOps

O **Plano de Gerenciamento de Configuração (PGC)** com enfoque em práticas DevOps (estratégia de branching, Conventional Commits, Versionamento Semântico, pipelines CI/CD e controle de mudanças) está disponível em:

- [`docs/Plano_Ger_Conf_DevOps_MusicVibe.docx`](docs/Plano_Ger_Conf_DevOps_MusicVibe.docx)
