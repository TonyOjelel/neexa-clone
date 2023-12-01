var baseUrl = "http://localhost:3000/api/auth/";

document
  .getElementById("submit")
  .addEventListener("click", function (click) {
    login(click);
  });

async function login(event) {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const response = await fetch(baseUrl + "login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.status == 200) {
      console.log(data.data.role, '>>>>>>>>>>')
      setTimeout(function () {
      if (data.data.role === "ao"){
        location.href = "/ui/aodashboard.html";
      }
      if (data.data.role === "fo"){
        location.href = "/ui/fodashboard.html";
      }
      if (data.data.role === "uf"){
        location.href = "/ui/UFdashboard.html";
      }
      if (data.data.role === "user"){
        location.href = "/ui/Products.html";
      }
    }, 500);
    }
  } catch (error) {
    console.log(error);
  }
}
