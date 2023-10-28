// objeto para tratar dos dados salvos;
class Registro {
    constructor(titulo, registro) {
        this.titulo = titulo,
        this.registro = registro
    }

    validarDadosLista() {

        for(let i in this) {
            
            if(this[i] == '' || this[i] == undefined || this[i] == null) {
                return false;
            }

        }
        return true;
    }

}


// class Bd(), tratar dos dados que vai para o local storage;
class Bd {

    constructor() {
        // colocando id no local storage;
        let id = localStorage.getItem('Id'); // null

        if( id === null) {
            localStorage.setItem('Id', 0);
        }
    }


    // pegando o id, fazendo contar +1;
    getProximoId() {
        let proximoId = localStorage.getItem('Id');
        return parseInt(proximoId)+ 1;
    }

    // funcao gravar, enviar dados para o local storage;
    gravar (d) {

        let id;
        id = this.getProximoId();

        // enviar para o local storage;
        localStorage.setItem(id, JSON.stringify(d));
        localStorage.setItem('Id', id);

    }



    // funcao para recuperar dados do localstorage;
    recuperarDadosStorage() {


        let dados, registros;

        registros = Array();

        dados = localStorage.getItem('Id');


        for( let i = 0; i <= dados; i++) {
            let registro = JSON.parse(localStorage.getItem(i));

            if(registro == null) {
                continue;
            }

            registro.id = i;
            registros.push(registro);
        }

        return registros;
    }

    
    remover(index) {

        let ids = this.recuperarDadosStorage();

        localStorage.removeItem(index)
    
        return ids;
    }
    

}


let bd = new Bd();

// função chamar click, para recuperar todos os dados dos inputs;
chamarClickLista();
function chamarClickLista() {

    document.getElementById('enviarLista').addEventListener('click', ()=> {

        let titulo, descricao;

        titulo = document.getElementById('titulo');
        descricao = document.getElementById('descricao');




        let registro = new Registro(
            titulo.value,
            descricao.value
        );



        if(registro.validarDadosLista()) {

            // gravar os registro dos inputs;
            bd.gravar(registro);

            // zera os inputs
            titulo.value = '';
            descricao.value = '';

            validarAcerto();

        }else {
            validarError();
        }
        
        


    });

}




// funcao carregarLista();
function carregarLista() {

    let registros, dadosBody;

    registros = Array();

    registros = bd.recuperarDadosStorage();




    dadosBody = document.getElementById('tbody')

    registros.forEach( function(r) {

        dadosBody.innerHTML += `

            <div class="listaItem"> 
                <div class="titulo"> ${r.titulo} </div>
                <div class="descricao">
                    <div class="description"> ${r.registro} </div>
                    <div class="editarLista" onclick="editarLista()" > Editar </div>
                    <div class="removerLista" id="remover_${r.id}"> X </div>
                </div>
            </div>

        `;

    });

}



// funcao editar
function editarLista() {
    window.location.href = "./Editar-listas.html";
}

// remover lista;
totalLista();
function totalLista() {

    let registros = Array();
    registros = bd.remover();

    // VALIDAR LISTA VAZIA;
    if( registros.length == 0) {
        document.getElementById('listaVazia').style.display = 'block';
        document.getElementById('thead').style.display = 'none';
    }
    
    registros.forEach( (value, index) => {

        document.querySelectorAll('.removerLista')[index].addEventListener('click', () => {
            
            index++; 

            bd.remover(index);
            window.location.reload();

            if(registros.length < index) {
                index = 1;
            }
            

        });
    })
    
    
}







// validar error();
function validarError() {

    document.getElementById('validar').style.display = 'block';
    document.getElementById('validar').style.backgroundColor = 'red';

    document.getElementById('mensagem1').innerHTML = "Erro na gravação";
    document.getElementById('mensagem1').style.color = '#ffffff';

    document.getElementById('fechar').style.color = 'red';

    document.getElementById('mensagem2').innerHTML = "Existem campos obrigatorios que não foram preenchidos";
    document.getElementById('mensagem2').style.color = '#ffffff';

    document.getElementById('fechar1').style.color = 'red';

    //clicar fechar
    document.getElementById('fechar').addEventListener('click', ()=> {
        document.getElementById('validar').style.display = 'none';
    })

    document.getElementById('fechar1').addEventListener('click', ()=> {
        document.getElementById('validar').style.display = 'none';
    })

}

// validar acerto();
function validarAcerto() {

    document.getElementById('validar').style.display = 'block';
    document.getElementById('validar').style.backgroundColor = 'green';

    document.getElementById('mensagem1').innerHTML = "Registro inserido com sucesso";
    document.getElementById('mensagem1').style.color = '#ffffff';

    document.getElementById('fechar').style.color = 'green';

    document.getElementById('mensagem2').innerHTML = "Despesa foi cadastrada com sucesso";
    document.getElementById('mensagem2').style.color = '#ffffff';

    document.getElementById('fechar1').style.color = 'green';

    //clicar fechar
    document.getElementById('fechar').addEventListener('click', ()=> {
        document.getElementById('validar').style.display = 'none';
    })

    document.getElementById('fechar1').addEventListener('click', ()=> {
        document.getElementById('validar').style.display = 'none';
    })

}

