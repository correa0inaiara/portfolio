const displayValue = document.getElementsByClassName('display-value__text')
const history = document.getElementsByClassName('display-value__history')
const buttons = document.getElementsByClassName('keypad-numbers__num')
addEventListener('click', handleClick, false)
const OPERACAO = { 
	ADDITION: '+', 
	SUBTRACTION: '-', 
	MULTIPLICATION: '*', 
	DIVISION: '/'
}

let operationSelected = null

let nums = []

function handleClick(event) {
	if (event && event.target && event.target.nodeName === 'BUTTON') {
		if (/keypad-numbers__num/.test(event.target.className)) {
			const value = event.target.textContent
			// console.log(event)
			// console.log(buttons)
			// console.log(displayValue)
			setDisplayValue(value, true)
			nums.push(Number(value))
		}
	}
}

/* display */

function getDisplayValue() {
	if (displayValue.length == 1) {
		return displayValue[0].innerHTML
	}
	return false
}

function setDisplayValue(newValue, append = false) {
	if (displayValue.length == 1) {
		if (append) {
			displayValue[0].innerHTML += Number(newValue)
		} else {
			displayValue[0].innerHTML = newValue
		}
	}
}

function toggleClass(element, className) {
	element[0].classList.add(className)
}

/* clear */

function clear() {
	setDisplayValue('')
}

function clearAll() {
	setDisplayValue('')
	setHistory('', false)
	nums = []
}

/* history */

function getHistory() {
	if (history.length === 1) {
		return history[0].innerHTML
	}
}

function setHistory(newValue, append = true) {
	console.log('newValue: ', newValue)
	if (history.length === 1) {
		if (append) {
			history[0].innerHTML += newValue
		} else {
			history[0].innerHTML = newValue
		}
	}
}

/* operations */

function sum() {
	operationSelected = OPERACAO.ADDITION
	const currentValue = getDisplayValue()
	setHistory(currentValue + ' + ')
	clear()
}

function subtraction() {
	operationSelected = OPERACAO.SUBTRACTION
	const currentValue = getDisplayValue()
	setHistory(currentValue + ' - ')
	clear()
}

function multiplication() {
	operationSelected = OPERACAO.MULTIPLICATION
	const currentValue = getDisplayValue()
	setHistory(currentValue + ' * ')
	clear()
}

function division() {
	operationSelected = OPERACAO.DIVISION
	const currentValue = getDisplayValue()
	setHistory(currentValue + ' / ')
	clear()
}

function equal() {
	console.log('operacao selecionada: ', operationSelected)
	console.log('numbers: ', nums)
	let value = 0
	const initialValue = 0
	const currentValue = getDisplayValue()
	setHistory(currentValue + ' = ')

	switch (operationSelected) {
		case '+':
			value = nums.reduce((previousValue, currentValue) => previousValue + currentValue)
			break;
		case '-':
			value = nums.reduce((previousValue, currentValue) => previousValue - currentValue)
			break;
		case '*':
			value = nums.reduce((previousValue, currentValue) => previousValue * currentValue)
			break;
		case '/':
			value = nums.reduce((previousValue, currentValue) => previousValue / currentValue)
			break;
	}
	if (value === Infinity) {
		setDisplayValue('ERR')
	} else {
		setDisplayValue(value)
	}
}

function reduceNums(operation) {
	const value = nums.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue)
}