//mi sono esercitata sul medesimo codice di luca (sostanzialmente l'ho riscritto passaggio dopo passaggio per studiarlo)

const formEl = document.querySelector(".todo-form");
const inputEl = formEl.querySelector("input");
const listEl = document.querySelector(".task-list"); // lista

// const API_URL = "https://openlibrary.org/subjects/harry_potter.json";
const SITE_URL = "https://openlibrary.org";
const BASE_API_URL = "https://openlibrary.org/search.json?q=";

formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputValue = inputEl.value;
  const searchFormatted = inputValue.replaceAll(" ", "+");
  const apiURL = `${BASE_API_URL}/${searchFormatted}`;

  console.log("sto chiamando:", apiURL);

  fetch(apiURL)
    .then((response) => {
      console.log({ response });
      const json = response.json();
      console.log({ json });
      return json;
    })
    .then((json) => {
      console.log(json);

      listEl.innerHTML = json.docs
        .map((doc) => {
          return `<li><img src='https://picsum.photos/58/80?${doc.key}'>${doc.title}</li>`;
        })

        .join("");
    })
    .catch((err) => {
      console.error(err);
      listEl.innerHTML = `<li> C'è stato un piccolo errore, riprovare!</li>`;
      return [];
    })
    //Il finally andava corretto così, no?
    .finally(() => {
      console.log("Il finally è qui");
    });
});
