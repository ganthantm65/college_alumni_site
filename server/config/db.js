import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "griffin@2006",
    database: "college"
});

export default db;
