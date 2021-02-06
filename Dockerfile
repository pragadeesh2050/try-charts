# FROM node:12.7-alpine AS build
# WORKDIR /usr/src/app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build


FROM nginx:1.17.1-alpine
WORKDIR /usr/src/app
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/try-charts /usr/share/nginx/html
COPY --from=build /usr/src/app/dist/try-charts /usr/share/nginx/html
