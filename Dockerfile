FROM node:24-alpine

WORKDIR /app

COPY package.json ./
COPY server.js database.js index.html github_repos.json ./
COPY css ./css
COPY js ./js
COPY img ./img

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
