import { BaseService } from "./Base.service.js";
import fournisseurRepo from "../repository/Fournisseur.repo.js";

class FournisseurService extends BaseService {
  constructor() {
    super(fournisseurRepo);
  }

  async search(term) {
    return this.repo.search(term);
  }

  async create(data) {
    const exist = await this.repo.findByTelephone(data.telephone);

    if (exist) {
      return {
        error: "ALREADY_EXISTS",
        message: "Téléphone déjà utilisé"
      };
    }

    return this.repo.create({
      ...data,
      nom: data.nom.trim()
    });
  }

  async update(id, data) {
    // règle métier : téléphone unique
    if (data.telephone) {
      const exist = await this.repo.findByTelephone(data.telephone);

      if (exist && exist.id !== id) {
        return {
          error: "ALREADY_EXISTS",
          message: "Téléphone déjà utilisé"
        };
      }
    }

    return this.repo.update(id, data);
  }
}

export default new FournisseurService();