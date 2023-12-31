// Class definition: UserManager
class UserManager {
    // Static array defined as private to store the users
    static #users = [];
    // Static counter defined as private for the users id
    static #idCounter = 0;

    // Constructor of the class
    constructor() {
    }

    // Method to create a new user
    create(data) {
        // Create a new user object
        const newUser = {
            id: UserManager.#idCounter++,
            name: data.name,
            photo: data.photo,
            email: data.email,
        };
        // Push the new user into the array of users
        UserManager.#users.push(newUser);
        // Return the new user
        return newUser;
    }

    // Method to read all the users
    read() {
        // Return the array of users
        return UserManager.#users;
    }

    // Method to read one user by id
    readOne(id) {
        // Return the user with the id passed as parameter
        return UserManager.#users.find(each => each.id === Number(id));
    }
}

// Create a new instance of the class UserManager
const newUser = new UserManager();

// Create two new users
const user1 = newUser.create({name: 'Armando', photo: '/ruta/a/la/imagen.jpg', email: 'hola@kaze.com'});
const user2 = newUser.create({name: 'Leandro', photo: '/ruta/a/la/imagen1.jpg', email: 'soy@superman.com'});

// Print the users array
console.log(newUser.read());

// Print one user by id
console.log(newUser.readOne(0));