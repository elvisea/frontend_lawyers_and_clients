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

# Define as variáveis de ambiente necessárias para o build
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SITE_NAME
ARG NEXT_PUBLIC_SITE_DESCRIPTION
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WEBSOCKET_URL

# Compila a aplicação Next.js
RUN npm run build

# Expõe a porta em que o Next.js irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação em modo de produção
CMD ["npm", "start"]
