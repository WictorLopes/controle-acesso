# 1. Imagem base com Node 18
FROM node:18-alpine

# 2. Diretório de trabalho
WORKDIR /usr/src/app

# 3. Copiar package.json e package-lock.json
COPY package*.json ./

# 4. Instalar dependências
RUN npm install --legacy-peer-deps

# 5. Copiar todo o código
COPY . .

# 6. Build da aplicação (NestJS)
RUN npm run build

# 7. Expor a porta que a API vai rodar
EXPOSE 3000

# 8. Comando para rodar a API
CMD ["node", "dist/main.js"]
