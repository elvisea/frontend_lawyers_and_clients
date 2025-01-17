# Etapa de construção (Build)
FROM node:18 AS builder

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto
COPY . .

# Compila a aplicação Next.js
RUN npm run build

# Etapa de produção (Production)
FROM node:18 AS production

# Define o diretório de trabalho no container
WORKDIR /app

# Copia as dependências do projeto da etapa de construção
COPY --from=builder /app/node_modules ./node_modules

# Copia os arquivos necessários para a produção
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expõe a porta em que o Next.js irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação em modo de produção
CMD ["npm", "start"]
