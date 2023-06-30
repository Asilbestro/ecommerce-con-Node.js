const { faker } = require('@faker-js/faker');

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

  create(body) {
    const newProducts = {
      id: faker.datatype.uuid(),
      ...body
    };
    this.products.push(newProducts);

    return newProducts;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(item => item.id === id);
  }

  update(id, body) {
    const productToEditIndex = this.#getIndexProduct(id);

    if (productToEditIndex !== -1) {
      // const productToEdit = this.#determineUpdateMethod(id, body);

      // this.products[productToEditIndex] = {
      //   id: productToEdit.id,
      //   name: productToEdit.name,
      //   price: productToEdit.price,
      //   image: productToEdit.image
      // };

      const oldProduct = this.products[productToEditIndex];

      // el spread operator ... lo que hace es poner todo igual a como está en el objeto
      this.products[productToEditIndex] = {
        ...oldProduct,
        ...body
      };
      return true;
    }
    return false;
  }

  delete(id) {
    const productToDeleteIndex = this.#getIndexProduct(id);
    if (productToDeleteIndex !== -1) {
      this.products.splice(productToDeleteIndex, 1);
      return true;
    }
    return false;
  }
}

module.exports = ProductsService;
