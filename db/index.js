const { Client } = require("pg")
const dbuser = 'postgres'
const dbpass = 'pass'
const port = process.env.PORT|5432

//const client = new Client({ port: port, host: 'localhost', user: dbuser, password: dbpass, database: "imagequiz" });
const client = new Client({ connectionString: process.env.DATABASE_URL})
module.exports = client;
