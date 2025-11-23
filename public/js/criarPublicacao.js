const form = document.getElementById('form_publicacao');
const listaDePublicacao = document.getElementById('lista_publicacoes');

form.addEventListener('submit', e => {
  //evitar que a página seja recarregada
  e.preventDefault();

  const imagem_url = document.getElementById('imagem_url').value;
  const imagem_legenda = document.getElementById('imagem_legenda').value;
  const tipo = document.getElementById('tipo').value;
  const nome_pet = document.getElementById('nome_pet').value;
  const especie = document.getElementById('especie').value;
  const raca = document.getElementById('raca').value;
  const cor = document.getElementById('cor').value;
  const telefone = document.getElementById('telefone').value;
  const genero = document.getElementById('genero').value;
  const descricao = document.getElementById('descricao').value;
  const localizacao = document.getElementById('localizacao').value;
  const status = document.getElementById('status').value;

  //chamar a função para cadastrar
  cadastrarPublicacao(imagem_url,
    imagem_legenda,
    tipo,
    nome_pet,
    especie,
    raca,
    cor,
    telefone,
    genero,
    descricao,
    localizacao,
    status
  );
})

function cadastrarPublicacao(imagem_url, imagem_legenda, tipo, nome_pet,
  especie, raca, cor, telefone, genero, descricao, localizacao, status) {
  //fetch() - requisição para o servidor HTTP 
  //endpoint (/api/users/) - rota para o nosso servidor
  fetch('/publicacao', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify({
      imagem_url,
      imagem_legenda,
      tipo,
      nome_pet,
      especie,
      raca,
      cor,
      telefone,
      genero,
      descricao,
      localizacao,
      status
    })
  })
    .then(() => {
      form.reset();
      alert('Publicação Criada com sucesso!');
    })
}