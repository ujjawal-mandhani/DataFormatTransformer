FROM node

RUN apt-get update && apt-get install \
    nodejs npm \
    -y && mkdir -p /home/upload && mkdir -p /home/upload/
RUN mkdir -p /home/upload/Volume/files/csv/ && mkdir -p /home/upload/Volume/files/json/ && mkdir -p /home/upload/Volume/files/parquet/ && mkdir -p /home/upload/Volume/files/Output/
WORKDIR /home/upload
COPY . /home/upload/
RUN npm install
CMD ["npm", "start"]

