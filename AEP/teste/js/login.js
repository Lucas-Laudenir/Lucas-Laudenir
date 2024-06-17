
// get pegar algo
// set colocar algo ou troscar os atributos das coisas
// atributo password =  faz a palavra viar colinha 
// text =  atributo de texto 
//type = tipo 
// focus = serve para focar o mause em determinado ponto 
let btn = document.querySelector('.fa-eye')

btn.addEventListener('click',()=>{//função que ao clicar ele faz algo
let inputSenha = document.querySelector('#senha');
if (inputSenha.getAttribute('type') == 'password'){
inputSenha.setAttribute('type','text');
}else{
    inputSenha.setAttribute('type','password');
}
})

function entrar(){
    let usuario = document.querySelector("#usuario");
    let userLabel = document.querySelector("#userLabel");

    let senha = document.querySelector("#senha");
    let senhaLabel = document.querySelector("#senhaLabel");

    let msgError = document.querySelector("#msgError");
    let listaUser = []; 

    let userValid = {
        nome:"",
        user: "",
        senha:""
    
    };
listaUser = JSON.parse(localStorage.getItem("listaUser"));

listaUser.forEach((Element) => {
    if(usuario.value === Element.userCad && senha.value === Element.senhaCad){

        userValid = {
            
            user: Element.userCad,
            CNPJ: Element.CNPJCad,
            nome: Element.nomeEmpresaCad,
            senha: Element.senhaCad
        
        };
    } 
});

if(usuario.value === userValid.user && senha.value === userValid.senha){
    
    setTimeout(()=>{
        window.location.href = "file:///E:/AEP/teste/perfil.html";
    },100);

    let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2);
    localStorage.setItem("token",token);
    localStorage.setItem("userLogado", JSON.stringify(userValid));

}else{
userLabel.setAttribute("style", "color: red");
usuario.setAttribute("style", "border-color: red");
senhaLabel.setAttribute("style", "color: red");
senha.setAttribute("style", "border-color: red");
msgError.setAttribute("style", "display: block");
msgError.innerHTML="Usuario ou Senha incorretos"
usuario.focus();

alert("alert")


}

}