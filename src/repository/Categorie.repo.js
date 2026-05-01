import { BaseRepo } from "./Base.repo.js";

class CategorieRepo extends BaseRepo {
  constructor() {
    super("categories");
  }

  async findByLibelle(libelle) {
    return this.findOne(
      (c) => c.libelle.toLowerCase() === libelle.trim().toLowerCase()
    );
  }

  async search(term) {
    const all = await this.findAll();
    if (!term) return all;
    return all.filter((c) =>
      c.libelle.toLowerCase().includes(term.trim().toLowerCase())
    );
  }
}

export default new CategorieRepo();