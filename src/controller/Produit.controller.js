import produitService from "../service/Produit.service.js";
import { error, isInt } from "../validation/common.schema.js";
import { validateProduit } from "../validation/produit.schema.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


// GET ALL
export const getAll = async (req, res) => {
  const result = await produitService.search(req.query.search);
  res.json(result);
};

// GET BY ID
export const getById = async (req, res) => {
  const id = Number(req.params.id);

  if (!isInt(id))
    return error(res, 400, "BAD_REQUEST", "id invalide");

  const result = await produitService.getById(id);

  if (!result)
    return error(res, 404, "NOT_FOUND", "Produit introuvable");

  res.json(result);
};

// CREATE

export const create = async (req, res) => {
  const data = {
    ...req.body,
    prixUnitaire: Number(req.body.prixUnitaire),
    qteStock: Number(req.body.qteStock),
    categorieId: Number(req.body.categorieId),
    fournisseurId: Number(req.body.fournisseurId),
  };

  if (!validateProduit(data))
    return error(res, 422, "VALIDATION_ERROR", "données invalides");

  let imageUrl = null;

  if (req.file) {
    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "produits" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await uploadFromBuffer();
    imageUrl = result.secure_url;
  }

  const produit = await produitService.create({
    ...data,
    image: imageUrl
  });

  res.status(201).json(produit);
};

// UPDATE

export const update = async (req, res) => {
  const id = Number(req.params.id);

  if (!isInt(id))
    return error(res, 400, "BAD_REQUEST", "id invalide");

  const data = {
    ...req.body,
    prixUnitaire: Number(req.body.prixUnitaire),
    qteStock: Number(req.body.qteStock),
    categorieId: Number(req.body.categorieId),
    fournisseurId: Number(req.body.fournisseurId),
  };

  if (!validateProduit(data))
    return error(res, 422, "VALIDATION_ERROR", "données invalides");

  let imageUrl = null;

  // 🔥 UPLOAD IMAGE SI NOUVELLE IMAGE FOURNIE
  if (req.file) {
    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "produits" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await uploadFromBuffer();
    imageUrl = result.secure_url;
  }

  // 🔥 ENVOI AU SERVICE
  const result = await produitService.update(id, {
    ...data,
    ...(imageUrl && { image: imageUrl }) // ajoute image seulement si elle existe
  });

  if (!result)
    return error(res, 404, "NOT_FOUND", "Produit introuvable");

  res.json({ message: "Produit mis à jour avec succès" });
};

// DELETE
export const remove = async (req, res) => {
  const id = Number(req.params.id);

  if (!isInt(id))
    return error(res, 400, "BAD_REQUEST", "id invalide");

  const result = await produitService.delete(id);

  if (!result)
    return error(res, 404, "NOT_FOUND", "Produit introuvable");

  res.json({ message: "Produit supprimé avec succès" });
};