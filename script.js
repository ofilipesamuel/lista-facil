const formulario = document.querySelector('#formTarefa');
const campoTarefa = document.querySelector('#tarefa');
const listaTarefas = document.querySelector('#listaTarefas');
const listaVazia = document.querySelector('#listaVazia');
const mensagem = document.querySelector('#mensagem');
const aumentarTexto = document.querySelector('#aumentarTexto');

let tarefas = JSON.parse(localStorage.getItem('tarefasListaFacil')) || [];

function salvarTarefas() {
  localStorage.setItem('tarefasListaFacil', JSON.stringify(tarefas));
}

function mostrarMensagem(texto) {
  mensagem.textContent = texto;
  setTimeout(function () {
    mensagem.textContent = '';
  }, 1800);
}

function desenharTarefas() {
  listaTarefas.innerHTML = '';
  listaVazia.hidden = tarefas.length > 0;

  tarefas.forEach(function (tarefa, posicao) {
    const item = document.createElement('li');
    if (tarefa.concluida) item.classList.add('concluida');

    const texto = document.createElement('span');
    texto.className = 'texto-tarefa';
    texto.textContent = tarefa.nome;

    const concluir = document.createElement('button');
    concluir.type = 'button';
    concluir.className = 'botao-concluir';
    concluir.textContent = tarefa.concluida ? 'Desfazer' : 'Concluir';
    concluir.setAttribute('aria-label', concluir.textContent + ' tarefa ' + tarefa.nome);
    concluir.addEventListener('click', function () {
      tarefas[posicao].concluida = !tarefas[posicao].concluida;
      salvarTarefas();
      desenharTarefas();
    });

    const excluir = document.createElement('button');
    excluir.type = 'button';
    excluir.className = 'botao-excluir';
    excluir.textContent = 'Excluir';
    excluir.setAttribute('aria-label', 'Excluir tarefa ' + tarefa.nome);
    excluir.addEventListener('click', function () {
      tarefas.splice(posicao, 1);
      salvarTarefas();
      desenharTarefas();
      mostrarMensagem('Tarefa excluída.');
    });

    item.append(texto, concluir, excluir);
    listaTarefas.appendChild(item);
  });
}

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();
  const nome = campoTarefa.value.trim();
  if (nome === '') return;

  tarefas.push({ nome: nome, concluida: false });
  salvarTarefas();
  desenharTarefas();
  campoTarefa.value = '';
  campoTarefa.focus();
  mostrarMensagem('Tarefa adicionada!');
});

aumentarTexto.addEventListener('click', function () {
  document.body.classList.toggle('texto-grande');
});

desenharTarefas();
