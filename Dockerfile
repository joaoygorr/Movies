FROM node:20-alpine

WORKDIR /app

# Copiar apenas os arquivos de configuração primeiro para fazer cache das dependências
COPY package.json yarn.lock ./

# Instalar apenas as dependências necessárias para produção
RUN yarn install --frozen-lockfile --silent

# Copiar o restante do código
COPY . .

# Copiar e renomear o arquivo de ambiente
COPY ./.env.local ./.env

# Construir a aplicação (se necessário)
RUN yarn build

# PORT
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "start"]

