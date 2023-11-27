import { usuarioLogado } from "../account-service/account-service.js";

class Bd {
    constructor() {
        this.usuario = usuarioLogado()
    }

    //criar uma nova lista
    criarLista(lista) {
        let usuario = usuarioLogado(); 
        let user = JSON.parse(localStorage.getItem(`usuario-${usuario.id}`));
        user.listas.push(lista);
        //atualizando o usuario no local storage
        localStorage.setItem(`usuario-${user.id}`, JSON.stringify(user));
        //atualizar objeto de usuário no sessionStorage
        sessionStorage.setItem("usuario", JSON.stringify(user));
    }

    //ler uma lista especifica do usuario
    lerListasPorId(id) {
        let user = usuarioLogado();
        return localStorage.getItem(`usuario-${this.usuario.id}`) ? JSON.parse(localStorage.getItem(`usuario-${this.usuario.id}`)).listas.find(lista => lista.id === id) : [];
    }

    //atualizar uma lista
    atualizarLista(listaId, novaLista) {
        let usuario = usuarioLogado();
        let user = JSON.parse(localStorage.getItem(`usuario-${usuario.id}`));
        let lista = user.listas.find(lista => lista.id === listaId);
        Object.assign(lista, novaLista);
        //atualizando o usuario no local storage
        localStorage.setItem(`usuario-${this.usuario.id}`, JSON.stringify(user));
        //atualizar objeto de usuário no sessionStorage
        sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
    }

    //excluir uma lista
    excluirLista(listaId) {
        let usuario = usuarioLogado();
        let user = JSON.parse(localStorage.getItem(`usuario-${usuario.id}`));
        let toastConfirmacao = new bootstrap.Toast(document.getElementById('toastConfirmacao'), { autohide: false });
        toastConfirmacao.show();

        document.getElementById('btnConfirmar').addEventListener('click', () => {
            user.listas = user.listas.filter(lista => lista.id !== listaId);
            localStorage.setItem(`usuario-${this.usuario.id}`, JSON.stringify(user));
            sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
            toastConfirmacao.hide();
            //toast de sucesso
            let toastSucesso = new bootstrap.Toast(document.querySelector('.toastSucesso'));
            document.querySelector('.bodySucesso').innerHTML = 'Lista excluída com sucesso!';
            toastSucesso.show();
            setTimeout(() => {
                window.location.reload();
            }, 1600);            
        });
    }
    //excluir qudrinho de uma lista
    excluirQuadrinhoLista(listaId, quadrinhoId) {
        let usuario = usuarioLogado();
        let lista = usuario.listas.find(lista => lista.id === listaId);
        if (lista) {
            ['lido', 'lendo', 'queroLer'].forEach(status => {
                if (lista.quadrinhos[status].some(quadrinho => quadrinho.id === quadrinhoId)) {
                    lista.quadrinhos[status] = lista.quadrinhos[status].filter(quadrinho => quadrinho.id !== quadrinhoId);
                    //atualizando o usuario no local storage
                    localStorage.setItem(`usuario-${usuario.id}`, JSON.stringify(usuario));
                    //atualizar objeto de usuário no sessionStorage
                    sessionStorage.setItem("usuario", JSON.stringify(usuario));
                }
            });
        }
    }

    // funcao para recuperar dados do localstorage;
    recuperarDadosStorage() {
        return localStorage.getItem(`usuario-${this.usuario.id}`) ? JSON.parse(localStorage.getItem(`usuario-${this.usuario.id}`)).listas : [];
    }
}

export { Bd }