import { isNonEmptyString } from "./common.schema.js";

export function validateCategorie(libelle) {
  if (!isNonEmptyString(libelle) || libelle.trim().length < 2) {
    return false;
  }

  return true;
}