import { isNonEmptyString, isInt } from "./common.schema.js";

export function validateProduit(data) {

  const { libelle, prixUnitaire, qteStock } = data;

  if (!isNonEmptyString(libelle)) return false;

  if (typeof prixUnitaire !== "number" || prixUnitaire <= 0) {
    return false;
  }

  if (!isInt(qteStock) || qteStock < 0) {
    return false;
  }

  return true;
}