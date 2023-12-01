var baseUrl = "http://localhost:3000/api/auth/";

// document
//   .getElementById("submit")
//   .addEventListener("click", function (click) {
//     addFarmer(click);
//   });

const submitButton = document.getElementById("submitbutton");
submitButton.addEventListener("click", addFarmer);

async function addFarmer(event) {
  event.preventDefault();
  let FullName = document.getElementById("FullName").value;
  let gender = document.getElementById("gender").value;
  let dateofbirth = document.getElementById("dateofbirth").value;
  let activities = document.getElementById("activities").value;
  let nin = document.getElementById("nin").value;
  let wardName = document.getElementById("wardName").value;
  let phoneNumber = document.getElementById("phoneNumber").value;

  try {
    console.log(">>>>>");
    const response = await fetch(baseUrl + "farmer/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        fullname: FullName,
        Gender: gender,
        DOB: dateofbirth,
        Activities: activities,
        NIN: nin,
        PhoneNumber: phoneNumber,
        Ward: wardName,
      }),
    });
    const data = await response.json();
    console.log(data, ">>>>>>>>>>");
    if (data.status == 201) {
      // populateTable();

      setTimeout(function () {
        location.href = "/ui/aoMgt.html";
      }, 500);
    }
  } catch (error) {
    console.log(error);
  }
}

fetch("http://localhost:3000/api/auth/farmers/", {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
  mode: "cors",
})
  .then((response) => response.json())
  .then((data) => {
    let tabledata = "";
    data.data.map((item) => {
      tabledata += `<tr>
      <td>${item.fullname}</td>
      <td>${item.Gender}</td>
      <td>${item.DOB}</td>
      <td>${item.Activities}</td>
      <td>${item.NIN}</td>
      <td>${item.Ward}</td>
      <td>${item.PhoneNumber}</td>
      <td> 
      <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
      <i class="fa fa-times"></i>
    </button>
    </td>
      </tr>`;
    });
    document.getElementById("table-body").innerHTML = tabledata;
  })
  .catch((error) => console.log(error));

const deleteButton = document.getElementById("deleteFarmers");
deleteButton.addEventListener("click", deletefarmer);

async function deletefarmer(event) {
  console.log("///////////", event);
  event.preventDefault();
  try {
    const response = await fetch(
      "http://localhost:3000/api/auth/farmer/6450d7ad46bfdf73c32e8007",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error deleting farmer:", error);
  }
}
