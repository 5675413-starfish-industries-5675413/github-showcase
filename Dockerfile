FROM node:24-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends python3 ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /showcase
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN chown -R node:node /showcase
USER node
CMD ["npm", "run", "verify"]
