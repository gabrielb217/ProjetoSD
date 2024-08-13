# Use a imagem base do Node.js
FROM node:latest

# Crie e defina o diretório de trabalho
WORKDIR /node_server

# Instale dependências necessárias para a criação de gráficos
RUN apt-get update && apt-get install -y \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev

# Copie os arquivos de dependências
COPY package*.json ./

# Instale todas as dependências do projeto
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Define uma variável de ambiente, nesse caso a porta
# Fazendo isso podemos ler o valor da porta no nosso arquivo app.js utilizando process.env.PORT
ENV PORT=4000

# Exponha a porta que o servidor usará
EXPOSE $PORT

# Comando para iniciar o servidor
CMD ["node", "./src/server.js"]