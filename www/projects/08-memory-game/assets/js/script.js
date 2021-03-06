const cardBoxes = document.querySelectorAll('.game .card-box')
let cardsFlipped = []
let sameCards = []
let score = 0
let cardBoardLocked = false

function handleStartGame() {
	const overlay = document.getElementById('overlay')
	overlay.className = 'hide'
	setTimeout(() => {
		showCards()
	}, 200)
}

function showCards() {
	for (var cardBox of cardBoxes) {
		toggleFlip(cardBox.children[0], cardBox.children[1], 'back')
	}
	setTimeout(() => {
		for (var cardBox of cardBoxes) {
			toggleFlip(cardBox.children[0], cardBox.children[1], 'front')
		}
		
		startGame()
	}, 3000)
}

function startGame() {
	addEventListener('click', handleClick, false)
}

function handleClick (event) {
	const element = event.target

	if (element.nodeName === 'IMG') {
		const cardBox = element.parentElement
		const children = cardBox.children
		const cardBoxId = cardBox.id

		if (cardBoardLocked) {
			return;
		}
		
		if (sameCards.length > 0) {
			const found = sameCards.find(item => {
				if (item.card1.id === cardBoxId || item.card2.id === cardBoxId) {
					return item
				}
			})
            
			if (found) return
		}

		cardBox.classList.toggle('flip')
		setTimeout(() => {
			
			flipToBack(children)
			
			const srcChild2 = children[1].src
			if (cardsFlipped.length === 0) {
				cardsFlipped.push({
					id: cardBoxId,
					src: srcChild2
				})
			} else {
				if (cardsFlipped.length === 1) {
					cardBoardLocked = true
					cardsFlipped.push({
						id: cardBoxId,
						src: srcChild2
					})

					if (cardsFlipped[0].id !== cardsFlipped[1].id &&
						cardsFlipped[0].src === cardsFlipped[1].src) {
						sameCards.push({
							card1: cardsFlipped[0],
							card2: cardsFlipped[1]
						})
						sumPoints()
						cardsFlipped = []
						cardBoardLocked = false
					} else {
						flipToFront()
					}
				}
			}
		}, 500)
	}
}

function handleResetScore(event) {
	score = 0
	const scoreEl = document.getElementById('score')
	scoreEl.innerHTML = ' ' + score
}

function handleNewGame(event) {
	sameCards = []
	cardsFlipped = []
	cardBoardLocked = false

	for (var cardBox of cardBoxes) {
		const flipped = cardBox.className === 'card-box flip' ? true : false
		if (flipped) {
			cardBox.classList.remove('flip')
			toggleFlip(cardBox.children[0], cardBox.children[1], 'front')
		}
	}
	
	loadImages()
	showCards()
} 

function loadImages() {
	let srcs = []
	for (var cardBox of cardBoxes) {
		srcs.push({
			id: cardBox.id,
			src: cardBox.children[1].src
		})
	}

	let list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
	list = list.sort(() => Math.random() - 0.5)

	let index = 0
	for (var cardBox of cardBoxes) {
		cardBox.children[1].src = srcs[list[index]].src
		index++
	}

}

function sumPoints() {
	score += 10
	const scoreEl = document.getElementById('score')
	scoreEl.innerHTML = ' ' + score
}

function flipToFront() {
	const cardBox1 = document.getElementById(cardsFlipped[0].id)
	const cardBox1Children = document.getElementById(cardsFlipped[0].id).children
	const cardBox2 = document.getElementById(cardsFlipped[1].id)
	const cardBox2Children = document.getElementById(cardsFlipped[1].id).children

	setTimeout(() => {
		cardBox1.classList.toggle('flip')
		cardBox2.classList.toggle('flip')
		
		setTimeout(() => {

			toggleFlip(cardBox1Children[0], cardBox1Children[1], 'front')
			toggleFlip(cardBox2Children[0], cardBox2Children[1], 'front')
		
			cardsFlipped = []
			cardBoardLocked = false
		}, 500)
	}, 1000)
}

function flipToBack(children) {
	toggleFlip(children[0], children[1], 'back')
}

function toggleFlip(element1, element2, face) {
	element1.style.display = face === 'front' ? 'block' : 'none'
	element2.style.display = face === 'front' ? 'none' : 'block'
}