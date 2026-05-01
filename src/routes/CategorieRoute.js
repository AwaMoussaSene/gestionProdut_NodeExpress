import { Router } from "express";
import { getAll, getById, create, remove , update} from "../controller/Categorie.controller.js";

const router = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Liste des catégories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", getAll);
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Récupérer une catégorie par ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Catégorie introuvable
 */
router.get("/:id", getById);
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Créer une catégorie
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *     responses:
 *       201:
 *         description: Créé
 */
router.post("/", create);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Modifier une catégorie
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Modifié
 */
router.put("/:id", update);
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Supprimer une catégorie
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Supprimé
 */
router.delete("/:id", remove);


export default router;