import { Bd } from '../../../services/lists-service/lists-service.js';

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
        // event.preventDefault();
        let titulo = document.getElementById('titulo').value;
        let tituloInput = document.getElementById('titulo');
        let descricao = document.getElementById('descricao').value;

        let novaLista = new Registro(titulo, descricao);

        if (!novaLista.validarDadosLista()) { 
            validarError();
            validateTitulo();
            tituloInput.addEventListener('keyup', validateTitulo);
        } else {
            bd.criarLista(novaLista);
            validarAcerto();
            // Limpar os campos de entrada
            document.getElementById('titulo').value = '';
            document.getElementById('descricao').value = '';
            setTimeout(() => {
                window.location.href = "../index.html"
            }, 1600);
        }
    });
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