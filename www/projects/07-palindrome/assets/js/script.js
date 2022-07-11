function handleClick(event) {
	event.preventDefault();
	let inpPalindrome = document.getElementById('inp-palindrome')
	let errorMessage = document.getElementById('error-message')

	if (inpPalindrome && errorMessage) {
		if (!inpPalindrome.value) {
			errorMessage.innerHTML = "Oops, there's nothing to check! Please type something.";
			return false;
		}

		if (typeof inpPalindrome.value !== 'string' || !/^[a-zA-Z]+$/.test(inpPalindrome.value)) {
			errorMessage.innerHTML = "Input needs to be a text with letters only, cannot contain symbols, numbers or special characters.";
			return false;
		}
		
		errorMessage.innerHTML = ''

		checkPalindrome(inpPalindrome.value)
	}
}

function checkPalindrome(inpPalindromeValue) {
	const trimmed = inpPalindromeValue.replaceAll(" ", "")
	const lowercase = trimmed.toLowerCase();
	const arr = lowercase.split("")
	const arrReversed = arr.reverse()
	const strReversed = arrReversed.toString().replaceAll(",", "")

	let result = document.getElementById('result')
	if (lowercase !== strReversed) {
		result.innerHTML = "Sorry, your text is not a palindrome! But you can try again if you want.";
	} else {
		result.innerHTML = "Hey, there! You got it right! It's definitely a palindrome!";
	}
}