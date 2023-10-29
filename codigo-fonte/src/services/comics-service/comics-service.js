

//buscar quadrinho pelo id
async function getComicsById(id) {
    const response = await fetch('../../database/comicsDb.json');
    const data = await response.json();
    let comics = data.comics;
    let result = comics.filter(comic => {
        return comic.id === id;
    });
    return result[0];
}

export { getComicsById };