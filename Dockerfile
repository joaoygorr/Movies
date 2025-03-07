FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de configuração primeiro para cache de dependências
COPY package.json yarn.lock ./

# Instalar dependências de produção
RUN yarn install --frozen-lockfile --production --silent

# Copiar o restante do código, exceto arquivos desnecessários
COPY . ./

# Renomear o arquivo de ambiente
COPY ./.env.local ./.env

# Construir a aplicação
RUN yarn build

# Expor a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "start"]
