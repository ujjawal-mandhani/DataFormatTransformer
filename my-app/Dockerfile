FROM node

RUN apt-get update && apt-get install \
    nodejs npm \
    -y && mkdir -p /home/app && mkdir -p /home/app/code

WORKDIR /home/app
COPY . /home/app/
RUN chown -R node /home/app
USER node
RUN npm install

USER node
CMD ["npm", "start"]

