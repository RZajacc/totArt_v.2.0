FROM node

WORKDIR /app

COPY package.json .

# For linux users
RUN apt-get update && apt-get install -y libvips

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]