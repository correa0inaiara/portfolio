const criaNovaTarefa = function (inpTarefa, ulTarefas) {
	const li = document.createElement('li')
	li.className = 'tarefas-item'

	let quantidade = 0
	if (ulTarefas.length === 1) {
		quantidade = ulTarefas[0].children.length
	}

	const label = document.createElement('label')
	label.setAttribute('for', 'inp-tarefas-item-' + quantidade)
	label.classList = 'custom-checkbox'
	li.appendChild(label)

	const input = document.createElement('input')
	input.setAttribute('id', 'inp-tarefas-item-' + quantidade)
	input.type = 'checkbox'
	input.name = 'tarefas'
	input.value = inpTarefa.value
	label.appendChild(input)
	
	const span1 = document.createElement('span')
	span1.className = 'custom-checkbox__checkbox'
	label.appendChild(span1)

	const span2 = document.createElement('span')
	span2.className = 'custom-checkbox__label'
	span2.innerHTML = inpTarefa.value
	label.appendChild(span2)

	if (ulTarefas.length === 1) {
		ulTarefas[0].prepend(li)
	}

}

const toggleErro = function (visibilidade, mensagem) {
	const elMensagemErro = document.getElementsByClassName('mensagem-erro')
	if (elMensagemErro.length === 1) {
		if (visibilidade) {
			elMensagemErro[0].innerHTML = mensagem ? mensagem : 'Tarefa não pôde ser adicionada.'
			elMensagemErro[0].style.display = 'block'
		} else {
			elMensagemErro[0].style.display = 'none'
		}
	}
}

const checaTarefaDuplicada = function (novaTarefa) {
	const tarefas = document.getElementsByClassName('tarefas')
	if (tarefas.length === 1) {
		const children = tarefas[0].children
		for (child of children) {
			const input = child.getElementsByTagName('input')
			if (input.length === 1) {
				if (input[0].value === novaTarefa) {
					return true
				}
			}
		}
	}
	return false
}

const adicionarTarefa = function (event) {
	event.preventDefault();
	toggleErro(false)

	const inpTarefa = document.getElementById('inp-tarefa')
	
	if (!inpTarefa.value) {
		toggleErro(true, 'O campo não pode estar vazio.')
		return false
	}

	const tarefaDuplicada = checaTarefaDuplicada(inpTarefa.value)
	if (tarefaDuplicada) {
		toggleErro(true, 'Essa tarefa já foi adicionada.')
		return false
	}

	const ulTarefas = document.getElementsByClassName('tarefas')
	
	criaNovaTarefa(inpTarefa, ulTarefas)
	inpTarefa.value = ''
}