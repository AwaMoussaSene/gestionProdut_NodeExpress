import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

app.use(routes);

app.use((req, res) => {
  res.status(404).json({ message: "Route inconnue" });
});

app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});