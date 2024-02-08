import fs from "fs";
import crypto from "crypto";

class UserManager {
  static #users = [];
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      UserManager.#users = JSON.parse(fs.readFileSync(this.path, "utf8"));
    }
  }
  constructor(path) {
    this.path = path;
    this.init();
  }
  async create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Name, photo and email are required");
      } else {
        const newUser = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        UserManager.#users.push(newUser);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );
        console.log("User created successfully: " + newUser.id);
        return newUser;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("Not found!");
      } else {
        console.log(UserManager.#users);
        return UserManager.#users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readOne(id) {
    try {
      const oneUser = UserManager.#users.find((each) => each.id === id);
      if (oneUser) {
        console.log(oneUser);
        return oneUser;
      } else {
        throw new Error("Not found!");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async update(id, data) {
    try {
      const userIndex = UserManager.#users.findIndex((each) => each.id === id);
      if (userIndex !== -1) {
        const updatedUser = {
          ...UserManager.#users[userIndex],
          ...data,
        };
        UserManager.#users[userIndex] = updatedUser;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );
        console.log("User updated successfully: " + updatedUser.id);
        return updatedUser;
      } else {
        throw new Error("User not found!");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const oneUser = UserManager.#users.find((each) => each.id === id);
      if (oneUser) {
        UserManager.#users = UserManager.#users.filter(
          (each) => each.id !== id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );
        console.log("User deleted successfully: " + id);
        return id;
      } else {
        throw new Error("There is no user to delete with ID: " + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const newUser = new UserManager("./src/data/fs/files/users.json");

/*
// Create two new users
const user1 = newUser.create({
  name: "Armando",
  photo: "./ruta/a/la/imagen.jpg",
  email: "hola@kaze.com",
});
const user2 = newUser.create({
  name: "Leandro",
  photo: "./ruta/a/la/imagen1.jpg",
  email: "soy@superman.com",
});

// Print the users array
newUser.read();

// Print one user by id
newUser.readOne();

// Delete one user by id
newUser.destroy();
*/

export default newUser;
