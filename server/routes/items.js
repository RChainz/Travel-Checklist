import express from "express";
import { getItems, addItem } from "../models/itemsModel.js";

// Create router object
const router = express.Router();

// GET /items route -> Get all items in the items table
router.get("/", async (req, res) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (error) {
    console.error("Error fetching items: ", error);
    res.status(500).json({ error: "failed to fetch items" });
  }
});

// POST /items route -> Add an item to the items table
router.post("/", async (req, res) => {
  try {
    const { itemname } = req.body;
    const item = await addItem(itemname);
    res.send(item);
  } catch (error) {
    console.error("Error creating item: ", error);
    res.status(500).json({ error: "failed to fetch items" });
  }
});

export default router;
