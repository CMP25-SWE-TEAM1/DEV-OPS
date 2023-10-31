FROM node:18 as base



FROM base as development

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT=5500

EXPOSE ${PORT}

CMD ["npm","run","start-dev"]

FROM base as production

WORKDIR /app

COPY package.json .

RUN npm install --only=production

COPY . .

ENV PORT=5500

EXPOSE ${PORT}

CMD ["npm","run","start"]
