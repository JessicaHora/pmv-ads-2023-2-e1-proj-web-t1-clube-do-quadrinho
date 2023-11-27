import { Bd } from "../../../services/lists-service/lists-service.js";
import { usuarioLogado } from "../../../services/account-service/account-service.js";


window.addEventListener('load', function () {
    if (!usuarioLogado()) {
        window.location.href = '../../login/login-page.html'
    }
});

class Lista {
    constructor(titulo, descricao, quadrinhos) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.quadrinhos = quadrinhos;
    }
}
let bd = new Bd();
let urlParams = new URLSearchParams(window.location.search);
let idLista = urlParams.get("id");
let lista = bd.lerListasPorId(idLista);

function carregarLista(lista) {
    document.getElementById('titulo').value = lista.titulo;
    document.getElementById('descricao').value = lista.descricao;
    document.title = `Editar lista - ${lista.titulo}`;

    document.getElementById('enviarLista').addEventListener('click', (event) => {
        event.preventDefault();
        let titulo = document.getElementById('titulo').value;
        let descricao = document.getElementById('descricao').value;
        let novaLista = new Lista(titulo, descricao, lista.quadrinhos);
        bd.atualizarLista(idLista, novaLista);
        //toast de sucesso
        let toastElement = document.querySelector('.toast');
        toastElement.classList.add('bg-tertiary-light', 'text-white');
        let toast = new bootstrap.Toast(toastElement);
        document.querySelector('.toast-body').innerHTML = 'Lista atualizada com sucesso!';
        toast.show();
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);
    });

}

function carregarQuadrinhos(idLista, status, id) {
    let lista = bd.lerListasPorId(idLista);
    let div = document.getElementById(id);
    let p = document.querySelector(`#${id} p`);
    if (lista.quadrinhos[status].length === 0) {
        p.classList.remove('d-none');
    } else {
        p.classList.add('d-none');
        div.className = ""
        lista.quadrinhos[status].forEach(comic => {
            let comicCard = document.createElement('div');
            comicCard.className = 'card mb-3 d-flex flex-row mt-3 ';
            let cardBody = document.createElement('div');
            cardBody.className = 'card-body d-flex flex-row p-1';
            let img = document.createElement('img');
            img.className = 'img-fluid mr-3 img-thumbnail';
            img.style.maxWidth = '60px';
            img.style.maxHeight = '170px';
            img.src = comic.image;
            let h5 = document.createElement('h5');
            h5.className = 'card-title title-small ps-3 pt-2';
            h5.innerHTML = comic.title;
            let excluir = document.createElement('a');
            excluir.style.cursor = 'pointer';
            excluir.title = 'Excluir quadrinho';
            excluir.className = 'ms-auto align-self-center p-2';
            let excluirIcon = document.createElement('i');
            excluirIcon.className = 'bi bi-x-lg text-danger';
            excluir.appendChild(excluirIcon);
            excluir.addEventListener('click', () => {
                bd.excluirQuadrinhoLista(idLista, comic.id);
                lista = bd.lerListasPorId(idLista);
                bd.atualizarLista(idLista, lista);
                
                //toast de sucesso
                let toastElement = document.querySelector('.toast');
                toastElement.classList.add('bg-tertiary-light', 'text-white');
                let toast = new bootstrap.Toast(toastElement);
                document.querySelector('.toast-body').innerHTML = 'Quadrinho excluído com sucesso!';
                toast.show();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            });
            cardBody.appendChild(excluir);
            cardBody.appendChild(img);
            cardBody.appendChild(h5);
            cardBody.appendChild(excluir);
            comicCard.appendChild(cardBody);
            div.appendChild(comicCard);
        });
    }
}

function renderizarQuadrinhosLista() {
    let urlParams = new URLSearchParams(window.location.search);
    let idLista = urlParams.get("id");
    carregarQuadrinhos(idLista, 'lido', 'quadrinhos-lidos');
    carregarQuadrinhos(idLista, 'lendo', 'quadrinhos-lendo');
    carregarQuadrinhos(idLista, 'queroLer', 'quadrinhos-queroler');
}

renderizarQuadrinhosLista();

carregarLista(lista);