FROM node:8-alpine

RUN npm install -g bloomsky-prometheus-exporter

EXPOSE 9262

CMD ["bloomsky-exporter", "/mnt/bloomsky.yml", "-p", "9262"]
