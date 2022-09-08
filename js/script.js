"use stric";
const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const surName = document.getElementById("surName");
const date = document.getElementById("date");
const address = document.getElementById("address");
const zipCode = document.getElementById("zipCode");
const city = document.getElementById("city");
const sex = document.querySelector('input[name="flexRadioDefault"]:checked');

let validated;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateInputs()) {
    const formObject = new Object();

    formObject.firstName = firstName.value;
    formObject.surName = surName.value;
    formObject.date = date.value;
    formObject.address = address.value;
    formObject.zipCode = zipCode.value;
    formObject.city = city.value;
    formObject.sex = sex.value;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formObject),
    };

    //fetch('API_ENDPOINT', requestOptions)
    //.then(response => response.json())
    //.then(data => formSent(data, formObject));

    successMessage("", formObject);
  }
});

const successMessage = (data, formObject) => {
  //Proveriti da li je fetch vratio success ili error,
  //i prema tome ispisati odgovarajucu poruku

  // fetch(url)
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     }
  //     throw new Error("Nije uspesno");
  //   })
  //   .then((responseJson) => {
  //     // Uraditi nesto sa response
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  //Ukoliko je response success, zameniti inner html
  form.innerHTML = "<h2>Forma je uspesno poslata.</h2>";
  form.innerHTML += `<code>
    Ime: ${formObject.firstName} </br>
    Prezime: ${formObject.surName} </br>
    Datum rodjenja: ${formObject.date} </br>
    Adresa: ${formObject.address} </br>
    Zipkod: ${formObject.zipCode} </br>
    Grad:   ${formObject.city} </br>
    Pol:   ${formObject.sex} </br>
    </code>`;

  //Ukoliko je response errror, zameniti inner html
  form.innerHTML = "<h2>Forma je neuspesno poslata.</h2>";
};

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");

  validated = false;
};
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const validateInputs = () => {
  const firstNameValue = firstName.value.trim();
  const surNameValue = surName.value.trim();
  const dateValue = date.value.trim();
  const addressValue = address.value.trim();
  const zipCodeValue = zipCode.value.trim();
  const cityValue = city.value.trim();

  validated = true;

  if (firstNameValue === "") {
    setError(firstName, "Unesi ime");
  } else if (firstNameValue.length < 3) {
    setError(firstName, "Ime mora da sadrzi vise od 3 slova");
  } else {
    setSuccess(firstName);
  }
  if (surNameValue === "") {
    setError(surName, "Unesi prezime");
  } else if (surNameValue.length < 3) {
    setError(surName, "Prezime mora da sadrzi vise od 3 slova");
  } else {
    setSuccess(surName);
  }
  if (dateValue === "") {
    setError(dateValue, "Unesi datum rodjenja");
  } else {
    setSuccess(date);
  }
  if (addressValue === "") {
    setError(address, "Unesi adresu");
  } else if (addressValue.length < 10) {
    setError(address, "Unesi pun naziv adrese");
  } else {
    setSuccess(address);
  }
  if (zipCodeValue === "") {
    setError(zipCode, "Unesi postanski broj");
  } else if (zipCodeValue.length < 5) {
    setError(zipCode, "Mora da sadrzi najmanje 5 brojeva");
  } else {
    setSuccess(zipCode);
  }
  if (cityValue === "") {
    setError(cityValue, "Izaberi grad");
  } else {
    setSuccess(city);
  }

  return validated;
};
