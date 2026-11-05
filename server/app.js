// Import via ES Modules (which we are currently using)
import cors from "cors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import productsRouter from "./routes/items.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));

// ------- Middleware -------
// --------------------------
// What is cors (cross-origin resource sharing)?
// basically it is an HTTP-header based mechanism that allows a server to indicate any origins
// (domain, scheme, or port) other than its own from which a browser should permit loading resources
// --------------------------
// this means that this server will send in its requests a header saying that it allows requestes coming from the local host address
app.use(cors({ origin: ["http://localhost:5500", "http://127.0.0.1:5500"] }));
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
app.use(express.json()); // This line is here because we are handling json requests

// Route registration
app.use("/items", productsRouter);

// Start the server
app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
