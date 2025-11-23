const formLogin = document.getElementById('form_login');

formLogin.addEventListener('submit', e => {
  //evitar que a página seja recarregada
  e.preventDefault();

  const email = document.getElementById('email_login').value;
  const senha = document.getElementById('senha_login').value;

  //chamar a função para cadastrar
  validarLogin(email, senha);
})

function validarLogin(email, senha){
    fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify({ email, senha })
    })
    .then(res => res.json())
    .then(data =>{
        localStorage.setItem('token', data.token);
        formLogin.reset();
        window.location.href = 'index.html';
    })
}