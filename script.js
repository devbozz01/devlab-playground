// Function to update the iframe with the user's CSS
function updatePreview(iframeId, cssEditorId) {
    // Get references to the iframe and editor for the current page
    const livePreview = document.getElementById(iframeId);
    const cssEditor = document.getElementById(cssEditorId);
    
    // Default HTML structure for the preview card
    const defaultHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                /* Base styles for the card */
                body { margin: 0; font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: #f0f2f5; }
                .preview-card {
                    width: 100%;
                    max-width: 350px;
                    background-color: #f8f9fa;
                    border-radius: 12px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    transition: all 0.3s ease-in-out;
                    border: 1px solid #dee2e6;
                }
                .preview-card-image {
                    width: 100%;
                    height: 200px;
                    background-color: #ced4da;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #6c757d;
                    font-size: 1.2rem;
                    font-weight: bold;
                    text-align: center;
                }
                .preview-card-content {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .preview-card-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #212529;
                    margin: 0;
                }
                .preview-card-text {
                    font-size: 1rem;
                    line-height: 1.5;
                    color: #495057;
                    margin: 0;
                }
                .preview-card-button {
                    padding: 0.75rem 1.5rem;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 8px;
                    text-align: center;
                    transition: background-color 0.3s ease;
                    font-weight: bold;
                    border: none;
                    cursor: pointer;
                }
                .preview-card-button:hover {
                    background-color: #0056b3;
                }
                
                /*
                 * Your CSS will be injected here. It will override the base styles.
                 * This ensures your code is functional.
                 */
                ${cssEditor.value}
            </style>
        </head>
        <body>
            <div class="preview-card">
                <div class="preview-card-image">Image Placeholder</div>
                <div class="preview-card-content">
                    <h3 class="preview-card-title">A Stylish Card</h3>
                    <p class="preview-card-text">
                        This is the card you are styling.
                    </p>
                    <button class="preview-card-button">Click Me</button>
                </div>
            </div>
        </body>
        </html>
    `;
    
    // Set the iframe's content
    livePreview.srcdoc = defaultHtml;
}

// --- Logic for the Playground Page ---
function setupPlaygroundPage() {
    const cssEditor = document.getElementById('css-editor');
    const clearButton = document.getElementById('clear-playground-button');

    // Initial CSS code for the playground page
    const initialCss = `/* Start styling here! */
.preview-card {
  background-color: lightblue;
  border: 2px solid blue;
}

.preview-card-content {
  background-color: white;
}

.preview-card-title {
  color: black;
}`;
    
    // Function to clear the playground editor
    function clearEditor() {
        cssEditor.value = initialCss;
        updatePreview('live-preview-iframe', 'css-editor');
    }

    // Set the initial code and update the preview on page load
    cssEditor.value = initialCss;
    updatePreview('live-preview-iframe', 'css-editor');
    
    // Add event listeners
    cssEditor.addEventListener('input', () => updatePreview('live-preview-iframe', 'css-editor'));
    clearButton.addEventListener('click', clearEditor);
}

// --- Logic for the Challenges Page ---
const challenges = [
    {
        title: "Challenge 1: Center the Card",
        description: "Your goal is to perfectly center the card in the middle of the page using CSS. You can use flexbox on the `body` element or any other method you prefer.",
        initialCss: `/* Use the 'body' selector to center the card. */
body {
    
}
`,
        solutionCss: `/* Use the 'body' selector to center the card. */
body {
    display: flex;
    justify-content: center;
    align-items: center;
}`
    },
    {
        title: "Challenge 2: Style the Button",
        description: "The card has a button with the class `.preview-card-button`. Change its background to your favorite color and add a rounded corner with a `border-radius` of `8px`.",
        initialCss: `/* Style the button here! */
.preview-card-button {
    
}
`,
        solutionCss: `/* Style the button here! */
.preview-card-button {
    background-color: #00c7e2;
    border-radius: 8px;
}`
    },
    {
        title: "Challenge 3: Create a Hover Effect",
        description: "When the user hovers over the card, you want it to stand out. Add a hover effect to the `.preview-card` to change its `box-shadow` to a darker shade.",
        initialCss: `/* Add the hover effect here! */
.preview-card:hover {
    
}
`,
        solutionCss: `/* Add the hover effect here! */
.preview-card:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
}`
    },
    {
        title: "Challenge 4: Change Font & Color",
        description: "The title and text are a bit plain. Change the font family of the `.preview-card-title` to `Poppins` and the color of the `.preview-card-text` to a dark gray.",
        initialCss: `/* Style the typography here! */
.preview-card-title {
    
}

.preview-card-text {
    
}
`,
        solutionCss: `/* Style the typography here! */
.preview-card-title {
    font-family: 'Poppins', sans-serif;
}

.preview-card-text {
    color: #495057;
}`
    },
    {
        title: "Challenge 5: Add a Shadow",
        description: "Give the card a more three-dimensional look. Add a `box-shadow` to the `.preview-card` element with a value of `0 10px 20px rgba(0,0,0,0.3)`.",
        initialCss: `/* Add a shadow to the card here! */
.preview-card {
    
}
`,
        solutionCss: `/* Add a shadow to the card here! */
.preview-card {
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}`
    }
];

let currentChallengeIndex = 0; // Track the current challenge

// Function to show a message in the message box
function showMessage(message, type) {
    const messageBox = document.getElementById('challenge-message');
    
    // Set message and apply the appropriate class
    messageBox.textContent = message;
    messageBox.className = `message-box visible ${type}`;
    
    // Hide the message after 5 seconds
    setTimeout(() => {
        messageBox.classList.remove('visible');
    }, 5000);
}

// Function to check the user's solution
function checkSolution() {
    const cssEditor = document.getElementById('css-editor-challenge');
    const nextChallengeButton = document.getElementById('next-challenge-button');
    
    // Normalize whitespace for a more robust comparison
    const userCode = cssEditor.value.trim().replace(/\s+/g, ' ');
    const solutionCode = challenges[currentChallengeIndex].solutionCss.trim().replace(/\s+/g, ' ');

    if (userCode === solutionCode) {
        showMessage('✅ Correct! You nailed it!', 'success');
        nextChallengeButton.style.display = 'block'; // Show the "Next Challenge" button
    } else {
        showMessage('❌ Not quite. Keep trying!', 'error');
        nextChallengeButton.style.display = 'none'; // Hide the button on failure
    }
}

// Function to clear the challenge editor
function clearChallengeEditor() {
    const cssEditor = document.getElementById('css-editor-challenge');
    const nextChallengeButton = document.getElementById('next-challenge-button');
    cssEditor.value = challenges[currentChallengeIndex].initialCss;
    updatePreview('challenge-preview-iframe', 'css-editor-challenge');
    nextChallengeButton.style.display = 'none'; // Hide the button
    document.getElementById('challenge-message').classList.remove('visible'); // Hide message
}

// Function to load the next challenge
function nextChallenge() {
    const nextIndex = currentChallengeIndex + 1;
    if (nextIndex < challenges.length) {
        loadChallenge(nextIndex);
    } else {
        showMessage('🎉 You completed all the challenges!', 'success');
        document.getElementById('next-challenge-button').style.display = 'none';
    }
}

// IMPORTANT: Moved loadChallenge and showSolution outside of setupChallengesPage so they are accessible
function loadChallenge(index) {
    const challengeList = document.getElementById('challenge-list');
    const challengeTitle = document.getElementById('challenge-title');
    const challengeDescription = document.getElementById('challenge-description');
    const cssEditor = document.getElementById('css-editor-challenge');
    const nextChallengeButton = document.getElementById('next-challenge-button');
    
    currentChallengeIndex = index;
    const challenge = challenges[index];
    challengeTitle.textContent = challenge.title;
    challengeDescription.textContent = challenge.description;
    cssEditor.value = challenge.initialCss;
    
    // Remove 'active' class from all list items
    document.querySelectorAll('#challenge-list li').forEach(item => {
        item.classList.remove('active-challenge');
    });
    // Add 'active' class to the current list item
    document.querySelector(`[data-challenge-id="${index}"]`).classList.add('active-challenge');
    
    // Update the preview
    updatePreview('challenge-preview-iframe', 'css-editor-challenge');
    
    // Hide any existing message box or "Next Challenge" button
    document.getElementById('challenge-message').classList.remove('visible');
    nextChallengeButton.style.display = 'none';
}

function showSolution() {
    const currentChallenge = challenges[currentChallengeIndex];
    const cssEditor = document.getElementById('css-editor-challenge');
    
    // Set the editor value to the solution code
    cssEditor.value = currentChallenge.solutionCss;
    
    // Update the preview
    updatePreview('challenge-preview-iframe', 'css-editor-challenge');
}

function setupChallengesPage() {
    const challengeList = document.getElementById('challenge-list');
    const cssEditor = document.getElementById('css-editor-challenge');
    const showSolutionButton = document.getElementById('show-solution-button');
    const checkSolutionButton = document.getElementById('check-challenge-button');
    const clearButton = document.getElementById('clear-challenge-button');
    const nextChallengeButton = document.getElementById('next-challenge-button');

    // Dynamically generate challenge list items
    challenges.forEach((challenge, index) => {
        const li = document.createElement('li');
        li.textContent = challenge.title;
        li.setAttribute('data-challenge-id', index);
        challengeList.appendChild(li);
    });

    // Add click listeners to the challenge list items
    challengeList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'LI') {
            const challengeId = parseInt(target.getAttribute('data-challenge-id'));
            loadChallenge(challengeId);
        }
    });

    // Add click listeners for the buttons
    showSolutionButton.addEventListener('click', showSolution);
    checkSolutionButton.addEventListener('click', checkSolution);
    clearButton.addEventListener('click', clearChallengeEditor);
    nextChallengeButton.addEventListener('click', nextChallenge);

    // Initial load of the first challenge on page load
    loadChallenge(0);

    // Add event listener to update preview on every keystroke
    cssEditor.addEventListener('input', () => updatePreview('challenge-preview-iframe', 'css-editor-challenge'));
}

// --- Main execution block ---
document.addEventListener('DOMContentLoaded', () => {
    // Check which page is currently loaded and run the correct setup function
    if (document.body.classList.contains('playground-page')) {
        setupPlaygroundPage();
    } else if (document.body.classList.contains('challenges-page')) {
        setupChallengesPage();
    }
});

