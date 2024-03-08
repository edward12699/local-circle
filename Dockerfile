FROM node:18

WORKDIR /app

COPY package*.json ./

# Install pm2
RUN npm install pm2 -g

RUN npm install --force

COPY . .

# CMD ["npm", "run","start","--","typegoose"]
CMD ["pm2-runtime", "start", "npm", "--", "start", "--", "typegoose"]
