export function validateFournisseur(data) {
  if (!data) return false;

  let { prenom, nom, email, adresse, telephone } = data;

  prenom = String(prenom || "").trim();
  nom = String(nom || "").trim();
  email = String(email || "").trim();
  adresse = String(adresse || "").trim();
  telephone = String(telephone || "").trim();

  // PRENOM
  if (prenom.length < 2) return false;

  //  NOM
  if (nom.length < 2) return false;

  //  EMAIL (regex propre)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;

  //  ADRESSE
  if (adresse.length < 3) return false;

  //  TELEPHONE (accepte chiffres + format simple)
  const telRegex = /^[0-9]{6,15}$/;
  if (!telRegex.test(telephone)) return false;

  return true;
}