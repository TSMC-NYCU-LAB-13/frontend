FROM node:16.15 as builder
ARG VUE_APP_BASEURL
ENV VUE_APP_BASEURL=$VUE_APP_BASEURL
ENV NODE_ENV=build
WORKDIR /usr/src/app
COPY . .
RUN npm install --legacy-peer-deps
# RUN npm install @popperjs/core --legacy-peer-deps
RUN npm run build 
RUN chown -R node /usr/src/app
# USER node

FROM nginx:1.21-alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
# USER nginx
CMD ["nginx", "-g", "daemon off;"]