// clear = remore todos os itens
//removeItem = remove de forma especifica
// length = é usada em JavaScript para determinar o número de elementos em um array, o número de caracteres em uma string, ou a quantidade de elementos de outros objetos que suportam essa propriedade.

//Como pegar e converter imagens chat (estudar depois)
const input = document.getElementById('imag');

input.addEventListener('change', function() {
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const imgElement = document.createElement('img');
            imgElement.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Define as dimensões do canvas para as da classe .foto-perfil
                canvas.width = 100;
                canvas.height = 100;

                // Limpa o canvas antes de desenhar
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Calcula as dimensões da imagem para se ajustar ao círculo
                const ratio = Math.min(canvas.width / imgElement.width, canvas.height / imgElement.height);
                const width = imgElement.width * ratio;
                const height = imgElement.height * ratio;

                // Centraliza a imagem no canvas
                ctx.drawImage(imgElement, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);

                // Converte o canvas para a URL de dados da imagem
                let dataURL = canvas.toDataURL('image/png');

                localStorage.setItem("imagem",JSON.stringify(dataURL));// armazen no localStorage

                // Substitui a imagem existente pela nova imagem carregada dinamicamente
                const fotoPerfil = document.querySelector('.foto-perfil');
                fotoPerfil.src = dataURL;
            };

            imgElement.src = e.target.result;
        };
3
        reader.readAsDataURL(file);
    }
});
 
//como mostrar a imagen armazernada 
document.addEventListener("DOMContentLoaded", function() {
    // Recuperar tipoEmpresa do localStorage
    const tipoImagemArmazenado = localStorage.getItem("imagem");
  
    // Converter de volta para um objeto JavaScript
    const tipoImagemObj = JSON.parse(tipoImagemArmazenado);
  
    // Agora exibir no HTML
    const conteudoElement = document.getElementById('foto');
    conteudoElement.src = tipoImagemObj;// src necessario para mostrar a imagem 
    
  });

// Armazenar o timo de empresa e Apresentar
document.getElementById('btnTipoEmpresa').addEventListener('click', function() {
    let tipoEmpresa = {
        tipoEmpresaCad:""  
    };
    
    tipoEmpresa.tipoEmpresaCad = document.getElementById('Tipo').value;
    document.getElementById('Tipo').value = '';
    document.getElementById('apresentarTipo').textContent = tipoEmpresa.tipoEmpresaCad;
    
    localStorage.setItem("tipoEmpresa",JSON.stringify(tipoEmpresa));

    });

    // Agora vamos recuperar e exibir no HTML
    document.addEventListener("DOMContentLoaded", function() {
        // Recuperar tipoEmpresa do localStorage
        const tipoEmpresaArmazenado = localStorage.getItem("tipoEmpresa");
      
        // Converter de volta para um objeto JavaScript
        const tipoEmpresaObj = JSON.parse(tipoEmpresaArmazenado);
      
        // Agora exibir no HTML
        const conteudoElement = document.getElementById('apresentarTipo');
        conteudoElement.textContent = `${tipoEmpresaObj.tipoEmpresaCad}`;
        
      });
    
// Armazenar o tipo ODS e Apresentar
document.getElementById('btnApresentarODS').addEventListener('click', function() {
    let tipoODS = {
        tipoODSCad:""  
    };
    
    tipoODS.tipoODSCad = document.getElementById('ODS').value;
    document.getElementById('ODS').value = '';
    document.getElementById('apresentarODS').textContent = tipoODS.tipoODSCad;
    console.log(tipoODS);
    localStorage.setItem("tipoODS",JSON.stringify(tipoODS));
});  

 // Agora vamos recuperar e exibir no HTML
 document.addEventListener("DOMContentLoaded", function() {
    // Recuperar tipoEmpresa do localStorage
    const tipoODSArmazenado = localStorage.getItem("tipoODS");
  
    // Converter de volta para um objeto JavaScript
    const tipoODSObj = JSON.parse(tipoODSArmazenado);
  
    // Agora exibir no HTML
    const conteudoElement = document.getElementById('apresentarODS');
    conteudoElement.textContent = `${tipoODSObj.tipoODSCad}`;
    
  });
// apresentando a descrição da empresa
  document.getElementById('botao').addEventListener('click', function() {
    let textareaEmpresa = {
        textareaCad:""  
    };
    textareaEmpresa.textareaCad = document.getElementById('textarea').value;
    localStorage.setItem("textareaEmpresa",JSON.stringify(textareaEmpresa));
    });

    //Agora vamos recuperar e exibir no HTML
    document.addEventListener("DOMContentLoaded", function() {
        // Recuperar tipoEmpresa do localStorage
        const tipoTextareaArmazenado = localStorage.getItem("textareaEmpresa");
      
        // Converter de volta para um objeto JavaScript
        const tipoTextareaObj = JSON.parse(tipoTextareaArmazenado);
      
        // Agora exibir no HTML
        const conteudoElement = document.getElementById('textarea');
        conteudoElement.textContent = `${tipoTextareaObj.textareaCad}`;
        
      });

// Mostra o Nome da empresa no HTML
document.addEventListener("DOMContentLoaded", function() {
    // Obter o token do localStorage
    let token = localStorage.getItem("token");
    // Verificar se há um usuário logado com o token
    if (token) {
        // Obter o usuário logado do localStorage
        let userLogado = JSON.parse(localStorage.getItem("userLogado"));
        
        // Atualizar o elemento HTML com o nome da empresa do usuário logado
        if (userLogado && userLogado.nome) {
            document.getElementById('nomeEmpresa1').innerText = userLogado.nome;
        }
    }
});


// Só entra com token
document.addEventListener("DOMContentLoaded", function() {
    // Obter o token do localStorage
    let token = localStorage.getItem("token");
    // Verificar se há um usuário logado com o token
    if (token) {
        // Obter o usuário logado do localStorage
        let userLogado = JSON.parse(localStorage.getItem("userLogado"));
        
        // Atualizar o elemento HTML com o nome da empresa do usuário logado
        if (userLogado && userLogado.CNPJ) {
            document.getElementById('CNPJ').innerText = userLogado.CNPJ;
        }
    }
});


function feed (){
    setTimeout(()=>{
        window.location.href = "file:///E:/AEP/teste/busca.html";
    },100);
}

// Alerta de usuário sem token 
if(localStorage.getItem("token") == null){
    alert("Você precisa estar logado para acessar esse site")
    setTimeout(()=>{
        window.location.href = "file:///E:/AEP/teste/cadastro.html";
    },100);
}
// Sair do Perfil
function sair(){
localStorage.removeItem("token")
setTimeout(()=>{
    window.location.href = "file:///E:/AEP/teste/login.html";
},100);
}