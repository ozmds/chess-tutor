FROM node:13
WORKDIR /app
COPY ./minymal-chess/package*.json /app/
RUN npm install
COPY ./minymal-chess/ /app/
CMD npm start