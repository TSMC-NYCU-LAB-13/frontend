FROM node:16.15-alpine as builder
ARG VUE_APP_BASEURL
ENV NODE_ENV=production
ENV VUE_APP_BASEURL=$VUE_APP_BASEURL
WORKDIR /usr/src/app
COPY ["package.json", "package-nnlock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --include=dev --legacy-peer-deps && mv node_modules ../
COPY . .
RUN npm run build
RUN chown -R node /usr/src/app
# USER node

FROM nginx:1.21-alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
USER nginx
CMD ["nginx", "-g", "daemon off;"]