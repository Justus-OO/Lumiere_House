FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Explicitly copy from the 'client' subdirectory
COPY client/package.json client/package-lock.json* client/npm-shrinkwrap.json* ./

RUN npm install --production --silent && mv node_modules ../

# Copy the rest of the client folder
COPY client/ .

EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]