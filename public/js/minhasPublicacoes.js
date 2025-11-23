const listaMinhasPublicacoes = document.getElementById('lista_minhas_publicacoes');

carregarMinhasPublicacoes();

function carregarMinhasPublicacoes() {
  fetch('/publicacao/minhas-publicacoes', {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then(data => {
      listaMinhasPublicacoes.innerHTML = '';
      data.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${p.imagem_url}" alt="${p.imagem_legenda || 'Pet'}">
          <h4>${p.nome_pet || '(Sem nome)'}</h4>
          <p><strong>Tipo:</strong> ${p.tipo}</p>
          <p><strong>Espécie:</strong> ${p.especie}</p>
          <p><strong>Raça:</strong> ${p.raca}</p>
          <p><strong>Cor:</strong> ${p.cor}</p>
          <p><strong>Genero:</strong> ${p.genero}</p>          
          <p><strong>Telefone:</strong> ${p.telefone}</p>
          <p><strong>Descriação:</strong> ${p.descricao}</p>
          <p><strong>Local:</strong> ${p.localizacao}</p>
          <p><strong>status:</strong> ${p.status}</p>
          <a href="editarPublicacao.html?id=${p.id}">
            <button>Editar</button>
          </a>
          <a>
          <button onclick="excluirPublicacao(${p.id})">Excluir</button>
          </a>
      `
        listaMinhasPublicacoes.append(card);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar publicações:', err);
    });
}


function excluirPublicacao(id) {
  const confirmacao = confirm('Tem certeza que deseja excluir essa publicação?');

  if (!confirmacao) {
    return;
  }

  fetch(`/publicacao/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  })
    .then(() => {
      alert('Publicação deletada com sucesso!');
      carregarMinhasPublicacoes();
    })
}