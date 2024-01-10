# Gestión de Productos y de Usuarios (ProductManager y UserManager)
Este desafío proporciona una implementación de gestión de productos y de usuarios utilizando JavaScript y archivos JSON.

## Clases
El desafío consta de dos clases principales: UserManager y ProductManager.

### ProductManager
La clase ProductManager se utiliza para gestionar una colección de productos almacenada en un archivo JSON. Cada producto tiene un id, title, photo, price y stock.

Los métodos principales de ProductManager son:

create(data): Crea un nuevo producto con los datos proporcionados, lo añade a la colección de productos en el archivo JSON y devuelve el nuevo producto.
read(): Lee la colección completa de productos del archivo JSON y la devuelve.
readOne(id): Lee la colección completa de productos del archivo JSON y devuelve un producto específico basado en su id.

### UserManager
La clase UserManager se utiliza para gestionar una colección de usuarios almacenada en un archivo JSON. Cada usuario tiene un id, name, photo y email.

Los métodos principales de UserManager son:

create(data): Crea un nuevo usuario con los datos proporcionados, lo añade a la colección de usuarios en el archivo JSON y devuelve el nuevo usuario.
read(): Lee la colección completa de usuarios del archivo JSON y la devuelve.
readOne(id): Lee la colección completa de usuarios del archivo JSON y devuelve un usuario específico basado en su id.