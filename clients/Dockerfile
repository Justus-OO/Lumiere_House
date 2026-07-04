# Stage 1: Build the application
FROM node:lts-alpine AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
# This generates the .next directory
RUN npm run build

# Stage 2: Production runtime
FROM node:lts-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/public ./public

EXPOSE 3000
USER node
CMD ["npm", "start"]