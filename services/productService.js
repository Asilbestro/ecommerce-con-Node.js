const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generateProducts();
  }

  generateProducts() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  // metodo privado para usar desde otros métodos
  #getIndexProduct(id) {
    return this.products.findIndex(product => product.id === id);
  }

  // determina si el body viene para editar por parte parcial o completo
  // #determineUpdateMethod(id, body) {
  //   const productToEdit = this.findOne(id);

  //   const name = body.name ? body.name : productToEdit.name;
  //   const price = body.price ? body.price : productToEdit.price;
  //   const image = body.image ? body.image : productToEdit.image;

  //   return ({
  //     id: id,
  //     name: name,
  //     price: price,
  //     image: image
  //   });
  // }

  async create(body) {
    const newProducts = {
      id: faker.datatype.uuid(),
      ...body
    };
    this.products.push(newProducts);

    return newProducts;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is blocked');
    }
    return product;
  }

  async update(id, body) {
    const productToEditIndex = this.#getIndexProduct(id);

    if (productToEditIndex !== -1) {
      const oldProduct = this.products[productToEditIndex];

      // el spread operator ... lo que hace es poner todo igual a como está en el objeto
      return this.products[productToEditIndex] = {
        ...oldProduct,
        ...body
      };

    } else {
      throw boom.notFound('product not found');
    }
    // const productToEditIndex = this.#getIndexProduct(id);

    // if (productToEditIndex !== -1) {
    //   const oldProduct = this.products[productToEditIndex];

    //   this.products[productToEditIndex] = {
    //     ...oldProduct,
    //     ...body
    //   };
    //   return true;

    // } else if (productToEditIndex === -1) {
    //   throw new Error('Product not found');
    // }
  }

  async delete(id) {
    const productToDeleteIndex = this.#getIndexProduct(id);
    if (productToDeleteIndex !== -1) {
      this.products.splice(productToDeleteIndex, 1);
      return true;
    } else {
      throw boom.notFound('product not found');
    }
  }
}

module.exports = ProductsService;
