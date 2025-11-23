const formCadastro = document.getElementById('formCadastro');

formCadastro.addEventListener('submit', e => {
  //evitar que a página seja recarregada
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  //chamar a função para cadastrar
  cadastrarUsuario(nome, email, senha);
})

function cadastrarUsuario(nome, email, senha){
    fetch('/auth/cadastro', {
        method: 'POST',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify({ nome, email, senha })
    })
    .then(() =>{
        formCadastro.reset();
        window.location.href = 'login.html';
    })
}

