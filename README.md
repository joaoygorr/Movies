### :white_check_mark: Projeto Concluído :white_check_mark: 

# Filmes

CineScope é uma aplicação web que permite aos usuários explorar filmes e séries, buscar por títulos, assistir a trailers e trocar o idioma do conteúdo exibido. A aplicação utiliza a API do The Movie Database (TMDB) para obter dados sobre filmes e séries.

## ✔️ Tecnologias Utilizadas

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website** ([Nextjs](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/))

-   **[Prime Icons](https://primeng.org/icons)**
-   **[Axios](https://axios-http.com/ptbr/docs/intro)**
-   **[Tailwindcss](https://tailwindcss.com/)**
-   **[React Slick](https://react-slick.neostack.com/)** - Carousel component
-   **[Jest](https://jestjs.io/)** - Unit testing framework
-   **[React Testing Library](https://testing-library.com/react)** - Testing utilities

## 🛠️ Como Abrir e Executar o Projeto

### Pré-requisitos

- Node.js 20+
- Yarn ou NPM
- Variáveis de ambiente configuradas (.env.local)

#### 🧭 Executando a aplicação web (Frontend)

```bash

# Instale as dependências
$ yarn install
# ou
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ yarn dev
# ou
$ npm run dev

# A aplicação estará disponível na porta 3000 - acesse http://localhost:3000

# Build para produção
$ yarn build

# Executar a aplicação em produção
$ yarn start

```

### 🐳 Executando via Docker

```bash
# No diretório raiz do projeto, execute:
$ docker-compose up

# Para builds otimizados com multi-stage, use:
$ docker build -t movies-app .
$ docker run -p 3000:3000 movies-app
```

## 📊 Scripts Disponíveis

```bash
$ yarn dev          # Inicia o servidor de desenvolvimento
$ yarn build        # Faz build da aplicação para produção
$ yarn start        # Inicia o servidor de produção
$ yarn lint         # Executa ESLint para verificar qualidade do código
$ yarn test         # Executa os testes unitários
$ yarn test:watch   # Executa os testes em modo watch
$ yarn analyze      # Analisa o bundle de produção
```

## 🔒 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TOKEN_READ_API=your_tmdb_api_key_here
```

## 📁 Estrutura do Projeto

```
src/
├── app/              # Rotas da aplicação (Next.js App Router)
│   ├── layout.tsx    # Layout raiz
│   ├── cast/         # Página de detalhes do ator
│   ├── movie/        # Páginas de filmes
│   └── tvShows/      # Páginas de séries
├── shared/           # Código compartilhado
│   ├── api/          # Camada de API com Axios
│   ├── components/   # Componentes reutilizáveis
│   ├── context/      # Context da aplicação
│   ├── hook/         # Custom hooks
│   ├── interfaces/   # Interfaces TypeScript
│   └── utils/        # Funções utilitárias
└── styles/           # Estilos globais
```

## 🚀 Melhorias Implementadas

### 1. **Qualidade de Código**
- ✅ Configuração de ESLint com TypeScript
- ✅ TypeScript strict mode ativado
- ✅ Prettier para formatação consistente
- ✅ Correção de typos (findByPeople)

### 2. **Performance**
- ✅ Remoção de dependências não utilizadas
- ✅ Otimização do Dockerfile com multi-stage build
- ✅ Análise de bundle com webpack-bundle-analyzer

### 3. **Segurança e Confiabilidade**
- ✅ Tratamento de requisições com AbortController
- ✅ Prevenção de race conditions
- ✅ Tipagem forte de parâmetros de API

### 4. **Testes**
- ✅ Jest configurado e integrado
- ✅ React Testing Library instalada
- ✅ Scripts de teste adicionados

### 5. **CI/CD**
- ✅ GitHub Actions workflow para lint, build e testes
- ✅ Automação de verificação de código

## 🔍 Configuração de Linting

O projeto utiliza ESLint com extensões do Next.js:

```bash
$ yarn lint    # Executar verificação de linting
```

## 🧪 Executando Testes

```bash
$ yarn test           # Executar testes uma vez
$ yarn test:watch    # Modo watch para desenvolvimento
```

## 📝 Notas Importantes

- A aplicação utiliza Next.js App Router
- TypeScript está configurado com modo strict
- ESLint e Prettier são executados durante desenvolvimento
- Docker usa multi-stage build para otimizar tamanho da imagem
- AbortController é utilizado para cancelamento de requisições

## 📄 Licença

Este projeto está sob licença MIT - veja o arquivo LICENSE para detalhes.

