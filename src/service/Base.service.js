export class BaseService {
  constructor(repo) {
    this.repo = repo;
  }

  async getAll() {
    return this.repo.findAll();
  }

  async getById(id) {
    return this.repo.findById(id);
  }

  async delete(id) {
    return this.repo.delete(id);
  }
  async update(id, data){
    return this.repo.update(id, data);
  }
}