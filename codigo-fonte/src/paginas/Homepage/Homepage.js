import { usuarioLogado } from "../../services/account-service/account-service.js";

window.addEventListener('load', function () {
     if (!usuarioLogado()) {
      window.location.href = '../login/login-page.html'
    }
});

function renderizarQuadrinho(quadrinhos, id) {
    let div = document.getElementById(id);
    let p = document.querySelector(`#${id} p`);
    if (quadrinhos.length === 0) {
        p.classList.remove('d-none');
    } else {
        p.classList.add('d-none');
        div.className = "row col-12 d-flex"
        quadrinhos.forEach(comic => {
            let card = document.createElement('div');
            card.className = "card col-lg-2 col-md-3 col-sm-4 m-3 p-0 shadow-sm"
            let cardBody = document.createElement('div');
            cardBody.className = "card-body p-2"
            let imgLink = document.createElement('a');
            imgLink.href = `../paginaQuadrinho/quadrinho.html?id=${comic.id}`;
            let img = document.createElement('img');
            img.className = "card-img capa-quadrinho w-100 h-80"
            let thumbnailUrl = comic.image.replace('zoom=1', 'zoom=0').replace('http', 'https');
            img.src = thumbnailUrl;
            let title = document.createElement('h5');
            title.className = "card-title text-center mb-0 pt-2";
            let titleLink = document.createElement('a');
            titleLink.className = "text-decoration-none text-black title-small";
            titleLink.href = `../paginaQuadrinho/quadrinho.html?id=${comic.id}`;
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

function renderizarQuadrinhos() {
    let usuario = usuarioLogado();
    let user = JSON.parse(localStorage.getItem(`usuario-${usuario.email}` )) || {};
    renderizarQuadrinho(user.quadrinhos.lido, 'quadrinhos-lidos');
    renderizarQuadrinho(user.quadrinhos.lendo, 'quadrinhos-lendo');
    renderizarQuadrinho(user.quadrinhos.queroLer, 'quadrinhos-queroler');
}

renderizarQuadrinhos();