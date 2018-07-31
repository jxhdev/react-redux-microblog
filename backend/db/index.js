const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://localhost/rr-microblog-db'
});

client.connect();

module.exports = client;
