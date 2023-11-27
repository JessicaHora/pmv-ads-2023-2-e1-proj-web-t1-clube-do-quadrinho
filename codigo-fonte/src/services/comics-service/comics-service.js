import { usuarioLogado } from "../account-service/account-service.js";
import { Bd } from "../lists-service/lists-service.js";

//buscar quadrinho pelo id
async function getComicsById(id) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBGxlb9mZ7p0q9N8oYydATS0-_u7Acv-lA`);
    const data = await response.json();
    return data;
}

//adicionar quadrinho a uma lista
function addComicsToList(comic, listId) {
    if (!comic || !comic.volumeInfo) {
        console.error('Quadrinho inválido.');
        return;
    }
    let usuario = usuarioLogado();
    let user = JSON.parse(localStorage.getItem(`usuario-${usuario.email}`));
    let bd = new Bd();
    let lista = bd.lerListasPorId(listId);
    if (lista) {
        //criar copia do quadrinho para adicionar na lista
        const quadrinho = {
            id: comic.id,
            title: comic.volumeInfo.title,
            image: comic.volumeInfo.imageLinks.thumbnail,
            status: {
                lido: false,
                lendo: false,
                queroLer: false
            }
        }

        //verificar status do quadrinho e adicionar na lista
        let status = getComicsStatus(comic.id);
        let statusMap = {
            'lido': 'lido',
            'lendo': 'lendo',
            'queroLer': 'queroLer'
        }

        if (status) {
            quadrinho.status[status] = true;
            let existingComic = lista.quadrinhos[status].find(item => item.id === quadrinho.id);
            if (!existingComic) {
                let statusName = statusMap[status];
                for (let status in quadrinho.status) {
                    if (status === statusName) {
                        lista.quadrinhos[status].push(quadrinho);
                        if (!user.quadrinhos[status].find(item => item.id === quadrinho.id)) {
                            user.quadrinhos[status].push(quadrinho);
                        }
                    }
                }
            }
        } else {
            quadrinho.status.queroLer = true;
            let existingComic = lista.quadrinhos['queroLer'].find(item => item.id === quadrinho.id);
            if (!existingComic) {
                lista.quadrinhos['queroLer'].push(quadrinho);
                if (!user.quadrinhos['queroLer'].find(item => item.id === quadrinho.id)) {
                    user.quadrinhos['queroLer'].push(quadrinho);
                }
            }
        }

        let userListaIndex = user.listas.findIndex(item => item.id === listId);
        if (userListaIndex !== -1) {
            user.listas[userListaIndex] = lista;

            //atualizar lista no localStorage e sessionStorage
            localStorage.setItem(`usuario-${usuario.email}`, JSON.stringify(user));
        }
    }
}

//adicionar quadrinho por status (lido, lendo, quero ler)
async function addComicsByStatus(status, id) {
    try {
        let usuario = usuarioLogado();
        let user = JSON.parse(localStorage.getItem(`usuario-${usuario.email}`));
        let comic = await getComicsById(id);
        if (comic) {
            //criar copia do quadrinho para adicionar na lista
            const quadrinho = {
                id: comic.id,
                title: comic.volumeInfo.title,
                image: comic.volumeInfo.imageLinks.thumbnail,
                status: {
                    lido: false,
                    lendo: false,
                    queroLer: false
                }
            }

            user.quadrinhos = user.quadrinhos ?? {
                lido: [],
                lendo: [],
                queroLer: []
            }
            user.quadrinhos.lido = user.quadrinhos.lido || [];
            user.quadrinhos.lendo = user.quadrinhos.lendo || [];
            user.quadrinhos.queroLer = user.quadrinhos.queroLer || [];

            //switch de cada status
            switch (status) {
                case '1':
                    quadrinho.status.lido = true;
                    user.quadrinhos.lido = user.quadrinhos.lido.filter(item => item.id !== quadrinho.id);
                    user.quadrinhos.lendo = user.quadrinhos.lendo.filter(item => item.id !== quadrinho.id);
                    user.quadrinhos.queroLer = user.quadrinhos.queroLer.filter(item => item.id !== quadrinho.id);
                    user.quadrinhos.lido.push(quadrinho);
                    break;
                case '2':
                    quadrinho.status.lendo = true;
                    user.quadrinhos.lido = user.quadrinhos.lido.filter(item => item.id !== quadrinho.id);
                    user.quadrinhos.lendo = user.quadrinhos.lendo.filter(item => item.id !== quadrinho.id);
                    user.quadrinhos.queroLer = user.quadrinhos.queroLer.filter(item => item.id !== quadrinho.id);
                    user.quadrinhos.lendo.push(quadrinho);
                    break;
                case '3':
                    quadrinho.status.queroLer = true;
                    user.quadrinhos.lido = user.quadrinhos.lido.filter(item => item.id !== quadrinho.id);
                    user.quadrinhos.lendo = user.quadrinhos.lendo.filter(item => item.id !== quadrinho.id);
                    user.quadrinhos.queroLer = user.quadrinhos.queroLer.filter(item => item.id !== quadrinho.id);
                    user.quadrinhos.queroLer.push(quadrinho);
                    break;
                case '4':
                    removeComicsById(id, status);
                    localStorage.removeItem(`usuario-${user.id}-quadrinho${id}-excluir`);
                    let quadrinhoStatus = document.getElementById('adicionarQuadrinho')
                    let excluirOption = quadrinhoStatus.querySelector('option[value="4"]');
                    if (excluirOption) {
                        quadrinhoStatus.removeChild(excluirOption);
                    }
                    break;
                default:
                    console.error('Status inválido.');
                    return;
            }

            const statusMap = {
                '1': 'lido',
                '2': 'lendo',
                '3': 'queroLer'
            }

            //sincronizar o status do quadrinho nas listas do usuário
            let statusName = statusMap[status];
            for (let lista of user.listas) {
                for (let status in lista.quadrinhos) {
                    let index = lista.quadrinhos[status].findIndex(item => item.id === quadrinho.id);
                    if (index !== -1) {
                        lista.quadrinhos[status].splice(index, 1);
                        lista.quadrinhos[statusName].push(quadrinho);
                    }
                }
            }

            //salvar lista atualizada no localStorage 
            localStorage.setItem(`usuario-${usuario.email}`, JSON.stringify(user));
        } else {
            console.error('Quadrinho não encontrado.');
        }
    } catch (err) {
        console.error(err);
    }
}

//buscar todos os quadrinhos do usuário logado
function getAllUserComics() {
    try {
        let usuario = usuarioLogado();
        let user = JSON.parse(localStorage.getItem(`usuario-${usuario.email}`));
        if (user && user.quadrinhos) {
            const { lido, lendo, queroLer } = user.quadrinhos;
            return { lido, lendo, queroLer };
        } else {
            console.error('Usuário não encontrado ou sem quadrinhos.');
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

//remover quadrinho por id
async function removeComicsById(id) {
    let comic = await getComicsById(id);
    let usuario = usuarioLogado();
    let user = JSON.parse(localStorage.getItem(`usuario-${usuario.email}`));
    if (comic) {
        let removed = false;
        if (user.quadrinhos.lido.some(item => item.id === comic.id)) {
            user.quadrinhos.lido = user.quadrinhos.lido.filter(item => item.id !== comic.id);
            removed = true;
        } if (user.quadrinhos.lendo.some(item => item.id === comic.id)) {
            user.quadrinhos.lendo = user.quadrinhos.lendo.filter(item => item.id !== comic.id);
            removed = true;
        } if (user.quadrinhos.queroLer.some(item => item.id === comic.id)) {
            user.quadrinhos.queroLer = user.quadrinhos.queroLer.filter(item => item.id !== comic.id);
            removed = true;
        } if (removed) {
            localStorage.setItem(`usuario-${usuario.email}`, JSON.stringify(user));
        }
        //salvar lista autalizada no localStorage
        localStorage.setItem(`usuario-${usuario.email}`, JSON.stringify(user));
    }
}

//buscar quadrinhos do usuário por status
function getUserComicsByStatus(status) {
    try {
        let usuario = usuarioLogado();
        let user = JSON.parse(localStorage.getItem(`usuario-${usuario.email}`));
        if (user && user.quadrinhos) {
            switch (status) {
                case '1':
                    return user.quadrinhos.lido;
                case '2':
                    return user.quadrinhos.lendo;
                case '3':
                    return user.quadrinhos.queroLer;
                default:
                    console.error('Status inválido.');
                    return [];
            }
        } else {
            console.error('Usuário não encontrado ou sem quadrinhos.');
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

//buscar status do quadrinho
function getComicsStatus(id) {
    let usuario = usuarioLogado();
    let user = JSON.parse(localStorage.getItem(`usuario-${usuario.email}`));
    // let status = null;

    let lido = user.quadrinhos.lido.find(item => item.id === id);
    if (lido) {
        return 'lido';
    }
    let lendo = user.quadrinhos.lendo.find(item => item.id === id);
    if (lendo) {
        return 'lendo';
    }
    let queroLer = user.quadrinhos.queroLer.find(item => item.id === id);
    if (queroLer) {
        return 'queroLer';
    }
    return null;
}

function getAverageRating(id) {
    let ratings = JSON.parse(localStorage.getItem('ratings')) || [];
    let comicRatings = ratings[id];

    if (!comicRatings) {
        return;
    }

    document.getElementById('avaliacoes-quadrinhos').classList.remove('d-none');
    let ratingsArray = Object.values(comicRatings);
    let sum = ratingsArray.reduce((a, b) => a + Number(b), 0);
    let average = sum / ratingsArray.length;

    return average.toFixed(1);
}

export { getComicsById, addComicsByStatus, getAllUserComics, removeComicsById, getUserComicsByStatus, getComicsStatus, addComicsToList, getAverageRating };