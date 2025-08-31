let hiddenNumber;
let score = 0;
let attempts = 0;
const maxAttempts = 3;

// DOM ELEMENTS 
const numberBox = document.getElementById('numberBox');
const checkButton = document.getElementById('checkButton');
const changeColorButton = document.getElementById('changeColorButton');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const radioButtons = document.querySelectorAll('input[name="choice"]');


// Function to generate a random number between 1 and 4
function getRandom() {
    return Math.floor(Math.random() * 4) + 1;
}

// Function to check the user's guess
function checkGuess() {
    // Find which radio button is selected
    let selectedValue;
    for (const radio of radioButtons) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }
    
    // Check if user selected a value
    if (!selectedValue) {
        feedback.textContent = 'Please select a number!';
        feedback.style.color = 'orange';
        return;
    }
    
    attempts++;
    
    // Check if guess is correct
    if (parseInt(selectedValue) === hiddenNumber) {
        feedback.textContent = 'Correct! Well done!';
        feedback.style.color = 'lightgreen';
        numberBox.textContent = hiddenNumber;
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        
        // Wait 2 seconds then start a new round
        setTimeout(initGame, 2000);
    } else {
        feedback.textContent = `Wrong! ${maxAttempts - attempts} attempts left.`;
        feedback.style.color = 'red';
        
        // If out of attempts
        if (attempts >= maxAttempts) {
            feedback.textContent = `Game over! The number was ${hiddenNumber}.`;
            numberBox.textContent = hiddenNumber;
            
            // Wait 2 seconds then start a new round
            setTimeout(initGame, 2000);
        }
    }
}

// For loop to clear radio buttons
function clearRadioButtons() {
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }
}

// While loop to count down before new game
function countdownBeforeNewGame() {
    let count = 3;
    const countdownInterval = setInterval(() => {
        if (count > 0) {
            feedback.textContent = `New game in ${count}...`;
            count--;
        } else {
            clearInterval(countdownInterval);
            initGame();
        }
    }, 1000);
}


// Check button click
checkButton.addEventListener('click', checkGuess);

// Change background color
changeColorButton.addEventListener('click', function() {
    const colors = ['#2f4f4f', '#2c3e50ff', '#34495e', '#2c3e50', '#16a085'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
});

// Radio button selection feedback
radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
        feedback.textContent = `You selected ${this.value}`;
        feedback.style.color = 'white';
    });
});

// Initialize the game
function initGame() {
    hiddenNumber = getRandom();
    attempts = 0;
    feedback.textContent = '';
    numberBox.textContent = '?';
    clearRadioButtons();
    
   
}

// Start the game when page loads
window.addEventListener('load', initGame);