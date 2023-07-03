const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

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
        description: faker.lorem.sentence(),
        isBlock: faker.datatype.boolean()
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

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 5000);
    });
  }

  async findOne(id) {
    const categories = this.categories.find(item => item.id === id);
    if (!categories) {
      throw boom.notFound('category not found');
    }
    if (categories.isBlock) {
      throw boom.conflict('category is blocked');
    }
    return categories;
  }

  async update(id, body) {
    const categoryToEditIndex = this.#getIndexCategory(id);

    if (categoryToEditIndex !== -1) {
      const oldCategory = this.categories[categoryToEditIndex];

      // el spread operator ... lo que hace es poner todo igual a como está en el objeto
      this.categories[categoryToEditIndex] = {
        ...oldCategory,
        ...body
      };
      return true;
    } else {
      throw boom.notFound('category not found');
    }
  }

  async delete(id) {
    const categoryToDeleteIndex = this.#getIndexCategory(id);
    if (categoryToDeleteIndex !== -1) {
      this.categories.splice(categoryToDeleteIndex, 1);
      return true;
    } else {
      throw boom.notFound('category not found');
    }
  }
}

module.exports = CategoriesService;
