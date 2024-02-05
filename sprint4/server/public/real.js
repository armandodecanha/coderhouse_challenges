console.log("Real time");

const socket = io();

socket.on("welcome", (data) => {
  //console.log(data);
});

socket.on("products", (data) => {
    //console.log(data);
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

//socket.emit("hello", { name: "John Doe"});

socket.on("newSuccess", (data) => {
  //console.log(data);
});

document.querySelector("#newProduct").addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector("#name").value;
    const photo = document.querySelector("#photo").value;
    const price = document.querySelector("#price").value;
    const stock = document.querySelector("#stock").value;
    const data = {};
    title && (data.title = title);
    photo && (data.photo = photo);
    price && (data.price = price);
    stock && (data.stock = stock);
    //console.log(data);
    socket.emit("newProduct", data);
});