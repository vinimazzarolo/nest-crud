FROM node:16-alpine3.15

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

RUN chown -R node /app/node_modules
USER node

EXPOSE 3000
CMD ["npm", "run", "start:dev"]