import { isNonEmptyString } from "./common.schema.js";

export function validateProduit(data) {
  if (!data) return false;

  const {
    libelle,
    prixUnitaire,
    qteStock,
    dateExpiration,
    categorieId,
    fournisseurId,
  } = data;
  if (!isNonEmptyString(libelle)) return false;

  const prix = Number(prixUnitaire);
  if (isNaN(prix) || prix <= 0) return false;

  const qte = Number(qteStock);
  if (isNaN(qte) || qte < 0) return false;

  if (!isNonEmptyString(dateExpiration)) return false;

  const catId = Number(categorieId);
  if (isNaN(catId)) return false;

  const fourId = Number(fournisseurId);
  if (isNaN(fourId)) return false;

  return true;
  // if (!isNonEmptyString(libelle)) return false;
  // if (typeof prixUnitaire !== "number" || prixUnitaire <= 0) return false;
  // if (typeof qteStock !== "number" || qteStock < 0) return false;
  // if (!isNonEmptyString(dateExpiration)) return false;
  // if (typeof categorieId !== "number") return false;
  // if (typeof fournisseurId !== "number") return false;

  // return true;
}
