FROM node:20-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app
COPY package-lock.json /app
RUN npm ci
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start"]
