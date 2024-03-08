console.log("Socket connected");

const socket = io();

socket.on("products", (data) => {
    const template = data
      .map(
        (each) => `
        <div class="card m-2" style="width: 360px">
          <img src="${each.photo}" style="height: 240px" class="card-img-top object-fit-cover" alt="${each.title}">
          <h5 class="p-2 text-center card-title">${each.title}</h5>
        </div>
      `
      )
      .join("");
    document.querySelector("#products").innerHTML = template;
  });

  document.querySelector("#newProduct").addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector("#name");
    const photo = document.querySelector("#photo");
    const price = document.querySelector("#price");
    const stock = document.querySelector("#stock");
    const data = {};
    title.value && (data.title = title.value);
    photo.value && (data.photo = photo.value);
    price.value && (data.price = price.value);
    stock.value && (data.stock = stock.value);
    socket.emit("newProduct", data);
    title.value = '';
    price.value = '';
    stock.value = '';
    alert('Producto creado');
});