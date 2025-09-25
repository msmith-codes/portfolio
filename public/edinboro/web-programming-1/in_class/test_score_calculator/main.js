// Array to store all test scores
let testScores = [];

function addScore() {
    const scoreInput = document.getElementById('scoreInput');
    const errorMessage = document.getElementById('errorMessage');
    const score = parseInt(scoreInput.value);

    // Clear previous error message
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    // Validate input
    if (isNaN(score)) {
        showError('Please enter a valid number');
        return;
    }

    if (score < 0 || score > 100) {
        showError('Score must be between 0 and 100');
        return;
    }

    // Add score to array
    testScores.push(score);
    
    // Update display
    updateScoresList();
    
    // Clear input
    scoreInput.value = '';
    
    // Show results section
    document.getElementById('results').style.display = 'block';
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function updateScoresList() {
    const scoresList = document.getElementById('scoresList');
    
    if (testScores.length === 0) {
        scoresList.innerHTML = '<p>No scores added yet.</p>';
        return;
    }

    let html = '';
    testScores.forEach((score, index) => {
        html += `<div>Test ${index + 1}: ${score}%</div>`;
    });
    
    scoresList.innerHTML = html;
}

function calculateAverage() {
    const averageDisplay = document.getElementById('averageDisplay');
    
    if (testScores.length === 0) {
        showError('Please add at least one test score first');
        return;
    }

    let scoresToUse = [...testScores]; // Create a copy of the original array
    let droppedScore = null;
    
    // If there are 2 or more scores, drop the lowest one
    if (testScores.length >= 2) {
        const lowestScore = Math.min(...testScores);
        const lowestIndex = testScores.indexOf(lowestScore);
        scoresToUse.splice(lowestIndex, 1);
        droppedScore = lowestScore;
    }

    // Calculate average using remaining scores
    const sum = scoresToUse.reduce((total, score) => total + score, 0);
    const average = (sum / scoresToUse.length).toFixed(2);

    // Display average with information about dropped score
    let displayText = `Average Score: ${average}%`;
    
    if (droppedScore !== null) {
        displayText += `<br><small>(Lowest score of ${droppedScore}% was dropped)</small>`;
        displayText += `<br><small>Scores used: ${scoresToUse.length} out of ${testScores.length}</small>`;
    }
    
    averageDisplay.innerHTML = displayText;
    averageDisplay.style.display = 'block';

    // Add letter grade
    const letterGrade = getLetterGrade(average);
    averageDisplay.innerHTML += `<br>Letter Grade: ${letterGrade}`;
}

function getLetterGrade(average) {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
}

function clearScores() {
    testScores = [];
    updateScoresList();
    document.getElementById('averageDisplay').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    document.getElementById('scoreInput').value = '';
    document.getElementById('errorMessage').style.display = 'none';
}

// Allow Enter key to add score
document.getElementById('scoreInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addScore();
    }
});