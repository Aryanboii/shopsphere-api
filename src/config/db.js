const { Pool } = require("pg");
const env = require("./env");

const pool = new Pool({
    host: env.db.host,
    port: env.db.port,
    database: env.db.name,
    user: env.db.user,
    password: env.db.password,
});

const connectDB = async () => {
    try {
        const client = await pool.connect();

        const result = await client.query("SELECT NOW()");

        console.log("PostgreSQL connected successfully");
        console.log("Database time:", result.rows[0].now);

        client.release();
    } catch (error) {
        console.error("PostgreSQL connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = {
    pool,
    connectDB,
};