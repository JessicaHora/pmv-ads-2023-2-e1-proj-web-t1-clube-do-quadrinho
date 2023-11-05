import { usuarioLogado } from "../account-service/account-service.js";

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

//adicionar quadrinho por status (lido, lendo, quero ler)
async function addComicsByStatus(status, id) {
    try {
        let user = await usuarioLogado();
        let comic = await getComicsById(id);
        if (comic) {
            //criar copia do quadrinho para adicionar na lista
            const quadrinho = {
                id: comic.id,
                title: comic.title,
                image: comic.image,
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
                    localStorage.removeItem(`usuario-${user.email}-quadrinho${id}-excluir`);
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
            //salvar lista autalizada no localStorage
            localStorage.setItem(`usuario-${user.id}`, JSON.stringify(user));
            //atualizar objeto de usuário no sessionStorage
            sessionStorage.setItem("usuario", JSON.stringify(user));
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
    let user = usuarioLogado();
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
            localStorage.setItem(`usuario-${user.email}`, JSON.stringify(user));
        }
        //salvar lista autalizada no localStorage
        localStorage.setItem(`usuario-${user.email}`, JSON.stringify(user));
        //atualizar objeto de usuário no sessionStorage
        sessionStorage.setItem("usuario", JSON.stringify(user));
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
    let status = null;

    let lido = user.quadrinhos.lido.find(item => item.id === id);
    if (lido) {
        status = 'Lido';
    }
    let lendo = user.quadrinhos.lendo.find(item => item.id === id);
    if (lendo) {
        status = 'Lendo';
    }
    let queroLer = user.quadrinhos.queroLer.find(item => item.id === id);
    if (queroLer) {
        status = 'Quero ler';
    }
    return status;
}

export { getComicsById, addComicsByStatus, getAllUserComics, removeComicsById, getUserComicsByStatus, getComicsStatus };