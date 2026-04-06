import { isNonEmptyString } from "./common.schema.js";

export function validateFournisseur(data) {
  const { prenom, nom, email, adresse, telephone } = data;

  if (!isNonEmptyString(prenom)) return false;
  if (!isNonEmptyString(nom)) return false;
  if (!isNonEmptyString(email)) return false;
  if (!isNonEmptyString(adresse)) return false;
  if (!isNonEmptyString(telephone)) return false;

  return true;
}
