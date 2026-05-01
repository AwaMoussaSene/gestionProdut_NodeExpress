import { BaseRepo } from "./Base.repo.js";

class ProduitRepo extends BaseRepo {
  constructor() {
    super("produits");
  }

  async search(term) {
    const db = await this._db();

    if (!term) return db[this.collection];

    const t = term.toLowerCase();

    return db[this.collection].filter((p) =>
      p.libelle.toLowerCase().includes(t)
    );
  }
}

export default new ProduitRepo();