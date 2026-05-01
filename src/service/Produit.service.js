import { BaseService } from "./Base.service.js";
import produitRepo from "../repository/Produit.repo.js";
import categorieRepo from "../repository/Categorie.repo.js";
import fournisseurRepo from "../repository/Fournisseur.repo.js";

class ProduitService extends BaseService {
  constructor() {
    super(produitRepo);
  }

  // 🔵 CREATE PRODUIT
  async create(data) {
    // 1. vérifier catégorie existe
    const categorie = await categorieRepo.findById(data.categorieId);
    if (!categorie) {
      return {
        error: "NOT_FOUND",
        message: "Catégorie inexistante"
      };
    }

    // 2. vérifier fournisseur existe
    const fournisseur = await fournisseurRepo.findById(data.fournisseurId);
    if (!fournisseur) {
      return {
        error: "NOT_FOUND",
        message: "Fournisseur inexistant"
      };
    }

    // 3. vérifier produit existe déjà (unicité métier)
    const exist = await this.repo.findOne((p) =>
      p.libelle === data.libelle &&
      p.categorieId === data.categorieId &&
      p.fournisseurId === data.fournisseurId
    );

    // 4. si existe → on augmente le stock (logique boutique)
    if (exist) {
      return this.repo.update(exist.id, {
        qteStock: exist.qteStock + data.qteStock
      });
    }

    // 5. sinon → création
    return this.repo.create({
      libelle: data.libelle.trim(),
      prixUnitaire: data.prixUnitaire,
      qteStock: data.qteStock,
      dateExpiration: data.dateExpiration,
      categorieId: data.categorieId,
      fournisseurId: data.fournisseurId,
      image: data.image ?? null

    });
  }

  // 🟡 UPDATE PRODUIT
  async update(id, data) {
    const produit = await this.repo.findById(id);

    if (!produit) {
      return null;
    }

    // vérification catégorie
    const categorie = await categorieRepo.findById(data.categorieId);
    if (!categorie) {
      return {
        error: "NOT_FOUND",
        message: "Catégorie inexistante"
      };
    }

    // vérification fournisseur
    const fournisseur = await fournisseurRepo.findById(data.fournisseurId);
    if (!fournisseur) {
      return {
        error: "NOT_FOUND",
        message: "Fournisseur inexistant"
      };
    }

    return this.repo.update(id, {
      libelle: data.libelle,
      prixUnitaire: data.prixUnitaire,
      qteStock: data.qteStock,
      dateExpiration: data.dateExpiration,
      categorieId: data.categorieId,
      fournisseurId: data.fournisseurId,
    });
  }

  // 🔵 SEARCH PRODUIT
  async search(term) {
    return this.repo.search(term);
  }
}

export default new ProduitService();