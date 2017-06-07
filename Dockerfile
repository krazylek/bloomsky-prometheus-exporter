FROM node:8-alpine
RUN apk update && \
  apk add --no-cache git

RUN npm install -g https://github.com/krazylek/bloomsky-prometheus-exporter

EXPOSE 9099

CMD ["bloomsky-exporter", "/mnt/bloomsky.yml", "-p", "9099"]
