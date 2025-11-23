const form = document.getElementById('form_editar_publicacao');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch(`/publicacao/${id}`)
  .then(res => res.json())
  .then(p => {
    document.getElementById('imagem_url').value = p.imagem_url;
    document.getElementById('imagem_legenda').value = p.imagem_legenda;
    document.getElementById('tipo').value = p.tipo;
    document.getElementById('nome_pet').value = p.nome_pet;
    document.getElementById('especie').value = p.especie;
    document.getElementById('raca').value = p.raca;
    document.getElementById('cor').value = p.cor;
    document.getElementById('genero').value = p.genero;
    document.getElementById('telefone').value = p.telefone;
    document.getElementById('descricao').value = p.descricao;
    document.getElementById('localizacao').value = p.localizacao;
    document.getElementById('status').value = p.status;
  })

// monta o objeto para envio 
form.addEventListener('submit', e => {
  e.preventDefault();

  const dadosAtualizados = {
    imagem_url: document.getElementById('imagem_url').value,
    imagem_legenda: document.getElementById('imagem_legenda').value,
    tipo: document.getElementById('tipo').value,
    nome_pet: document.getElementById('nome_pet').value,
    especie: document.getElementById('especie').value,
    raca: document.getElementById('raca').value,
    cor: document.getElementById('cor').value,
    genero: document.getElementById('genero').value,
    telefone: document.getElementById('telefone').value,
    descricao: document.getElementById('descricao').value,
    localizacao: document.getElementById('localizacao').value,
    status: document.getElementById('status').value
  };

  atualizarPublicacao(id, dadosAtualizados)
});


function atualizarPublicacao(id, dadosAtualizados) {
  fetch(`/publicacao/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')  
     },
    body: JSON.stringify(dadosAtualizados)
  })
  .then(() => {
    alert('Publicação atualizada com sucesso!');
    window.location.href = 'minhasPublicacoes.html';
  })
}