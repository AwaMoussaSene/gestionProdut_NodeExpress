import express from "express";
import routes from "./src/routes/Index.js";
import setupSwagger from "./src/config/swagger.js";


const app = express();

app.use(express.json());

setupSwagger(app);

app.use(routes);

app.use((req, res) => {
  res.status(404).json({ message: "Route inconnue" });
});

app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});