# Etapa 1: Construção
FROM node:18-alpine AS build

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:stable-alpine

# Copiar os arquivos construídos da etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta que o Nginx usará
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
