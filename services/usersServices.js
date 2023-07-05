const { faker } = require('@faker-js/faker');

const boom = require('@hapi/boom');

const pool = require('../libs/postgresPool');


class UsersService {

  constructor() {
    this.users = [];
    this.generateUsers();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generateUsers() {
    // si existe size, el valor de limit es size, y si no existe el valor es 10
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid,
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        username: faker.internet.userName()
      });
    }
  }

  // metodo privado para usar desde otros métodos
  #getIndexUser(id) {
    return this.users.findIndex(user => user.id === id);
  }

  create(body) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...body
    };
    this.users.push(newUser);

    return newUser;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const response = await this.pool.query(query);
    return response.rows;
  }


  async findOne(id) {
    const user = this.users.find(item => item.id === id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, body) {
    const userToEditIndex = this.#getIndexUser(id);

    if (userToEditIndex !== -1) {
      const oldUser = this.users[userToEditIndex];

      // el spread operator ... lo que hace es poner todo igual a como está en el objeto
      this.users[userToEditIndex] = {
        ...oldUser,
        ...body
      };
      return true;
    } else {
      throw boom.notFound('user not found');
    }
  }

  async delete(id) {
    const userToDeleteIndex = this.#getIndexUser(id);
    if (userToDeleteIndex !== -1) {
      this.users.splice(userToDeleteIndex, 1);
      return true;
    } else {
      throw boom.notFound('user not found');
    }
  }
}

module.exports = UsersService;
