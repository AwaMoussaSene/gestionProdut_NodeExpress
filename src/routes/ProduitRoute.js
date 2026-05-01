import { Router } from "express";
import {
  create,
  getAll,
  getById,
  update,
  remove
} from "../controller/Produit.controller.js";
import upload from "../middleware/upload.js";

const router = Router();

/**
 * @swagger
 * /produits:
 *   get:
 *     summary: Liste tous les produits
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: Liste des produits
 */
router.get("/", getAll);

/**
 * @swagger
 * /produits/{id}:
 *   get:
 *     summary: Récupérer un produit par ID
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit trouvé
 *       404:
 *         description: Produit introuvable
 */
router.get("/:id", getById);

/**
 * @swagger
 * /produits:
 *   post:
 *     summary: Créer un produit avec image
 *     tags: [Produits]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *               prixUnitaire:
 *                 type: number
 *               qteStock:
 *                 type: number
 *               dateExpiration:
 *                 type: string
 *               categorieId:
 *                 type: integer
 *               fournisseurId:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 */
router.post("/", upload.single("image"), create);

/**
 * @swagger
 * /produits/{id}:
 *   put:
 *     summary: Modifier un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *               prixUnitaire:
 *                 type: number
 *               qteStock:
 *                 type: number
 *               dateExpiration:
 *                 type: string
 *               categorieId:
 *                 type: integer
 *               fournisseurId:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Produit modifié
 *       404:
 *         description: Produit introuvable
 */
router.put("/:id",upload.single("image"), update);

/**
 * @swagger
 * /produits/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produit supprimé
 *       404:
 *         description: Produit introuvable
 */
router.delete("/:id", remove);

export default router;