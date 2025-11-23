const listaDePublicacao = document.getElementById('lista_publicacoes');
const listaMinhasPublicacoes = document.getElementById('lista_minhas_publicacoes');
const botaoCriarPublicacao = document.getElementById('botaoCriarPublicacao');
const botaoMinhasPublicacao = document.getElementById('botaoMinhasPublicacao');

if (!localStorage.getItem("token")) {
  botaoCriarPublicacao.style.display = "none";
  botaoMinhasPublicacao.style.display = "none";
}

carregarPublicacao();

function carregarPublicacao() {
  fetch('/publicacao')
    .then(res => res.json())
    .then(data => {
      listaDePublicacao.innerHTML = '';
      data.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('card')
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
          <p><strong>Status:</strong> ${p.status}</p>
      `
        listaDePublicacao.append(card);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar publicações:', err);
    });
}