# Usa a imagem oficial do Node.js
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos essenciais primeiro para aproveitar cache do Docker
COPY package.json package-lock.json ./

# Instala TODAS as dependências, incluindo as de desenvolvimento
RUN npm install

# Copia todo o código-fonte para o container
COPY . .

# Expõe a porta correta
EXPOSE 3001

# Comando para rodar em desenvolvimento
CMD ["npm", "run", "dev", "--", "-p", "3001"]
