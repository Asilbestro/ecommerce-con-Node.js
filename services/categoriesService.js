const { faker } = require('@faker-js/faker');

class CategoriesService {

  constructor() {
    this.categories = [];
    this.generateCategories();
  }

  generateCategories() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
        description: faker.lorem.sentence()
      });
    }
  }

  // metodo privado para usar desde otros métodos
  #getIndexCategory(id) {
    return this.categories.findIndex(user => user.id === id);
  }

  create(body) {
    const newCategories = {
      id: faker.datatype.uuid(),
      ...body
    };
    this.categories.push(newCategories);

    return newCategories;
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find(item => item.id === id);
  }

  update(id, body) {
    const categoryToEditIndex = this.#getIndexCategory(id);

    if (categoryToEditIndex !== -1) {
      const oldCategory = this.categories[categoryToEditIndex];

      // el spread operator ... lo que hace es poner todo igual a como está en el objeto
      this.categories[categoryToEditIndex] = {
        ...oldCategory,
        ...body
      };
      return true;
    }
    return false;
  }

  delete(id) {
    const categoryToDeleteIndex = this.#getIndexCategory(id);
    if (categoryToDeleteIndex !== -1) {
      this.categories.splice(categoryToDeleteIndex, 1);
      return true;
    }
    return false;
  }
}

module.exports = CategoriesService;
