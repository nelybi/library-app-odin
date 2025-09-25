const containerBook = document.getElementById("library");
const newBookBtn = document.getElementById("newBookBtn");
const bookForm = document.getElementById("bookForm");

let myLibrary = [];

newBookBtn.addEventListener("click", () => {
  bookForm.classList.toggle("hidden");
});

function Book(auteur, titre, pages, lu) {
  // le constructeur...
  this.id = crypto.randomUUID();
  this.auteur = auteur;
  this.titre = titre;
  this.pages = pages;
  this.lu = lu;
}

Book.prototype.toggleRead = function () {
  this.lu = !this.lu;
};

function addBookToLibrary(auteur, titre, pages, lu) {
  // prendre des paramètres, créer un livre puis le stocker dans le tableau
  const nouveauLivre = new Book(auteur, titre, pages, lu);
  myLibrary.push(nouveauLivre);
}
// addBookToLibrary("Victor Hugo", "Les Misérables", 1200, true);
// addBookToLibrary("J.K. Rowling", "Harry Potter", 500, false);

// console.log(myLibrary);
function displayBooks() {
  containerBook.innerHTML = "";
  for (const book of myLibrary) {
    const card = document.createElement("div");
    card.dataset.id = book.id;
    const title = document.createElement("h2");
    title.innerText = `${book.titre} de ${book.auteur}`;
    const p = document.createElement("p");
    p.innerText = `${book.lu ? "lu" : "pas lu"} - ${book.pages} pages`;
    card.appendChild(title);
    card.appendChild(p);
    containerBook.appendChild(card);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Supprimer";
    deleteButton.addEventListener("click", () => {
      myLibrary = myLibrary.filter((book) => book.id !== card.dataset.id);
      displayBooks();
    });
    card.appendChild(deleteButton);

    const toggleButton = document.createElement("button");

    toggleButton.innerText = "Changer le statut lu";

    toggleButton.addEventListener("click", () => {
      const bookToToggle = myLibrary.find((b) => b.id === card.dataset.id);

      if (bookToToggle) {
        bookToToggle.toggleRead();
        displayBooks();
      }
    });
    card.appendChild(toggleButton);
  }
}

displayBooks();

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const titre = document.getElementById("titre");
  const auteur = document.getElementById("auteur");
  const pages = document.getElementById("pages");
  let lu = document.querySelector("#lu").checked;

  addBookToLibrary(auteur.value, titre.value, Number(pages.value), lu);
  console.log(myLibrary);
  displayBooks();
  bookForm.reset();
});
