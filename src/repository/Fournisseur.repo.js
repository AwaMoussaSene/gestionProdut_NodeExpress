import { BaseRepo } from "./Base.repo.js";

class FournisseurRepo extends BaseRepo {
  constructor() {
    super("fournisseurs");
  }

  async findByTelephone(telephone) {
    const db = await this._db();

    return db[this.collection].find(
      (f) => f.telephone === telephone
    ) ?? null;
  }

//   async search(term) {
//     const db = await this._db();

//     if (!term) return db[this.collection];

//     return db[this.collection].filter((f) =>
//       f.nom.toLowerCase().includes(term.toLowerCase()) ||
//       f.telephone.includes(term)
//     );
//   }

async search(term) {
  const db = await this._db();

  const data = db[this.collection];

  if (!term || term.trim() === "") {
    return data;
  }

  const t = term.toLowerCase();

  return data.filter((f) =>
    (f.nom && f.nom.toLowerCase().includes(t)) ||
    (f.prenom && f.prenom.toLowerCase().includes(t)) ||
    (f.email && f.email.toLowerCase().includes(t)) ||
    (f.telephone && f.telephone.includes(t))
  );
}
}

export default new FournisseurRepo();