FROM node:18-alpine as builder

WORKDIR /user/app

COPY . .

RUN npm install
RUN npm run build

FROM node:18-alpine

WORKDIR /user/app

LABEL App Name="Personal Website"
LABEL Author="Mathius"

ENV SERVICE_APP_PORT=8080

COPY --from=builder ./user/app/dist ./dist
COPY --from=builder ./user/app/package.json ./package.json
COPY --from=builder ./user/app/prisma ./prisma

RUN npm install --production

EXPOSE ${SERVICE_APP_PORT}/tcp

CMD npm run start:docker