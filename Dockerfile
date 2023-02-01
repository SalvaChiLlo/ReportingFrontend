# STAGE 1: Build app
FROM node:lts-alpine as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install -g @angular/cli 
RUN npm install
RUN ng build

# STAGE 2: Serve app with nginx
FROM nginx:latest
COPY  --from=build /usr/local/app/dist/reporting-frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.sample.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]