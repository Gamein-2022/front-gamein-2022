# pull official base image
FROM node:latest AS build

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
RUN npm install 

# add & build app
COPY . ./
RUN npm run build

# serve app
FROM nginx:latest
COPY ./default.conf /etc/nginx/conf.d/
COPY --from=build /app/build /usr/share/nginx/html
