import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove
} from "../controller/Fournisseur.controller.js";

const router = express.Router();

/**
 * @swagger
 * /fournisseurs:
 *   get:
 *     summary: Liste des fournisseurs
 *     tags: [Fournisseurs]
 *     responses:
 *       200:
 *         description: Liste des fournisseurs
 */
router.get("/", getAll);

/**
 * @swagger
 * /fournisseurs/{id}:
 *   get:
 *     summary: Récupérer un fournisseur par ID
 *     tags: [Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fournisseur trouvé
 *       404:
 *         description: Fournisseur introuvable
 */
router.get("/:id", getById);

/**
 * @swagger
 * /fournisseurs:
 *   post:
 *     summary: Créer un fournisseur
 *     tags: [Fournisseurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prenom:
 *                 type: string
 *               nom:
 *                 type: string
 *               email:
 *                 type: string
 *               adresse:
 *                 type: string
 *               telephone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fournisseur créé
 *       422:
 *         description: Données invalides
 */
router.post("/", create);

/**
 * @swagger
 * /fournisseurs/{id}:
 *   put:
 *     summary: Modifier un fournisseur
 *     tags: [Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prenom:
 *                 type: string
 *               nom:
 *                 type: string
 *               email:
 *                 type: string
 *               adresse:
 *                 type: string
 *               telephone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fournisseur modifié
 *       404:
 *         description: Fournisseur introuvable
 */
router.put("/:id", update);

/**
 * @swagger
 * /fournisseurs/{id}:
 *   delete:
 *     summary: Supprimer un fournisseur
 *     tags: [Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fournisseur supprimé
 *       404:
 *         description: Fournisseur introuvable
 */
router.delete("/:id", remove);

export default router;