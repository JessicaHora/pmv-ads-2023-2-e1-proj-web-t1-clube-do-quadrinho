import { API_KEY } from "../../env.js";

//funcionalidade de pesquisa
let queryName = document.querySelector("#queryName");
let search = document.querySelector("#search");

search.addEventListener("click", (event) => {
    event.preventDefault();
    queryName.value === ""
        ? undefined
        : renderComicsResults(queryName.value, 0, 10);
});

function renderComicsResults(query, page = 0, resultsPerPage = 10) {
    let startIndex = page * resultsPerPage;
    let queries = [
        `intitle:${query}`,
        `inpublisher:${query}`,
        `inauthor:${query}`,
    ];
    let requests = queries.map((q) =>
        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${q}&startIndex=${startIndex}&maxResults=${resultsPerPage}&langRestrict=pt&key=${API_KEY}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erro HTTP! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (!data.items) {
                    return [];
                }
                return data.items;
            })
    );

    Promise.all(requests)
        .then((results) => {
            let comics = [].concat(...results);
            let filteredComics = comics.filter(
                (comic) =>
                    comic.volumeInfo.categories &&
                    comic.volumeInfo.categories.includes("Comics & Graphic Novels") &&
                    comic.volumeInfo.imageLinks &&
                    comic.volumeInfo.imageLinks.thumbnail
            );

            let content = document.querySelector(".content") || document.querySelector(".container");
            if (content ) {
                content.innerHTML = "";
            }

            // renderizar os resultados
            if (filteredComics.length > 0) {
                document.head.querySelector("title").innerHTML = `Pesquisa: ${query}`;
                const resultado = document.createElement("div");
                resultado.classList.add("resultadosPesquisa");
                const headline = document.createElement("h2");
                headline.classList.add("headline-medium", "mb-3");
                headline.innerHTML = `Resultados para: ${query}`;
                resultado.appendChild(headline);

                const comicCards = document.createElement("div");
                comicCards.classList.add("container", "flex-c");
                const row = document.createElement("div");
                row.classList.add("row-cols-12", "md-3");
                comicCards.appendChild(row);

                filteredComics.forEach((comic) => {
                    const card = document.createElement("div");
                    card.classList.add(
                        "card",
                        "w-auto",
                        "mb-3",
                        "d-flex",
                        "flex-row",
                        "mt-3"
                    );
                    const cardBody = document.createElement("div");
                    cardBody.classList.add("card-body");
                    //imagem do quadrinho
                    const img = document.createElement("img");
                    img.classList.add(
                        "img-fluid",
                        "mr-3",
                        "img-thumbnail",
                        "capa-quadrinho"
                    );
                    img.style.maxWidth = "100px";
                    img.style.maxHeight = "170px";
                    img.src = comic.volumeInfo.imageLinks.thumbnail;
                    //titulo e id do quadrinho
                    const h5 = document.createElement("h5");
                    const title = document.createElement("a");
                    h5.classList.add("card-title", "headline-small");
                    title.classList.add("text-primary");
                    title.href = `quadrinho.html?id=${comic.id}`;
                    title.addEventListener("click", (event) => {
                        event.preventDefault();
                        window.location.replace(
                            `${window.location.origin}/codigo-fonte/src/paginas/paginaQuadrinho/quadrinho.html?id=${comic.id}`
                        );
                    });
                    title.style.textDecoration = "none";
                    title.innerHTML = comic.volumeInfo.title;
                    h5.appendChild(title);
                    //criadores do quadrinho
                    const creators = document.createElement("p");
                    creators.classList.add("card-text", "body-medium");
                    if (comic.volumeInfo.authors) {
                        creators.innerHTML = comic.volumeInfo.authors.join(", ");
                    } else {
                        creators.innerHTML = "";
                    }
                    cardBody.appendChild(h5);
                    cardBody.appendChild(creators);
                    card.appendChild(img);
                    card.appendChild(cardBody);
                    row.appendChild(card);
                });
                content.appendChild(resultado);
                content.appendChild(comicCards);

                //paginação
                let previousButton = document.createElement("button");
                previousButton.classList.add("btn", "btn-secondary", "mr-3");
                previousButton.id = "previous";
                previousButton.innerHTML = "Anterior";
                previousButton.addEventListener("click", () => {
                    if (page > 0) {
                        page--;
                        renderComicsResults(queryName.value, page, resultsPerPage);
                    }
                });

                let nextButton = document.createElement("button");
                nextButton.classList.add("btn", "btn-secondary", "mx-3");
                nextButton.id = "next";
                nextButton.innerHTML = "Próximo";
                nextButton.addEventListener("click", () => {
                    page++;
                    renderComicsResults(queryName.value, page, resultsPerPage);
                });

                let pagination = document.createElement("div");
                pagination.classList.add(
                    "pagination",
                    "d-flex",
                    "justify-content-center",
                    "align-items-center"
                );
                pagination.appendChild(previousButton);
                pagination.appendChild(nextButton);
                content.appendChild(pagination);
            } else {
                document.head.querySelector("title").innerHTML = `Pesquisa: ${query}`;
                const resultado = document.createElement("div");
                resultado.classList.add("resultadosPesquisa");
                const headline = document.createElement("h2");
                headline.classList.add("headline-medium", "mb-3");
                headline.innerHTML = `Nenhum resultado para: ${query} 
        <br>
        :(`;
                content.appendChild(resultado);
                resultado.appendChild(headline);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            let content = document.querySelector(".content");
            if (content) {
                content.innerHTML = "Um erro ocorreu ao buscar os quadrinhos.";
            }
        });
}