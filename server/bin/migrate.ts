import "dotenv/config";

import fs from "node:fs";
import path from "node:path";

import mysql from "mysql2/promise";

const schema = path.join(__dirname, "../../server/database/schema.sql");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const migrate = async () => {
  let database: mysql.Connection | null = null;

  try {
    if (!DB_HOST || !DB_USER || !DB_NAME) {
      throw new Error(
        "Missing required env vars. Please set DB_HOST, DB_USER, DB_NAME in your .env",
      );
    }

    const sql = fs.readFileSync(schema, "utf8");

    const port = DB_PORT ? Number(DB_PORT) : undefined;

    database = await mysql.createConnection({
      host: DB_HOST,
      port,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    });

    const dbName = mysql.escapeId(DB_NAME);

    await database.query(`DROP DATABASE IF EXISTS ${dbName}`);

    await database.query(`CREATE DATABASE ${dbName}`);

    await database.query(`USE ${dbName}`);

    await database.query(sql);

    console.info(`${DB_NAME} updated from '${path.normalize(schema)}' 🆙`);
  } catch (err) {
    const { message, stack } = err as Error;
    console.error("Error updating the database:", message);
    if (stack) console.error(stack);
  } finally {
    if (database) {
      await database.end();
    }
  }
};

migrate();
