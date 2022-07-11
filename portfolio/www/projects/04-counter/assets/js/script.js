const initialValue = 0 
let currentValue = initialValue

const updateValue = function (newValue) {
	const currentNumber = document.getElementById('currentNumber')
	currentNumber.innerHTML = newValue
}

const getStepsValue = function () {
	const steps = document.getElementById('steps')
	return Number(steps.value)
}

const increment = function (event) {
	const steps = getStepsValue()
	currentValue += steps
	updateValue(currentValue)
}

const decrement = function (event) {
	const steps = getStepsValue()
	currentValue -= steps
	updateValue(currentValue)
}


