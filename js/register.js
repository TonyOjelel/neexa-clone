var baseUrl = "http://localhost:3000/api/auth/";

document
  .getElementById("submit")
  .addEventListener("click", function (click) {
    register(click);
  });

async function register(event) {
  event.preventDefault();
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const response = await fetch(baseUrl + "signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.status == 201) {
      // submitToast(data.message); //display toast
      setTimeout(function () {
        location.href = "/ui/auth/login.html";
      }, 500);
    }
  } catch (error) {
    console.log(error);
  }
}

// var submitToast = document.getElementById('submit');
// submitToast.addEventListener('click', function() {
//   var toastEl = document.getElementById('liveToast');
//   var toast = new bootstrap.Toast(toastEl);
//   toast.show();
// });
