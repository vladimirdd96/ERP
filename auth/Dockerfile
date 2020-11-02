FROM node:12.18.3

WORKDIR /app
ADD package.json /app/package.json
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt
ADD . /app
EXPOSE 3000
STOPSIGNAL SIGINT
CMD ["npm", "run", "start:dev"]