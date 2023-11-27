import { Bd } from "../../../services/lists-service/lists-service.js";
import { usuarioLogado } from "../../../services/account-service/account-service.js";

window.addEventListener('load', function () {
    if (!usuarioLogado()) {
     window.location.href = '../../login/login-page.html'
   }
});

let urlParams = new URLSearchParams(window.location.search);
let idLista = urlParams.get("id");
let bd = new Bd;



function renderizarQuadrinhosLista(id, status) {
    let lista = bd.lerListasPorId(idLista);
    let div = document.getElementById(id);
    let p = document.querySelector(`#${id} p`);
    if (lista.quadrinhos[status].length === 0) {
        p.classList.remove('d-none');
    } else {
        p.classList.add('d-none');
        div.className = "row col-12 d-flex"
        lista.quadrinhos[status].forEach(comic => {
            document.title = `${lista.titulo}`;
            let card = document.createElement('div');
            card.className = "card col-lg-2 col-md-3 col-sm-4 m-3 p-0 shadow-sm"
            let cardBody = document.createElement('div');
            cardBody.className = "card-body p-2"
            let imgLink = document.createElement('a');
            imgLink.href = `../../paginaQuadrinho/quadrinho.html?id=${comic.id}`;
            let img = document.createElement('img');
            img.className = "card-img capa-quadrinho w-100 h-80"
            let thumbnailUrl = comic.image.replace('zoom=1', 'zoom=0').replace('http', 'https');
            img.src = thumbnailUrl;
            let title = document.createElement('h5');
            title.className = "card-title text-center mb-0";
            let titleLink = document.createElement('a');
            titleLink.className = "text-decoration-none text-black title-small";
            titleLink.href = `../../paginaQuadrinho/quadrinho.html?id=${comic.id}`;
            titleLink.innerHTML = comic.title;
            imgLink.appendChild(img);
            title.appendChild(titleLink);
            cardBody.appendChild(imgLink);
            cardBody.appendChild(title);
            card.appendChild(cardBody);
            div.appendChild(card);
        });
    }
}

function renderizarLista() {
    let lista = bd.lerListasPorId(idLista);
    document.title = `${lista.titulo}`;
    document.querySelector('h1').innerHTML = `${lista.titulo}`;
    document.getElementById('descricao').textContent = `${lista.descricao}`
    renderizarQuadrinhosLista('quadrinhos-lidos', 'lido');
    renderizarQuadrinhosLista('quadrinhos-lendo', 'lendo');
    renderizarQuadrinhosLista('quadrinhos-queroler', 'queroLer');
}

renderizarLista();