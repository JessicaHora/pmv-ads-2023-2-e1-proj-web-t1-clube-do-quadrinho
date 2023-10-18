//funcionalidade de pesquisa
let queryName = document.querySelector('#queryName');
let search = document.querySelector('#search');

search.addEventListener('click', (event) => {
    event.preventDefault();
    queryName.value === '' ? undefined : renderComicsResults(queryName.value);
});

//renderizar resultados da pesquisa
function renderComicsResults(query) {
    fetch('../../util/comicsDb.json').then(response => {
        return response.json();
    }).then(data => {
        let comics = data.comics;
        // verificar se o query existe no array de comics
        let results = comics.filter(comic => {
            return comic.title.toLowerCase().includes(query.toLowerCase()) ||
                comic.publisher.toLowerCase().includes(query.toLowerCase()) ||
                comic.creators.toLowerCase().includes(query.toLowerCase());
        });
        // limpar o conteúdo da div content
        let content = document.querySelector('.content');
        if (content) {
            content.innerHTML = '';
        } // se o query existir, renderizar os resultados
        if (results.length > 0) {
            document.head.querySelector('title').innerHTML = `Pesquisa: ${query}`;
            const resultado = document.createElement('div');
            resultado.classList.add('resultadosPesquisa');
            const headline = document.createElement('h2');
            headline.classList.add('headline-medium', 'mb-3');
            headline.innerHTML = `Resultados para: ${query}`;
            resultado.appendChild(headline);

            const comicCards = document.createElement('div');
            comicCards.classList.add('container', 'flex-c');
            const row = document.createElement('div');
            row.classList.add('row-cols-12', 'md-3');
            comicCards.appendChild(row);
            
            results.forEach(comic => {
                const card = document.createElement('div');
                card.classList.add('card', 'w-auto', 'mb-3', 'd-flex', 'flex-row', 'mt-3');
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                const img = document.createElement('img');
                img.classList.add('img-fluid', 'mr-3', 'img-thumbnail', 'capa-quadrinho');
                img.style.maxWidth = '100px';
                img.style.maxHeight = '170px';
                img.src = comic.image;
                const h5 = document.createElement('h5');
                const title = document.createElement('a');
                h5.classList.add('card-title', 'headline-small');
                title.classList.add('text-primary');
                title.href = `quadrinho.html?id=${comic.id}`;
                title.style.textDecoration = 'none';
                title.innerHTML = comic.title;
                h5.appendChild(title);
                const publisher = document.createElement('p');
                publisher.classList.add('card-text', 'body-medium');
                publisher.innerHTML = comic.publisher;
                const creators = document.createElement('p');
                creators.classList.add('card-text', 'body-medium');
                creators.innerHTML = comic.creators;
                cardBody.appendChild(h5);
                cardBody.appendChild(publisher);
                cardBody.appendChild(creators);
                card.appendChild(img);
                card.appendChild(cardBody);
                row.appendChild(card);
            });
            content.appendChild(resultado);
            content.appendChild(comicCards);
        } else {
            document.head.querySelector('title').innerHTML = `Pesquisa: ${query}`;
            const resultado = document.createElement('div');
            resultado.classList.add('resultadosPesquisa');
            const headline = document.createElement('h2');
            headline.classList.add('headline-medium', 'mb-3');
            headline.innerHTML = `Nenhum resultado para: ${query} 
        <br>
        :(`;
            content.appendChild(resultado);
            resultado.appendChild(headline);
        }
        return results;
    }).catch(err => {
        console.log('Erro ao carregar o arquivo JSON', err);
    });
}