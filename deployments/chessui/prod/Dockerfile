FROM node:13 as build-stage
WORKDIR /app
COPY ./minymal-chess/package*.json /app/
RUN npm install
COPY ./minymal-chess/ /app/
RUN npm run build

FROM nginx:1.15.2-alpine
COPY --from=build-stage /app/build/ /var/www/
COPY deployments/chessui/prod/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]