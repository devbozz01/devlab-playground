// Function to update the iframe with the user's CSS
function updatePreview(iframeId, cssEditorId) {
    // Get references to the iframe and editor for the current page
    const livePreview = document.getElementById(iframeId);
    const cssEditor = document.getElementById(cssEditorId);
    
    // Default HTML structure for the preview card
    const defaultHtml = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevLab - Challenges</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    
    <style>
        /*
        * The CSS from your style.css file would go here for a self-contained example.
        * I have provided a basic set of styles that match your HTML structure
        * to ensure the page is visually correct.
        */
        :root {
            --primary-color: #007bff;
            --secondary-color: #f8f9fa;
            --bg-color: #f4f7f9;
            --card-bg: #fff;
            --text-color: #333;
            --border-color: #dee2e6;
            --shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
        }

        .challenges-page {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        header {
            background-color: var(--card-bg);
            padding: 1rem 2rem;
            box-shadow: var(--shadow);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-family: 'Poppins', sans-serif;
            font-size: 1.8rem;
            font-weight: 600;
            color: var(--primary-color);
        }

        nav ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1.5rem;
        }

        nav a {
            text-decoration: none;
            color: var(--text-color);
            font-weight: 700;
            padding: 0.5rem 0.8rem;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        nav a:hover, nav a.active {
            background-color: var(--primary-color);
            color: #fff;
        }

        .main-challenges {
            flex: 1;
            display: flex;
            gap: 2rem;
            padding: 2rem;
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
        }
        
        @media (max-width: 768px) {
            .main-challenges {
                flex-direction: column;
                padding: 1rem;
            }
        }

        .challenge-sidebar {
            flex: 1;
            background-color: var(--card-bg);
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: var(--shadow);
            max-height: calc(100vh - 4rem);
            overflow-y: auto;
        }

        .challenge-sidebar h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .challenge-sidebar ul {
            list-style: none;
            padding: 0;
        }

        .challenge-sidebar li {
            padding: 1rem;
            margin-bottom: 0.5rem;
            background-color: var(--secondary-color);
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }

        .challenge-sidebar li:hover, .challenge-sidebar li.active {
            background-color: #e9ecef;
        }
        
        .challenge-sidebar li.active {
            background-color: var(--primary-color);
            color: #fff;
        }

        .challenge-content {
            flex: 3;
            display: flex;
            gap: 2rem;
        }
        
        @media (max-width: 768px) {
            .challenge-content {
                flex-direction: column;
            }
        }

        .challenge-display {
            flex: 1;
            background-color: var(--card-bg);
            padding: 2rem;
            border-radius: 12px;
            box-shadow: var(--shadow);
        }

        .preview-column {
            flex: 1;
        }

        .section-title {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .editor-container {
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
            margin-top: 1rem;
        }

        .editor-header {
            background-color: #eee;
            padding: 0.5rem 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }

        .red { background-color: #ff5f56; }
        .yellow { background-color: #ffbd2e; }
        .green { background-color: #27c93f; }

        #css-editor-challenge {
            width: 100%;
            height: 200px;
            border: none;
            padding: 1rem;
            font-family: monospace;
            font-size: 1rem;
            resize: vertical;
        }

        .challenge-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
            flex-wrap: wrap;
        }

        .cta-button {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            background-color: var(--primary-color);
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }

        .cta-button:hover {
            background-color: #0056b3;
        }
        
        .cta-button i {
            margin-right: 0.5rem;
        }

        .clear-button {
            background-color: #dc3545;
        }

        .solution-button {
            background-color: #ffc107;
            color: #333;
        }
        
        .next-button {
            background-color: #28a745;
        }

        .message-box {
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            font-weight: bold;
            display: none;
        }

        .message-box.visible {
            display: block;
        }

        .message-box.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .message-box.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .preview-container {
            width: 100%;
            height: 500px;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
        }
        
        .live-preview {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body class="challenges-page">

    <header>
        <div class="logo">DevLab</div>
        <nav>
            <ul>
                <li><a href="index.html"><i class="fas fa-home"></i>Home</a></li>
                <li><a href="playground.html"><i class="fas fa-code"></i>Playground</a></li>
                <li><a href="challenges.html" class="active"><i class="fas fa-trophy"></i>Challenges</a></li>
            </ul>
        </nav>
    </header>

    <main class="main-challenges">
        <div class="challenge-sidebar">
            <h2 class="section-title">Challenges</h2>
            <!-- This list is now EMPTY and will be populated by your JavaScript -->
            <ul id="challenge-list">
                <!-- Challenge list items will be generated here -->
            </ul>
        </div>
        <div class="challenge-content">
            <div class="challenge-display">
                <h2 id="challenge-title"></h2>
                <p id="challenge-description"></p>
                <div class="editor-container">
                    <div class="editor-header">
                        <span class="dot red"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                        <span style="margin-left: auto;">styles.css</span>
                    </div>
                    <textarea id="css-editor-challenge" placeholder="Write your CSS here..."></textarea>
                </div>
                <div class="challenge-buttons">
                    <button id="clear-challenge-button" class="cta-button clear-button"><i class="fas fa-eraser"></i> Clear</button>
                    <button id="show-solution-button" class="cta-button solution-button">Show Solution</button>
                    <button id="check-challenge-button" class="cta-button">Check My Solution</button>
                </div>
                <div id="challenge-message" class="message-box"></div>
                <button id="next-challenge-button" class="cta-button next-button" style="display: none;">Next Challenge</button>
            </div>
            <div class="preview-column">
                <h2 class="section-title">Live Preview</h2>
                <div class="preview-container">
                    <iframe class="live-preview" id="challenge-preview-iframe"></iframe>
                </div>
            </div>
        </div>
    </main>
    
    <!-- This links our JavaScript file to the page for things like making the buttons work -->
    <script src="script.js"></script>
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


