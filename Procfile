release: knex --knexfile ./server/knexfile.js migrate:latest
release: knex --knexfile ./server/knexfile.js seed:run
api: node server/app.js
web: npm run dev
