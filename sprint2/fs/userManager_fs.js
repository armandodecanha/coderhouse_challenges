const fs = require("fs");

// Class definition: UserManager
class UserManager {
    // Static users array defined as private
    static #users = [];
    // Static counter defined as private for the users id
    static #idCounter = 0;

    // Method to initialize the JSON file
    init() {
        // Check if the JSON file exists
        const exists = fs.existsSync(this.path);
        console.log(exists);
        if (!exists) {
            // If the JSON file doesn't exist, create it
            const data = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, data);
        } else {
            // If the JSON file exists, read it
            const all = JSON.parse(fs.readFileSync(this.path, 'utf8'));
            console.log(all);
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
    create(data) {
        // Create a new user object
        const newUser = {
            id: UserManager.#idCounter++, // Increment the id counter for each new user
            name: data.name,
            photo: data.photo,
            email: data.email,
        };
        // Push the new user into the array of users
        UserManager.#users.push(newUser);
        // Defining the path and data for the JSON file
        const jsonData = JSON.stringify(UserManager.#users, null, 2);
        // Write the data to the JSON file
        fs.writeFileSync(this.path, jsonData);
        // Return the new user
        return newUser;
    }

    // Method to read all the users
    read() {
    // Read the users from the JSON file
    const jsonData = fs.readFileSync(this.path, 'utf8');
    // Convert the JSON string into an array of users
    UserManager.#users = jsonData ? JSON.parse(jsonData) : [];
    // Return the array of users
    return UserManager.#users;
    }

    // Method to read one user by id
    readOne(id) {
        // Update the array of users with the data from the JSON file
        this.read();
        // Return the user with the id passed as parameter
        return UserManager.#users.find(each => each.id === Number(id));
    }
}

// Create a new instance of the class UserManager
const newUser = new UserManager("./files/users.json");

// Create two new users
const user1 = newUser.create({name: 'Armando', photo: '/ruta/a/la/imagen.jpg', email: 'hola@kaze.com'});
const user2 = newUser.create({name: 'Leandro', photo: '/ruta/a/la/imagen1.jpg', email: 'soy@superman.com'});

// Print the users array
console.log(newUser.read());

// Print one user by id
console.log(newUser.readOne(0));