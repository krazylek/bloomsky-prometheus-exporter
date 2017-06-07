FROM node:8-alpine

RUN npm install -g bloomsky-prometheus-exporter

EXPOSE 9099

CMD ["bloomsky-exporter", "/mnt/bloomsky.yml", "-p", "9099"]
