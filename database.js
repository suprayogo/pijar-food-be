const postgres = require("postgres");
const sql = postgres({
    host: "localhost",
    port: 5432,
    database: "foodpijar",
    username: "postgres",
    password: "admin"

});

module.exports = sql;