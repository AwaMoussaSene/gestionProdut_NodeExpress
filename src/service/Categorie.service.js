import { BaseService } from "./Base.service.js";
import categorieRepo from "../repository/Categorie.repo.js";

class CategorieService extends BaseService {
  constructor() {
    super(categorieRepo);
  }

  async search(term) {
    return this.repo.search(term);
  }

  async create(libelle) {
    const exists = await this.repo.findByLibelle(libelle);
    if (exists) return { error: "ALREADY_EXISTS", message: "Catégorie déjà existante" };

    return this.repo.create({ libelle: libelle.trim() });
  }

//   async create(data) {
//   const exists = await this.repo.findByLibelle(data.libelle);

//   if (exists) {
//     return { error: "ALREADY_EXISTS", message: "Catégorie déjà existante" };
//   }

//   return this.repo.create({
//     ...data,
//     libelle: data.libelle.trim()
//   });
// }
}

export default new CategorieService();