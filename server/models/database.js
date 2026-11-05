import mysql from "mysql2";
import dotenv from "dotenv";
const result = dotenv.config(); // loads the .env file

/* 
We use an sql pool instead of a connection, because a pool
stores connections. Therefore it is non blocking as it allows
for many connections to be made at the same time.
*/
const pool = mysql
  .createPool({
    // We are using environment variables so the code becomes more
    // secure and not static (which means users installing our code will only need to
    // tweak their .env file)
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// Export pool so it can be used in other files
export { pool };
