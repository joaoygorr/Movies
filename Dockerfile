# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de configuração primeiro para cache de dependências
COPY package.json yarn.lock ./

# Instalar todas as dependências
RUN yarn install --frozen-lockfile --silent

# Copiar o restante do código
COPY . ./

# Renomear o arquivo de ambiente
COPY ./.env.local ./.env

# Construir a aplicação
RUN yarn build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copiar arquivos necessários da build stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./.env

# Instalar apenas dependências de produção
RUN yarn install --frozen-lockfile --production --silent

# Expor a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "start"]
