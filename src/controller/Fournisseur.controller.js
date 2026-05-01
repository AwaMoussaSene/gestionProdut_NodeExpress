import fournisseurService from "../service/Fournisseur.service.js";
import { error, isInt } from "../validation/common.schema.js";
import { validateFournisseur } from "../validation/fournisseur.schema.js";

// GET ALL
export const getAll = async (req, res) => {
  const result = await fournisseurService.search(req.query.search);
  res.json(result);
};

// GET BY ID
export const getById = async (req, res) => {
  const id = Number(req.params.id);

  if (!isInt(id))
    return error(res, 400, "BAD_REQUEST", "id invalide");

  const f = await fournisseurService.getById(id);

  if (!f)
    return error(res, 404, "NOT_FOUND", "Fournisseur introuvable");

  res.json(f);
};

// CREATE
export const create = async (req, res) => {
  const data = req.body;

  if (!validateFournisseur(data))
    return error(res, 422, "VALIDATION_ERROR", "données invalides");

  const result = await fournisseurService.create(data);

  if (result?.error)
    return error(res, 409, result.error, result.message);

  res.status(201).json(result);
};

// UPDATE
export const update = async (req, res) => {
  const id = Number(req.params.id);

  if (!isInt(id))
    return error(res, 400, "BAD_REQUEST", "id invalide");

  const data = req.body;

  if (!validateFournisseur(data))
    return error(res, 422, "VALIDATION_ERROR", "données invalides");

  const updated = await fournisseurService.update(id, data);

  if (updated?.error)
    return error(res, 409, updated.error, updated.message);

  if (!updated)
    return error(res, 404, "NOT_FOUND", "Fournisseur introuvable");

  res.json({ message: "Fournisseur mis à jour avec succès" });
};

// DELETE
export const remove = async (req, res) => {
  const id = Number(req.params.id);

  if (!isInt(id))
    return error(res, 400, "BAD_REQUEST", "id invalide");

  const deleted = await fournisseurService.delete(id);

  if (!deleted)
    return error(res, 404, "NOT_FOUND", "Fournisseur introuvable");

  res.json({ message: "Fournisseur supprimé avec succès" });
};