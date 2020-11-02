FROM node:12.18.3

WORKDIR /app
RUN npm install -g express-gateway
ADD package.json /app/package.json
RUN npm install
ADD . /app
EXPOSE 8081
EXPOSE 9876
ENTRYPOINT [ "./createUsers.sh" ]
