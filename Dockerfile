FROM node:lts-alpine
RUN npm install -g pnpm
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "pnpm-lock.yaml*", "./"]
RUN pnpm install && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["sh", "-c", "pnpm build && pnpm start"]
