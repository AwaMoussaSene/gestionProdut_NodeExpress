import categorieService from "../service/Categorie.service.js";
import { validateCategorie } from "../validation/categorie.schema.js";
import { error, isInt } from "../validation/common.schema.js";

// getAll
export const getAll = async (req, res) => {
  const result = await categorieService.search(req.query.search);
  res.json(result);
};

// getById
export const getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!isInt(id)) return error(res, 400, "BAD_REQUEST", "id invalide");

  const cat = await categorieService.getById(id);
  if (!cat) return error(res, 404, "NOT_FOUND", "Catégorie introuvable");

  res.json(cat);
};

// create
export const create = async (req, res) => {
  const { libelle } = req.body;
  if (!validateCategorie(libelle))
    return error(res, 422, "VALIDATION_ERROR", "libelle invalide");

  const result = await categorieService.create(libelle);
  if (result?.error)
    return error(res, 409, result.error, result.message);

  res.status(201).json(result);
};

// update
export const update = async (req, res) => {
  const id = Number(req.params.id);

  if (!isInt(id)) 
    return error(res, 400, "BAD_REQUEST", "id invalide");

  const { libelle } = req.body; // ✅ récupérer libelle

  if (!validateCategorie(libelle))
    return error(res, 422, "VALIDATION_ERROR", "libelle invalide");

  const edited = await categorieService.update(id, {libelle});

  if (!edited) 
    return error(res, 404, "NOT_FOUND", "Catégorie introuvable");

  res.json({ message: "Categorie a ete mise a jour avec succes" });
};

// remove
export const remove = async (req, res) => {
  const id = Number(req.params.id);
  if (!isInt(id)) return error(res, 400, "BAD_REQUEST", "id invalide");

  const deleted = await categorieService.delete(id);
  if (!deleted) return error(res, 404, "NOT_FOUND", "Catégorie introuvable");

  res.json({ message: "Catégorie supprimée avec succès" });
};

