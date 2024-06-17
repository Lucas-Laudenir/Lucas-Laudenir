document.addEventListener("DOMContentLoaded", function() {
  verificarUsuarioLogado(); // Verificar se há um usuário logado
  buscarEmpresas();
  buscarProjetos();
});

function verificarUsuarioLogado() {
  const userLogado = JSON.parse(localStorage.getItem("userLogado"));

  if (!userLogado) {
    // Não há usuário logado, redirecionar para página de login ou fazer outra ação apropriada
    console.log("Usuário não logado. Redirecionar ou tomar ação adequada.");
    window.location.href = "file:///E:/AEP/teste/login.html"; // Redirecionar para a página de login
    return;
  }

  // Se necessário, você pode usar as informações do usuário logado aqui
  console.log(`Usuário logado: ${userLogado.user}`);
}

function buscarProjetos() {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';

  const projetos = [
    { nome: 'Projeto A', hora: '2h', descricao: 'Descrição do Projeto A.', comentarios: [] },
    { nome: 'Projeto B', hora: '5h', descricao: 'Descrição do Projeto B.', comentarios: [] },
    { nome: 'Projeto C', hora: '3h', descricao: 'Descrição do Projeto C.', comentarios: [] },
    { nome: 'Projeto D', hora: '4h', descricao: 'Descrição do Projeto D.', comentarios: [] }
  ];

  projetos.forEach(projeto => {
    const postElement = criarPost(projeto.nome, projeto.hora, projeto.descricao);
    const comentarioBtn = postElement.querySelector('.comment');
    comentarioBtn.onclick = function() {
      comentarPost(projeto, postElement);
    };
    postsContainer.appendChild(postElement);

    // Carregar comentários persistidos ao recarregar a página
    const comentariosPersistidos = getComentariosPersistidos(projeto.nome);
    projeto.comentarios = comentariosPersistidos;
    atualizarComentarios(postElement, projeto.comentarios);
  });
}

function buscarEmpresas() {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';

  const empresas = [
    { nome: 'Empresa X', hora: '3h', descricao: 'Descrição da Empresa X.', comentarios: [] },
    { nome: 'Empresa Y', hora: '6h', descricao: 'Descrição da Empresa Y.', comentarios: [] }
  ];

  empresas.forEach(empresa => {
    const postElement = criarPost(empresa.nome, empresa.hora, empresa.descricao);
    const comentarioBtn = postElement.querySelector('.comment');
    comentarioBtn.onclick = function() {
      comentarPost(empresa, postElement);
    };
    postsContainer.appendChild(postElement);

    // Carregar comentários persistidos ao recarregar a página
    const comentariosPersistidos = getComentariosPersistidos(empresa.nome);
    empresa.comentarios = comentariosPersistidos;
    atualizarComentarios(postElement, empresa.comentarios);
  });
}

function criarPost(nome, hora, descricao) {
  const post = document.createElement('li');
  post.className = 'post';

  post.innerHTML = `
    <div class="infoUserPost">
      <div class="imgUserPost"></div>
      <div class="nameAndHour">
        <strong>${nome}</strong>
        <p>${hora}</p>
      </div>
    </div>
    <p><strong>${descricao}</strong></p>
    <div class="comentarios"></div>
    <div class="actionBtnPost">
      <button type="button" class="filesPost like" onclick="salvarPost(this)"><img src="./media/assets/heart.svg" alt="Salvar">Salvar</button>
      <button type="button" class="filesPost comment"><img src="./media/assets/comment.svg" alt="Comentar">Comentar</button>
      <button type="button" class="filesPost share" onclick="compartilharPost(this)"><img src="./media/assets/share.svg" alt="Compartilhar">Compartilhar</button>
    </div>
  `;

  return post;
}

function salvarPost(button) {
  alert('Post salvo!');
}

function comentarPost(item, postElement) {
  const userLogado = JSON.parse(localStorage.getItem("userLogado"));
  const comentario = prompt('Digite seu comentário:');

  if (!comentario) return; // Cancelou o prompt

  // Atualizar a lista de comentários persistidos
  const comentariosPersistidos = getComentariosPersistidos(item.nome);
  item.comentarios = comentariosPersistidos;

  // Formatar o comentário com o nome da empresa em negrito
  const comentarioFormatado = `<strong>${userLogado.nome}</strong>: ${comentario}`;
  item.comentarios.push(comentarioFormatado);
  atualizarComentarios(postElement, item.comentarios);

  // Salvar comentários no Local Storage
  salvarComentariosPersistidos(item.nome, item.comentarios);
}

function compartilharPost(button) {
  alert('Post compartilhado!');
}

function atualizarComentarios(postElement, comentarios) {
  const comentariosContainer = postElement.querySelector('.comentarios');
  comentariosContainer.innerHTML = '';

  comentarios.forEach((comentario, index) => {
    const comentarioElement = document.createElement('p');
    comentarioElement.innerHTML = comentario; // Usar innerHTML para manter o formato

    // Adicionar botão para apagar comentário
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'deletar';
    deleteButton.className = 'delete-comment button-x';
    deleteButton.onclick = function() {
      deletarComentario(postElement, index);
    };

    comentarioElement.appendChild(deleteButton);
    comentariosContainer.appendChild(comentarioElement);
  });
}

function deletarComentario(postElement, index) {
  const projetoNome = postElement.querySelector('strong').textContent;
  let comentarios = getComentariosPersistidos(projetoNome);

  // Remover o comentário da lista de comentários
  comentarios.splice(index, 1);
  
  // Atualizar a lista de comentários no localStorage
  salvarComentariosPersistidos(projetoNome, comentarios);

  // Atualizar a interface com a lista de comentários atualizada
  atualizarComentarios(postElement, comentarios);
}

function salvarComentariosPersistidos(chave, comentarios) {
  localStorage.setItem(chave, JSON.stringify(comentarios));
}

function getComentariosPersistidos(chave) {
  const comentarios = localStorage.getItem(chave);
  return comentarios ? JSON.parse(comentarios) : [];
}

function editarPerfil() {
  window.location.href = "file:///E:/AEP/teste/perfil.html";
}

function logout() {
  localStorage.removeItem("userLogado");
  localStorage.removeItem("token");
  window.location.href = "file:///E:/AEP/teste/cadastro.html"; // Redirecionar para a página de login
}

function realizarPesquisa() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const posts = document.querySelectorAll('.posts-list .post');

  let encontrouResultado = false;

  posts.forEach(post => {
    const postText = post.textContent.toLowerCase();
    if (postText.includes(query)) {
      post.style.display = '';
      encontrouResultado = true;
    } else {
      post.style.display = 'none';
    }
  });

  if (!encontrouResultado) {
    alert('Nenhuma empresa ou projeto encontrado.');
  }
}
