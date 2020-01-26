FROM node:10

# Bundle APP files
COPY src src/

COPY package*.json ./

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Show current folder structure in logs
RUN ls -al -R

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "production" ]