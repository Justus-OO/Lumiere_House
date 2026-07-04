FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Since the build context IS the 'client' folder, 
# you copy from the current directory (./)
COPY package.json package-lock.json* npm-shrinkwrap.json* ./

RUN npm install --production --silent && mv node_modules ../

# Copy everything from the current folder (client) to the workdir
COPY . .

EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]