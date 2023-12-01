var baseUrl = "http://localhost:3000/api/auth/";

document
  .getElementById("submit")
  .addEventListener("click", function (click) {
    addProduct(click);
  });

async function addProduct(event) {

  event.preventDefault();
  let produceName = document.getElementById("produceName").value;
  let produceQuantity = document.getElementById("produceQuantity").value;
  let producePrice = document.getElementById("producePrice").value;
  let produceCategory = document.getElementById("produceCategory").value;

  try {
    console.log('>>>>>');
    const response = await fetch(baseUrl + "product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        name: produceName,
        quantity: produceQuantity,
        price: producePrice,
        category: produceCategory
      }),
    });
    const data = await response.json();
    console.log('>>>>>', data);
    if (data.status == 201) {
      console.log(data, '>>>>>>>>>>')
      setTimeout(function () {
        location.href = "/ui/Products.html";
    }, 500);
    }
  } catch (error) {
    console.log(error);
  }
}


fetch("http://localhost:3000/api/auth/products/", {
  method: "GET",
  headers: {
    "content-type": "application/json", 
  },
  mode: "cors",
}) 
  .then((response) => response.json())
  .then((data) => {
    let productCards = "";
    data.data.map((product) => {
      productCards += `
      <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">
        ${product.quantity}
      </p>
      <h5>UGX ${product.price}</h5>
      <a href="#" class="btn btn-success">${product.category}</a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button
          type="button"
          rel="tooltip"
          title="Edit Task"
          class="btn btn-info btn-simple btn-link"
        >
          <i class="fa fa-edit"></i>
        </button>
        <button
          type="button"
          rel="tooltip"
          title="Remove"
          class="btn btn-danger btn-simple btn-link"
        >
          <i class="fa fa-times"></i>
        </button>
    </div>`;
    });
    document.getElementById("product-container").innerHTML = productCards;
  })
  .catch((error) => console.log(error));

const deleteButton = document.getElementById("deleteProduct");
deleteButton.addEventListener("click", deleteProduct);

async function deleteProduct(event) {
  console.log('///////////', event);
  event.preventDefault();
  try {
    const response = await fetch('http://localhost:3000/api/auth/farmer/643ad6b14274bedd83f9ad39', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
  }
  catch (error) {
    console.error('Error deleting product:', error);
  }
}