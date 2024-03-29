// Import the file system module
import fs from "fs";
// Import the crypto module
import crypto from "crypto";

// Class definition: UserManager
class UserManager {
  // Static users array defined as private
  // (This array will store momentarily save all the users from the file to make it easier to work with them)
  static #users = [];

  // Method to initialize the JSON file
  // (Validate if the JSON file exists)
  init() {
    // Check if the JSON file exists
    const exists = fs.existsSync(this.path);
    //console.log(exists);
    if (!exists) {
      // If the JSON file doesn't exist, we will create it automatically
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      // If the JSON file exists, read it
      UserManager.#users = JSON.parse(fs.readFileSync(this.path, "utf8"));
    }
  }

  // Constructor of the class
  constructor(path) {
    // Set the path for the JSON file
    this.path = path;
    // Initialize the JSON file
    this.init();
  }

  // Method to create a new user
  async create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Name, photo and email are required");
      } else {
        // Create a new user object
        const newUser = {
          id: crypto.randomBytes(12).toString("hex"), // Generate a random id for each new user
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        // Push the new user into the array of users
        UserManager.#users.push(newUser);
        // Write the data into the JSON file
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );
        // Print in the console the id of the new user
        console.log("User created successfully: " + newUser.id);
        // Return the new user we have just created
        return newUser;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  // Method to read all the users
  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("Not found!");
      } else {
        // Print the array of users in the console
        console.log(UserManager.#users);
        // Return the array of users
        return UserManager.#users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  // Method to read one user by id
  readOne(id) {
    try {
      // Return the user with the id passed as parameter
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

  // Method to update a user by id
  async update(id, data) {
    try {
      // Find the user with the id passed as parameter
      const userIndex = UserManager.#users.findIndex((each) => each.id === id);
      if (userIndex !== -1) {
        // Update the user data
        const updatedUser = {
          ...UserManager.#users[userIndex],
          ...data,
        };
        // Replace the user in the array
        UserManager.#users[userIndex] = updatedUser;
        // Write the data into the JSON file
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );
        // Print in the console the id of the updated user
        console.log("User updated successfully: " + updatedUser.id);
        // Return the updated user
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
      // Return the user with the id passed as parameter
      const oneUser = UserManager.#users.find((each) => each.id === id);
      if (oneUser) {
        UserManager.#users = UserManager.#users.filter(
          (each) => each.id !== id
        );
        // Write the data into the JSON file
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

// Create a new instance of the class UserManager
const newUser = new UserManager(".src/data/fs/files/users.json");

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

// Export the instance of the class UserManager
export default newUser;
