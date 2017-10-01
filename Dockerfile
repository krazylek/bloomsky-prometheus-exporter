FROM node:8-alpine

RUN apk add --no-cache git
COPY . /exporter
WORKDIR /exporter
RUN npm install --production && npm cache clean --force

EXPOSE 9262

CMD ["npm", "start", "/mnt/bloomsky.yml", "-p", "9262"]
