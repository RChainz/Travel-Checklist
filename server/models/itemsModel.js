import { pool } from "./database.js";

// Export functions that handle the database
export async function getItems() {
  const [result] = await pool.query("SELECT * FROM items");
  return result;
}

export async function addItem(itemname) {
  const [result] = await pool.query(
    "INSERT INTO items (ITEMNAME, ISACQUIRED) VALUES (?,0)",
    [itemname],
  );
  return result;
}
