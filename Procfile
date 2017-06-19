release: knex --knexfile ./server/knexfile.js migrate:latest
release: knex --knexfile ./server/knexfile.js seed:run
web: npm run dev
api: node server/app.js
