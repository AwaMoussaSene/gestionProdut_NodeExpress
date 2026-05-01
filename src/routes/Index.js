import express from "express";

import categorieRoutes from "./CategorieRoute.js";
import fournisseurRoutes from "./FournisseurRoute.js";
import produitRoutes from "./ProduitRoute.js";

const router = express.Router();

router.use("/categories", categorieRoutes);
router.use("/fournisseurs", fournisseurRoutes);
router.use("/produits", produitRoutes);

export default router;