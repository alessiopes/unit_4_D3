function searchImages(searchTerm) {
  var apiKey = "vllLf4QvY7g08jd5gH40YQBjPz9RMlocXE1P3fSEdvcv6CpypwhgadQ9";
  var apiUrl = "https://api.pexels.com/v1/search?query=" + searchTerm;

  // Nascondi gli elementi "result-length", "error-message" e "no-results-message"
  var resultLengthElement = document.getElementById("result-length");
  var errorMessage = document.getElementById("error-message");
  var noResultsMessage = document.getElementById("no-results-message");

  resultLengthElement.style.display = "none";
  errorMessage.style.display = "none";
  noResultsMessage.style.display = "none";

  fetch(apiUrl, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Seleziona il container delle immagini nel DOM
      var imageContainer = document.getElementById("image-container");

      console.log(data);

      // Svuota il container delle immagini
      imageContainer.innerHTML = "";

      // Verifica se non ci sono risultati
      if (data.photos.length === 0) {
        // Se non ci sono risultati, mostra il messaggio di nessun risultato
        var noResultsMessage = document.getElementById("no-results-message");
        noResultsMessage.style.display = "block";
      } else {
        // Se ci sono risultati, mostra il numero di risultati e le immagini
        var resultLengthElement = document.getElementById("result-length");
        resultLengthElement.innerText =
          "Numero di risultati: " + data.total_results;

        // Mostra l'elemento "result-length" solo se ci sono risultati
        if (data.photos.length > 0) {
          resultLengthElement.style.display = "block";
        }

        // Itera attraverso le foto e crea le card Bootstrap corrispondenti
        data.photos.forEach(function (photo) {
          var imageUrl = photo.src.large;
          var altText = photo.alt;

          // Creazione del div contenitore per la card
          var cardContainer = document.createElement("div");
          cardContainer.classList.add("col-md-4", "mb-4");

          // Creazione della card
          var card = document.createElement("div");
          card.classList.add("card");

          // Immagine
          var imageLink = document.createElement("a");
          imageLink.href = photo.url;
          imageLink.target = "_blank";
          var image = document.createElement("img");
          image.src = imageUrl;
          image.classList.add("card-img-top");
          image.alt = altText;
          imageLink.appendChild(image);
          card.appendChild(imageLink);

          // Contenuto della card
          var cardBody = document.createElement("div");
          cardBody.classList.add("card-body");

          // Titolo
          var title = document.createElement("h5");
          title.classList.add("card-title");
          title.textContent = altText;
          cardBody.appendChild(title);

          // Fotografo
          var photographer = document.createElement("p");
          photographer.classList.add("card-text");
          photographer.innerHTML =
            "Photographer: <a href='" +
            photo.photographer_url +
            "' target='_blank'>" +
            photo.photographer +
            "</a>";
          cardBody.appendChild(photographer);

          // Aggiunta del contenuto alla card
          card.appendChild(cardBody);

          // Aggiunta della card al contenitore
          cardContainer.appendChild(card);

          // Aggiunta del contenitore al container delle immagini
          imageContainer.appendChild(cardContainer);

          // Aggiorna il numero di pagina corrente
          var currentPage = data.page;
          var totalPages = Math.ceil(data.total_results / data.per_page);
          var currentPageElement = document.getElementById("current-page");
          currentPageElement.innerText = "Pagina " + currentPage + " di " + totalPages;
        });
      }
      // Fa apparire i pulsanti di navigazione
      var pagesButtons = document.getElementById("pages-buttons");
      pagesButtons.style.display = "block";

      // Rimuove vecchio link next page
      var element = document.getElementById("nextPageButton");
      var clonedElement = element.cloneNode(true);
      element.parentNode.replaceChild(clonedElement, element);

      // Inserisce nuovo link next page
      nextPageButton.addEventListener("click", function () {
        loadNextPage(data.next_page);
      });

      // Rimuove vecchio link prev page
      var element = document.getElementById("prevPageButton");
      var clonedElement = element.cloneNode(true);
      element.parentNode.replaceChild(clonedElement, element);

      // Inserisce nuovo link prev page
      prevPageButton.addEventListener("click", function () {
        loadPrevPage(data.prev_page);
      });
    })
    .catch((error) => {
      var errorMessage = document.getElementById("error-message");
      errorMessage.innerText =
        "Errore durante la ricerca delle immagini: " + error;
      errorMessage.style.display = "block";
    });
}

// funzione per gestire l'evento keydown ENTER nella barra di ricerca
function handleSearch(event) {
  if (event.key === "Enter") {
    searchImages(event.target.value);
  }
}

function loadNextPage(url) {
  fetch(url, {
    headers: {
      Authorization: "vllLf4QvY7g08jd5gH40YQBjPz9RMlocXE1P3fSEdvcv6CpypwhgadQ9",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Seleziona il container delle immagini nel DOM
      var imageContainer = document.getElementById("image-container");

      console.log(data);

      // Svuota il container delle immagini
      imageContainer.innerHTML = "";

      // Verifica se non ci sono risultati
      if (data.photos.length === 0) {
        // Se non ci sono risultati, mostra il messaggio di nessun risultato
        var noResultsMessage = document.getElementById("no-results-message");
        noResultsMessage.style.display = "block";
      } else {
        // Se ci sono risultati, mostra il numero di risultati e le immagini
        var resultLengthElement = document.getElementById("result-length");
        resultLengthElement.innerText =
          "Numero di risultati: " + data.total_results;

        // Mostra l'elemento "result-length" solo se ci sono risultati
        if (data.photos.length > 0) {
          resultLengthElement.style.display = "block";
        }

        // Itera attraverso le foto e crea le card Bootstrap corrispondenti
        data.photos.forEach(function (photo) {
          var imageUrl = photo.src.large;
          var altText = photo.alt;

          // Creazione del div contenitore per la card
          var cardContainer = document.createElement("div");
          cardContainer.classList.add("col-md-4", "mb-4");

          // Creazione della card
          var card = document.createElement("div");
          card.classList.add("card");

          // Immagine
          var imageLink = document.createElement("a");
          imageLink.href = photo.url;
          imageLink.target = "_blank";
          var image = document.createElement("img");
          image.src = imageUrl;
          image.classList.add("card-img-top");
          image.alt = altText;
          imageLink.appendChild(image);
          card.appendChild(imageLink);

          // Contenuto della card
          var cardBody = document.createElement("div");
          cardBody.classList.add("card-body");

          // Titolo
          var title = document.createElement("h5");
          title.classList.add("card-title");
          title.textContent = altText;
          cardBody.appendChild(title);

          // Fotografo
          var photographer = document.createElement("p");
          photographer.classList.add("card-text");
          photographer.innerHTML =
            "Photographer: <a href='" +
            photo.photographer_url +
            "' target='_blank'>" +
            photo.photographer +
            "</a>";
          cardBody.appendChild(photographer);

          // Aggiunta del contenuto alla card
          card.appendChild(cardBody);

          // Aggiunta della card al contenitore
          cardContainer.appendChild(card);

          // Aggiunta del contenitore al container delle immagini
          imageContainer.appendChild(cardContainer);

          // Aggiorna il numero di pagina corrente
          var currentPage = data.page;
          var totalPages = Math.ceil(data.total_results / data.per_page);
          var currentPageElement = document.getElementById("current-page");
          currentPageElement.innerText = "Pagina " + currentPage + " di " + totalPages;
        });
      }

      // Rimuove vecchio link next page
      var element = document.getElementById("nextPageButton");
      var clonedElement = element.cloneNode(true);
      element.parentNode.replaceChild(clonedElement, element);

      // Inserisce nuovo link next page
      nextPageButton.addEventListener("click", function () {
        loadNextPage(data.next_page);
      });

      // Rimuove vecchio link prev page
      var element = document.getElementById("prevPageButton");
      var clonedElement = element.cloneNode(true);
      element.parentNode.replaceChild(clonedElement, element);

      // Inserisce nuovo link prev page
      prevPageButton.addEventListener("click", function () {
        loadPrevPage(data.prev_page);
      });
    })
    .catch((error) => {
      var errorMessage = document.getElementById("error-message");
      errorMessage.innerText =
        "Errore durante la ricerca delle immagini: " + error;
      errorMessage.style.display = "block";
    });
}

function loadPrevPage(url) {
  fetch(url, {
    headers: {
      Authorization: "vllLf4QvY7g08jd5gH40YQBjPz9RMlocXE1P3fSEdvcv6CpypwhgadQ9",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Seleziona il container delle immagini nel DOM
      var imageContainer = document.getElementById("image-container");

      console.log(data);

      // Svuota il container delle immagini
      imageContainer.innerHTML = "";

      // Verifica se non ci sono risultati
      if (data.photos.length === 0) {
        // Se non ci sono risultati, mostra il messaggio di nessun risultato
        var noResultsMessage = document.getElementById("no-results-message");
        noResultsMessage.style.display = "block";
      } else {
        // Se ci sono risultati, mostra il numero di risultati e le immagini
        var resultLengthElement = document.getElementById("result-length");
        resultLengthElement.innerText =
          "Numero di risultati: " + data.total_results;

        // Mostra l'elemento "result-length" solo se ci sono risultati
        if (data.photos.length > 0) {
          resultLengthElement.style.display = "block";
        }

        // Itera attraverso le foto e crea le card Bootstrap corrispondenti
        data.photos.forEach(function (photo) {
          var imageUrl = photo.src.large;
          var altText = photo.alt;

          // Creazione del div contenitore per la card
          var cardContainer = document.createElement("div");
          cardContainer.classList.add("col-md-4", "mb-4");

          // Creazione della card
          var card = document.createElement("div");
          card.classList.add("card");

          // Immagine
          var imageLink = document.createElement("a");
          imageLink.href = photo.url;
          imageLink.target = "_blank";
          var image = document.createElement("img");
          image.src = imageUrl;
          image.classList.add("card-img-top");
          image.alt = altText;
          imageLink.appendChild(image);
          card.appendChild(imageLink);

          // Contenuto della card
          var cardBody = document.createElement("div");
          cardBody.classList.add("card-body");

          // Titolo
          var title = document.createElement("h5");
          title.classList.add("card-title");
          title.textContent = altText;
          cardBody.appendChild(title);

          // Fotografo
          var photographer = document.createElement("p");
          photographer.classList.add("card-text");
          photographer.innerHTML =
            "Photographer: <a href='" +
            photo.photographer_url +
            "' target='_blank'>" +
            photo.photographer +
            "</a>";
          cardBody.appendChild(photographer);

          // Aggiunta del contenuto alla card
          card.appendChild(cardBody);

          // Aggiunta della card al contenitore
          cardContainer.appendChild(card);

          // Aggiunta del contenitore al container delle immagini
          imageContainer.appendChild(cardContainer);

          // Aggiorna il numero di pagina corrente
          var currentPage = data.page;
          var totalPages = Math.ceil(data.total_results / data.per_page);
          var currentPageElement = document.getElementById("current-page");
          currentPageElement.innerText = "Pagina " + currentPage + " di " + totalPages;
        });
      }
      // Rimuove vecchio link next page
      var element = document.getElementById("nextPageButton");
      var clonedElement = element.cloneNode(true);
      element.parentNode.replaceChild(clonedElement, element);

      // Inserisce nuovo link next page
      nextPageButton.addEventListener("click", function () {
        loadNextPage(data.next_page);
      });

      // Rimuove vecchio link prev page
      var element = document.getElementById("prevPageButton");
      var clonedElement = element.cloneNode(true);
      element.parentNode.replaceChild(clonedElement, element);

      // Inserisce nuovo link prev page
      prevPageButton.addEventListener("click", function () {
        loadPrevPage(data.prev_page);
      });
    })
    .catch((error) => {
      var errorMessage = document.getElementById("error-message");
      errorMessage.innerText =
        "Errore durante la ricerca delle immagini: " + error;
      errorMessage.style.display = "block";
    });
}
