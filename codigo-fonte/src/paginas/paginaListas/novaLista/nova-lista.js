import { Bd } from '../../../services/lists-service/lists-service.js';
import { getComicsById, addComicsToList } from '../../../services/comics-service/comics-service.js';

class Registro {
    constructor(titulo, descricao) {
        this.id = Math.random().toString(36).substring(2, 9)
        this.titulo = titulo,
        this.descricao = descricao,
        this.quadrinhos = {
            lido: [],
            lendo: [],
            queroLer: []
        };
    }

    validarDadosLista() {
        for (let i in this) {
            if (i === 'descricao') continue; //ignora o campo descricao
            if (this[i] == '' || this[i] == undefined || this[i] == null) {
                return false;
            }
        }
        return true;
    }
}

let bd = new Bd();

chamarClickLista()
function chamarClickLista() {
    document.getElementById('enviarLista').addEventListener('click', (event) => {
        event.preventDefault();
        let titulo = document.getElementById('titulo').value;
        let tituloInput = document.getElementById('titulo');
        let descricao = document.getElementById('descricao').value;
        let quadrinhoId = localStorage.getItem('quadrinhoParaAdicionar');
        let novaLista = new Registro(titulo, descricao);

        if (!novaLista.validarDadosLista()) {
            validarError();
            validateTitulo();
            tituloInput.addEventListener('keyup', validateTitulo);
        } else {
            bd.criarLista(novaLista);
            validarAcerto();

            if (quadrinhoId) {
                getComicsById(quadrinhoId)
                    .then(comic => {
                        addComicsToList(comic, novaLista.id);
                        localStorage.removeItem('quadrinhoParaAdicionar');
                        setTimeout(() => {
                            validarQuadrinhoAdicionado();
                        }, 1000);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
            // Limpar os campos de entrada
            document.getElementById('titulo').value = '';
            document.getElementById('descricao').value = '';
            setTimeout(() => {
                window.location.href = "../index.html"
            }, 2100);
        }
    });
}

carregarQuadrinho();
function carregarQuadrinho() {
    let quadrinhoId = localStorage.getItem('quadrinhoParaAdicionar');
    let divQuadrinho = document.getElementById('quadrinho');
    if (quadrinhoId) {
        getComicsById(quadrinhoId)
            .then(comic => {
                let comicCard = document.createElement('div');
                comicCard.className = 'card w-auto mb-3 d-flex flex-row mt-3 align';
                let cardBody = document.createElement('div');
                cardBody.className = 'card-body d-flex flex-row';
                let img = document.createElement('img');
                img.className = 'img-fluid mr-3 img-thumbnail capa-quadrinho';
                img.style.maxWidth = '50px';
                img.style.maxHeight = '170px';
                img.src = comic.volumeInfo.imageLinks.thumbnail;
                let h5 = document.createElement('h5');
                h5.className = 'card-title title-small ps-3';
                h5.innerHTML = comic.volumeInfo.title;
                let excluir = document.createElement('a');
                excluir.style.cursor = 'pointer';
                excluir.title = 'Excluir quadrinho';
                excluir.className = 'ms-auto align-self-center';
                let excluirIcon = document.createElement('i');
                excluirIcon.className = 'bi bi-x-lg text-danger';
                excluir.appendChild(excluirIcon);
                excluir.addEventListener('click', () => {
                    localStorage.removeItem('quadrinhoParaAdicionar');
                    window.location.reload();
                });
                cardBody.appendChild(excluir);
                cardBody.appendChild(img);
                cardBody.appendChild(h5);
                cardBody.appendChild(excluir);
                comicCard.appendChild(cardBody);
                divQuadrinho.appendChild(comicCard);
                divQuadrinho.classList.add('col-md-10')
            })
            .catch(err => {
                console.error(err);
            });
    } else {
        let listaVazia = document.createElement('p');
        listaVazia.className = 'text-muted';
        listaVazia.innerHTML = 'Sua lista está vazia.';
        divQuadrinho.appendChild(listaVazia);
    }
}

//validar input titulo
function validateTitulo() {
    let tituloErro = document.getElementById('tituloErro');
    let titulo = document.getElementById('titulo');
    if (titulo.value == '') {
        titulo.classList.add('border-danger');
        tituloErro.classList.remove('d-none');
    } else {
        titulo.classList.remove('border-danger');
        tituloErro.classList.add('d-none');
    }
}

// validar error();
function validarError() {
        let toastElement = document.querySelector('.toast');
        toastElement.classList.add('bg-danger', 'text-white');
        let toast = new bootstrap.Toast(toastElement);
        document.querySelector('.toast-body').innerHTML = 'Campo título deve ser preenchido.';
        toast.show();
}

// validar acerto();
function validarAcerto() {
    let toastElement = document.querySelector('.toast');
    toastElement.classList.remove('bg-danger', 'text-white');
    toastElement.classList.add('bg-tertiary-light', 'text-white');
    let toast = new bootstrap.Toast(toastElement);
    document.querySelector('.toast-body').innerHTML = 'Sua lista foi cadastrada com sucesso!';
    toast.show();
}

// validar quadrinho adicionado
function validarQuadrinhoAdicionado() {
    let toastElement = document.querySelector('.toast');
    toastElement.classList.remove('bg-danger', 'text-white');
    toastElement.classList.add('bg-tertiary-light', 'text-white');
    let toast = new bootstrap.Toast(toastElement);
    document.querySelector('.toast-body').innerHTML = 'Quadrinho adicionado com sucesso!';
    toast.show();
}