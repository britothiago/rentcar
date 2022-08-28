FROM node:latest

WORKDIR /usr/appNode

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]