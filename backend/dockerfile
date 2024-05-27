# Etapa de construção
FROM node:14 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

# Etapa de execução
FROM node:14

WORKDIR /app

COPY --from=build /app /app

RUN npm install --production

CMD ["npm", "start"]

