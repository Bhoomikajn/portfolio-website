// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Form submission with Formspree
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('_replyto');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showFormStatus('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit to Formspree
            fetch(this.action, {
                method: this.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    showFormStatus('Thank you! Your message has been sent successfully. I will get back to you soon.', 'success');
                    this.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            showFormStatus(data['errors'].map(error => error['message']).join(', '), 'error');
                        } else {
                            showFormStatus('Oops! There was a problem submitting your form', 'error');
                        }
                    });
                }
            }).catch(error => {
                showFormStatus('Oops! There was a problem submitting your form', 'error');
            }).finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Function to show form status messages
    function showFormStatus(message, type) {
        const statusDiv = document.getElementById('form-status');
        if (statusDiv) {
            statusDiv.textContent = message;
            statusDiv.style.display = 'block';
            statusDiv.className = type === 'success' ? 'form-success' : 'form-error';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 5000);
        }
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Create popup modal for surprises
    function createSurpriseModal() {
        // Remove existing modal if any
        const existingModal = document.getElementById('surpriseModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal HTML
        const modal = document.createElement('div');
        modal.id = 'surpriseModal';
        modal.className = 'surprise-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="closeSurpriseModal()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🎉 Surprise Time!</h2>
                    <button class="close-btn" onclick="closeSurpriseModal()">&times;</button>
                </div>
                <div class="modal-body" id="modalBody">
                    <div class="loading-message">
                        <i class="fas fa-spinner fa-spin"></i> Loading your surprise...
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add global close function
        window.closeSurpriseModal = function() {
            modal.classList.add('closing');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        return modal;
    }
    
    function displayRandomSurprise() {
        const modal = createSurpriseModal();
        const modalBody = modal.querySelector('#modalBody');
        
        // Random surprise selection
        const randomIndex = Math.floor(Math.random() * surprises.length);
        
        // Small delay for effect
        setTimeout(() => {
            try {
                modalBody.innerHTML = '';
                surprises[randomIndex](modalBody);
            } catch (error) {
                modalBody.innerHTML = '<div class="error-message">Oops! Something went wrong. Please try another surprise!</div>';
            }
        }, 500);
    }
    
    // Surprise Section Functionality
    console.log('Looking for surprise elements...');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const newSurpriseBtn = document.getElementById('newSurpriseBtn');
    const surpriseContent = document.getElementById('surpriseContent');
    
    console.log('surpriseBtn:', surpriseBtn);
    console.log('newSurpriseBtn:', newSurpriseBtn);
    console.log('surpriseContent:', surpriseContent);

    // Hardcoded content arrays for fallbacks
    const fallbackQuotes = [
        { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston S. Churchill" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
        { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
        { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
        { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" }
    ];

    const fallbackRiddles = [
        { question: "What has keys but can't open locks?", answer: "A Piano 🎹" },
        { question: "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?", answer: "Fire 🔥" },
        { question: "What gets wetter as it dries?", answer: "A towel 🏖️" },
        { question: "What has a head and a tail but no body?", answer: "A coin 🪙" },
        { question: "I'm tall when I'm young, and short when I'm old. What am I?", answer: "A candle 🕯️" },
        { question: "What has hands but can't clap?", answer: "A clock ⏰" },
        { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "The letter M 📝" },
        { question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", answer: "A map 🗺️" },
        { question: "What starts with T, ends with T, and has T in it?", answer: "A teapot 🫖" },
        { question: "The more you take, the more you leave behind. What am I?", answer: "Footsteps 👣" }
    ];

    const fallbackJokes = [
        { setup: "Why don't skeletons fight each other?", punchline: "They don't have the guts! 💀" },
        { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs! 🐛" },
        { setup: "Why did the developer go broke?", punchline: "Because he used up all his cache! 💸" },
        { setup: "What do you call a programmer from Finland?", punchline: "Nerdic! 🤓" },
        { setup: "Why do Java developers wear glasses?", punchline: "Because they can't C#! 👓" },
        { setup: "How many programmers does it take to change a light bulb?", punchline: "None. That's a hardware problem! 💡" },
        { setup: "Why did the programmer quit his job?", punchline: "He didn't get arrays! 📊" },
        { setup: "What's a programmer's favorite hangout place?", punchline: "Foo Bar! 🍺" },
        { setup: "Why did the software engineer break up with the data analyst?", punchline: "They had no chemistry, only SQL! 💔" },
        { setup: "What do you call a sleeping bull at a computer?", punchline: "A bulldozer! 🐂💤" }
    ];

    const fallbackFacts = [
        "The first computer bug was an actual bug - a moth trapped in a computer in 1947!",
        "The term 'debugging' was coined by Grace Hopper when she found the first computer bug.",
        "The first 1GB hard drive weighed over 550 pounds and cost $40,000 in 1980!",
        "There are more possible games of chess than atoms in the observable universe.",
        "The average person blinks 15-20 times per minute, but only 5 times when using a computer.",
        "The first computer programmer was Ada Lovelace in 1843.",
        "Google's original name was 'Backrub'.",
        "The '@' symbol was used for the first time in an email in 1971.",
        "The first computer virus was created in 1986 and was called 'Brain'.",
        "YouTube was originally designed as a dating site."
    ];

    // API Functions for dynamic content
    async function fetchRandomQuote() {
        try {
            // Try Quotable API first
            const response = await fetch('https://api.quotable.io/random');
            if (response.ok) {
                const data = await response.json();
                return { text: data.content, author: data.author };
            }
            
            // Fallback to hardcoded quotes if API fails
            return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        } catch (error) {
            // Return random fallback quote if all APIs fail
            return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        }
    }

    async function fetchRandomRiddle() {
        try {
            // Try riddle API first
            const response = await fetch('https://riddles-api.vercel.app/random');
            if (response.ok) {
                const data = await response.json();
                return { question: data.riddle, answer: data.answer };
            }
            
            // Fallback to our hardcoded riddles if API fails
            return fallbackRiddles[Math.floor(Math.random() * fallbackRiddles.length)];
        } catch (error) {
            // Return random fallback riddle if all APIs fail
            return fallbackRiddles[Math.floor(Math.random() * fallbackRiddles.length)];
        }
    }
    
    async function fetchRandomJoke() {
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            if (response.ok) {
                const data = await response.json();
                return { setup: data.setup, punchline: data.punchline + ' 😂' };
            }
            
            // Fallback to our hardcoded jokes if API fails
            return fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
        } catch (error) {
            // Return random fallback joke if all APIs fail
            return fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
        }
    }
    
    async function fetchRandomFact() {
        try {
            const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
            if (response.ok) {
                const data = await response.json();
                return data.text;
            }
            
            // Fallback to our hardcoded facts if API fails
            return fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
        } catch (error) {
            // Return random fallback fact if all APIs fail
            return fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
        }
    }

    // Note: Now using centralized fallback arrays above

    const wheelMessages = [
        "Have a wonderful day! 🌟",
        "You are amazing! ✨",
        "Believe in yourself! 💪",
        "Love yourself! 💖",
        "You've got this! 🚀",
        "Stay positive! 😊",
        "You're incredible! 🌈",
        "Dream big! 🌙",
        "You matter! 💫",
        "Smile today! 😄",
        "You're special! 🦋",
        "Keep shining! ⭐",
        "You're loved! 💕",
        "Stay strong! 🔥",
        "You're beautiful! 🌸",
        "Embrace today! 🌻"
    ];

    const surprises = [
        function showSnakeGame(container) {
            container = container || document.getElementById('surpriseContent');
            container.innerHTML = `
                <h3>🐍 Snake Game</h3>
                <p>Use arrow keys or WASD to control the snake!</p>
                <div class="snake-game">
                    <canvas id="snakeCanvas" class="snake-canvas" width="400" height="400"></canvas>
                    <div class="game-info">
                        <div>Score: <span id="snakeScore">0</span></div>
                        <div class="game-controls">
                            <button onclick="startSnakeGame()">🎮 Start Game</button>
                            <button onclick="pauseSnakeGame()">⏸️ Pause</button>
                            <button onclick="resetSnakeGame()">🔄 Reset</button>
                        </div>
                    </div>
                </div>
            `;
            
            // Snake Game Implementation
            setTimeout(() => {
                initSnakeGame();
            }, 100);
        },
        function showPuzzle(container) {
            container = container || document.getElementById('surpriseContent');
            const puzzleId = Date.now();
            container.innerHTML = `
                <h3>🧩 Sliding Puzzle Game</h3>
                <p>Arrange the numbers 1-8 in order! Click tiles next to the empty space.</p>
                <div class="puzzle-container">
                    <div class="puzzle-grid" id="puzzleGrid${puzzleId}">
                        <!-- Tiles will be generated by JavaScript -->
                    </div>
                    <div class="game-controls">
                        <button onclick="shufflePuzzle${puzzleId}()">🔀 Shuffle</button>
                        <button onclick="resetPuzzle${puzzleId}()">🔄 Reset</button>
                    </div>
                    <div id="puzzleMessage${puzzleId}" class="puzzle-message"></div>
                </div>
            `;
            
            // Initialize puzzle
            setTimeout(() => {
                initSlidingPuzzle(puzzleId);
            }, 100);
        },
        async function showRandomRiddle(container) {
            container = container || document.getElementById('surpriseContent');
            // Show loading message first
            container.innerHTML = `
                <h3>🤔 Riddle Me This!</h3>
                <div class="loading-message">
                    <i class="fas fa-spinner fa-spin"></i> Fetching a fresh riddle for you...
                </div>
            `;
            
            try {
                const riddle = await fetchRandomRiddle();
                const riddleId = Date.now(); // Unique ID for this riddle
                
                container.innerHTML = `
                    <h3>🤔 Riddle Me This!</h3>
                    <div class="riddle-container">
                        <p class="riddle-question"><i>${riddle.question}</i></p>
                        <div class="riddle-input-section">
                            <input type="text" id="riddleInput${riddleId}" placeholder="Type your answer here and press Enter..." class="riddle-input">
                            <button onclick="checkRiddleAnswer${riddleId}()" class="game-controls riddle-submit-btn">🚀 Submit Answer</button>
                        </div>
                        <div id="riddleResult${riddleId}" class="riddle-result"></div>
                        <div id="confetti${riddleId}" class="confetti-container"></div>
                    </div>
                `;
            
                // Encouraging messages for wrong answers
                const encouragingMessages = [
                    "You're almost there! 😊",
                    "Great try! You can do better! 💪",
                    "So close! Keep thinking! 🤔",
                    "Nice attempt! Don't give up! ✨",
                    "You're on the right track! 🎯",
                    "Almost got it! Try again! 😄",
                    "Good thinking! You're learning! 🧠",
                    "That was a creative answer! 🎨"
                ];
            
            // Add functionality for this specific riddle
            window[`checkRiddleAnswer${riddleId}`] = function() {
                const input = document.getElementById(`riddleInput${riddleId}`);
                const result = document.getElementById(`riddleResult${riddleId}`);
                const confettiContainer = document.getElementById(`confetti${riddleId}`);
                const userAnswer = input.value.toLowerCase().trim();
                
                if (!userAnswer) {
                    result.innerHTML = '<div class="hint-message">💡 Please type your answer first!</div>';
                    return;
                }
                
                // Extract key words from correct answer for comparison
                const correctAnswer = riddle.answer.toLowerCase();
                const correctWords = correctAnswer.replace(/[^a-z\s]/g, '').split(' ').filter(word => word.length > 2);
                
                // Check if answer is correct
                let isCorrect = false;
                for (let word of correctWords) {
                    if (userAnswer.includes(word) || word.includes(userAnswer)) {
                        isCorrect = true;
                        break;
                    }
                }
                
                if (isCorrect) {
                    // Correct answer - show confetti and celebration
                    result.innerHTML = `
                        <div class="correct-answer">
                            🎉 AMAZING! You got it right! 🎉<br>
                            <strong>Answer: ${riddle.answer}</strong><br>
                            <span class="celebration-text">You're brilliant! ✨</span>
                        </div>
                    `;
                    createConfetti(confettiContainer);
                    input.disabled = true;
                } else {
                    // Wrong answer - show encouragement and reveal answer
                    const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
                    result.innerHTML = `
                        <div class="wrong-answer">
                            <div class="encouragement">${randomMessage}</div>
                            <div class="answer-reveal">The answer is: <strong>${riddle.answer}</strong></div>
                            <div class="motivation">Keep practicing - you're getting smarter! 🧠💫</div>
                        </div>
                    `;
                    input.disabled = true;
                }
            };
            
            // Add enter key functionality
            setTimeout(() => {
                const input = document.getElementById(`riddleInput${riddleId}`);
                if (input) {
                    input.addEventListener('keypress', function(e) {
                        if (e.key === 'Enter' && !input.disabled) {
                            window[`checkRiddleAnswer${riddleId}`]();
                        }
                    });
                    input.focus(); // Auto-focus on input
                }
            }, 100);
            
            } catch (error) {
                container.innerHTML = `
                    <h3>🤔 Riddle Me This!</h3>
                    <div class="error-message">Oops! Couldn't fetch a riddle. Please try another surprise!</div>
                `;
            }
        },
        async function showRandomQuote(container) {
            container = container || document.getElementById('surpriseContent');
            // Show loading message
            container.innerHTML = `
                <h3>💭 Inspirational Quote</h3>
                <div class="loading-message">
                    <i class="fas fa-spinner fa-spin"></i> Getting an inspiring quote...
                </div>
            `;
            
            try {
                const quote = await fetchRandomQuote();
                container.innerHTML = `
                    <h3>💭 Inspirational Quote</h3>
                    <div class="quote-container">
                        <p class="quote-text"><i>"${quote.text}"</i></p>
                        <p class="quote-author">- ${quote.author}</p>
                    </div>
                `;
            } catch (error) {
                container.innerHTML = `
                    <h3>💭 Inspirational Quote</h3>
                    <div class="error-message">Couldn't fetch a quote right now. Please try another surprise!</div>
                `;
            }
        },
        async function showRandomJoke(container) {
            container = container || document.getElementById('surpriseContent');
            // Show loading message
            container.innerHTML = `
                <h3>😂 Laugh Out Loud</h3>
                <div class="loading-message">
                    <i class="fas fa-spinner fa-spin"></i> Finding a funny joke...
                </div>
            `;
            
            try {
                const joke = await fetchRandomJoke();
                container.innerHTML = `
                    <h3>😂 Laugh Out Loud</h3>
                    <div class="joke-container">
                        <p class="joke-text"><i>${joke.setup}</i></p>
                        <div class="riddle-answer">${joke.punchline}</div>
                    </div>
                `;
            } catch (error) {
                container.innerHTML = `
                    <h3>😂 Laugh Out Loud</h3>
                    <div class="error-message">Couldn't fetch a joke right now. Please try another surprise!</div>
                `;
            }
        },
        async function showRandomFact(container) {
            container = container || document.getElementById('surpriseContent');
            // Show loading message
            container.innerHTML = `
                <h3>🤓 Fun Fact</h3>
                <div class="loading-message">
                    <i class="fas fa-spinner fa-spin"></i> Discovering an interesting fact...
                </div>
            `;
            
            try {
                const fact = await fetchRandomFact();
                container.innerHTML = `
                    <h3>🤓 Fun Fact</h3>
                    <div class="quote-container">
                        <p class="quote-text"><i>${fact}</i></p>
                        <p class="quote-author">- Random Facts</p>
                    </div>
                `;
            } catch (error) {
                container.innerHTML = `
                    <h3>🤓 Fun Fact</h3>
                    <div class="error-message">Couldn't fetch a fact right now. Please try another surprise!</div>
                `;
            }
        },
        function showSpinningWheel(container) {
            container = container || document.getElementById('surpriseContent');
            container.innerHTML = `
                <h3>🎡 Spinning Wheel of Positivity</h3>
                <div class="wheel-container">
                    <div class="wheel" id="wheel">
                        <div class="wheel-center">SPIN</div>
                    </div>
                    <div class="wheel-pointer">▼</div>
                    <button class="game-controls" onclick="spinWheel()">🎯 Spin the Wheel!</button>
                    <div id="wheelResult" class="wheel-result"></div>
                </div>
            `;
            
            // Add wheel spinning functionality
            window.spinWheel = function() {
                const wheel = document.getElementById('wheel');
                const result = document.getElementById('wheelResult');
                const randomMessage = wheelMessages[Math.floor(Math.random() * wheelMessages.length)];
                const randomRotation = Math.floor(Math.random() * 360) + 1440; // At least 4 full rotations
                
                wheel.style.transform = `rotate(${randomRotation}deg)`;
                wheel.style.transition = 'transform 3s ease-out';
                
                setTimeout(() => {
                    result.innerHTML = `<div class="wheel-message">${randomMessage}</div>`;
                    result.style.display = 'block';
                }, 3000);
            };
        },
        function showSudoku(container) {
            container = container || document.getElementById('surpriseContent');
            const sudokuId = Date.now();
            container.innerHTML = `
                <h3>🧮 Mini Sudoku Challenge</h3>
                <p>Fill in numbers 1-4 in this 4x4 grid! Each row and column must contain 1-4.</p>
                <div class="sudoku-container">
                    <div class="mini-sudoku-grid" id="sudokuGrid${sudokuId}">
                        <!-- 4x4 grid for simplicity -->
                    </div>
                    <div class="game-controls">
                        <button onclick="checkSudoku${sudokuId}()">✅ Check Solution</button>
                        <button onclick="resetSudoku${sudokuId}()">🔄 Reset</button>
                        <button onclick="hintSudoku${sudokuId}()">💡 Hint</button>
                    </div>
                    <div id="sudokuMessage${sudokuId}" class="sudoku-message"></div>
                </div>
            `;
            
            setTimeout(() => {
                initMiniSudoku(sudokuId);
            }, 100);
        },
        function showTicTacToe(container) {
            container = container || document.getElementById('surpriseContent');
            const ticTacId = Date.now();
            container.innerHTML = `
                <h3>⭕ Tic Tac Toe</h3>
                <p>You are X, computer is O. Get three in a row!</p>
                <div class="tictactoe-container">
                    <div class="tictactoe-grid" id="ticTacGrid${ticTacId}">
                        <!-- 3x3 grid -->
                    </div>
                    <div class="game-controls">
                        <button onclick="resetTicTacToe${ticTacId}()">🔄 New Game</button>
                    </div>
                    <div id="ticTacMessage${ticTacId}" class="game-message"></div>
                </div>
            `;
            
            setTimeout(() => {
                initTicTacToe(ticTacId);
            }, 100);
        }
    ];

    // Confetti animation function
    function createConfetti(container) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffd93d', '#6c5ce7', '#fd79a8', '#fdcb6e'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            container.appendChild(confetti);
        }
        
        // Remove confetti after animation
        setTimeout(() => {
            container.innerHTML = '';
        }, 5000);
    }

    // Game implementations
    function initSnakeGame() {
        const canvas = document.getElementById('snakeCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;
        
        let snake = [{x: 10, y: 10}];
        let food = {x: 15, y: 15};
        let dx = 0;
        let dy = 0;
        let score = 0;
        let gameRunning = false;
        let gameStarted = false;
        
        window.startSnakeGame = function() {
            if (!gameStarted) {
                gameStarted = true;
                gameRunning = true;
                gameLoop();
            }
        };
        
        window.pauseSnakeGame = function() {
            gameRunning = false;
        };
        
        window.resetSnakeGame = function() {
            snake = [{x: 10, y: 10}];
            food = {x: 15, y: 15};
            dx = 0;
            dy = 0;
            score = 0;
            gameRunning = false;
            gameStarted = false;
            document.getElementById('snakeScore').textContent = score;
            clearCanvas();
            drawGame();
        };
        
        function gameLoop() {
            if (!gameRunning) return;
            
            setTimeout(() => {
                clearCanvas();
                moveSnake();
                drawGame();
                gameLoop();
            }, 100);
        }
        
        function clearCanvas() {
            ctx.fillStyle = '#f8f9fa';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        function drawGame() {
            drawSnake();
            drawFood();
        }
        
        function drawSnake() {
            ctx.fillStyle = '#3498db';
            snake.forEach(segment => {
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            });
        }
        
        function drawFood() {
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
        }
        
        function moveSnake() {
            // Don't move if no direction is set
            if (dx === 0 && dy === 0) {
                return;
            }
            
            const head = {x: snake[0].x + dx, y: snake[0].y + dy};
            
            // Check wall collision
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                gameRunning = false;
                alert('Game Over! Score: ' + score);
                return;
            }
            
            // Check self collision
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                gameRunning = false;
                alert('Game Over! Score: ' + score);
                return;
            }
            
            snake.unshift(head);
            
            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                score += 10;
                document.getElementById('snakeScore').textContent = score;
                generateFood();
            } else {
                snake.pop();
            }
        }
        
        function generateFood() {
            food = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
        }
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            // Check if it's a valid game key
            const isGameKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'W', 's', 'S', 'a', 'A', 'd', 'D'].includes(e.key);
            
            if (!isGameKey) return;
            
            // Start the game on first key press if not started
            if (!gameStarted) {
                gameStarted = true;
                gameRunning = true;
                gameLoop();
            }
            
            if (!gameRunning) return;
            
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (dy !== 1) { dx = 0; dy = -1; }
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (dy !== -1) { dx = 0; dy = 1; }
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (dx !== 1) { dx = -1; dy = 0; }
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (dx !== -1) { dx = 1; dy = 0; }
                    break;
            }
        });
        
        // Initial draw
        drawGame();
    }
    
    function initSlidingPuzzle(puzzleId) {
        const gridElement = document.getElementById(`puzzleGrid${puzzleId}`);
        if (!gridElement) return;
        
        let tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // 0 represents empty space
        let size = 3;
        
        function renderPuzzle() {
            gridElement.innerHTML = '';
            tiles.forEach((tile, index) => {
                const tileElement = document.createElement('div');
                tileElement.className = tile === 0 ? 'puzzle-tile empty' : 'puzzle-tile';
                tileElement.textContent = tile === 0 ? '' : tile;
                if (tile !== 0) {
                    tileElement.onclick = () => moveTile(index);
                }
                gridElement.appendChild(tileElement);
            });
        }
        
        function moveTile(index) {
            const emptyIndex = tiles.indexOf(0);
            const validMoves = getValidMoves(emptyIndex);
            
            if (validMoves.includes(index)) {
                [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
                renderPuzzle();
                checkWin();
            }
        }
        
        function getValidMoves(emptyIndex) {
            const moves = [];
            const row = Math.floor(emptyIndex / size);
            const col = emptyIndex % size;
            
            if (row > 0) moves.push(emptyIndex - size); // Up
            if (row < size - 1) moves.push(emptyIndex + size); // Down
            if (col > 0) moves.push(emptyIndex - 1); // Left
            if (col < size - 1) moves.push(emptyIndex + 1); // Right
            
            return moves;
        }
        
        function checkWin() {
            const winState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
            if (JSON.stringify(tiles) === JSON.stringify(winState)) {
                document.getElementById(`puzzleMessage${puzzleId}`).innerHTML = `
                    <div class="win-message">🎉 Congratulations! You solved the puzzle! 🎉</div>
                `;
                createConfetti(document.getElementById(`puzzleMessage${puzzleId}`));
            }
        }
        
        function shuffle() {
            for (let i = 0; i < 1000; i++) {
                const emptyIndex = tiles.indexOf(0);
                const validMoves = getValidMoves(emptyIndex);
                const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
                [tiles[emptyIndex], tiles[randomMove]] = [tiles[randomMove], tiles[emptyIndex]];
            }
            renderPuzzle();
        }
        
        window[`shufflePuzzle${puzzleId}`] = shuffle;
        window[`resetPuzzle${puzzleId}`] = function() {
            tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
            renderPuzzle();
            document.getElementById(`puzzleMessage${puzzleId}`).innerHTML = '';
        };
        
        // Initial render and shuffle
        renderPuzzle();
        shuffle();
    }
    
    function initMiniSudoku(sudokuId) {
        const gridElement = document.getElementById(`sudokuGrid${sudokuId}`);
        if (!gridElement) return;
        
        // Simple 4x4 Sudoku puzzle
        const initialPuzzle = [
            [1, 0, 0, 4],
            [0, 0, 1, 0],
            [0, 1, 0, 0],
            [4, 0, 0, 1]
        ];
        
        const solution = [
            [1, 2, 3, 4],
            [3, 4, 1, 2],
            [2, 1, 4, 3],
            [4, 3, 2, 1]
        ];
        
        let currentPuzzle = initialPuzzle.map(row => [...row]);
        
        function renderSudoku() {
            gridElement.innerHTML = '';
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    const cell = document.createElement('input');
                    cell.type = 'text';
                    cell.maxLength = 1;
                    cell.className = 'sudoku-cell';
                    if (initialPuzzle[row][col] !== 0) {
                        cell.value = initialPuzzle[row][col];
                        cell.disabled = true;
                        cell.classList.add('given');
                    } else {
                        cell.value = currentPuzzle[row][col] === 0 ? '' : currentPuzzle[row][col];
                        cell.oninput = (e) => {
                            const value = parseInt(e.target.value);
                            if (value >= 1 && value <= 4) {
                                currentPuzzle[row][col] = value;
                            } else {
                                currentPuzzle[row][col] = 0;
                                e.target.value = '';
                            }
                        };
                    }
                    gridElement.appendChild(cell);
                }
            }
        }
        
        window[`checkSudoku${sudokuId}`] = function() {
            const messageEl = document.getElementById(`sudokuMessage${sudokuId}`);
            let isCorrect = true;
            
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    if (currentPuzzle[row][col] !== solution[row][col]) {
                        isCorrect = false;
                        break;
                    }
                }
                if (!isCorrect) break;
            }
            
            if (isCorrect) {
                messageEl.innerHTML = `
                    <div class="win-message">🎉 Perfect! You solved the Sudoku! 🎉</div>
                `;
                createConfetti(messageEl);
            } else {
                messageEl.innerHTML = `
                    <div class="hint-message">💡 Not quite right. Keep trying! Remember: each row and column needs 1-4.</div>
                `;
            }
        };
        
        window[`resetSudoku${sudokuId}`] = function() {
            currentPuzzle = initialPuzzle.map(row => [...row]);
            renderSudoku();
            document.getElementById(`sudokuMessage${sudokuId}`).innerHTML = '';
        };
        
        window[`hintSudoku${sudokuId}`] = function() {
            // Find first empty cell and show hint
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    if (currentPuzzle[row][col] === 0) {
                        document.getElementById(`sudokuMessage${sudokuId}`).innerHTML = `
                            <div class="hint-message">💡 Hint: Row ${row + 1}, Column ${col + 1} should be ${solution[row][col]}</div>
                        `;
                        return;
                    }
                }
            }
        };
        
        renderSudoku();
    }
    
    function initTicTacToe(ticTacId) {
        const gridElement = document.getElementById(`ticTacGrid${ticTacId}`);
        if (!gridElement) return;
        
        let board = Array(9).fill('');
        let currentPlayer = 'X';
        let gameActive = true;
        
        function renderBoard() {
            gridElement.innerHTML = '';
            board.forEach((cell, index) => {
                const cellElement = document.createElement('div');
                cellElement.className = 'tictac-cell';
                cellElement.textContent = cell;
                cellElement.onclick = () => makeMove(index);
                gridElement.appendChild(cellElement);
            });
        }
        
        function makeMove(index) {
            if (board[index] === '' && gameActive && currentPlayer === 'X') {
                board[index] = 'X';
                renderBoard();
                
                if (checkWinner()) {
                    document.getElementById(`ticTacMessage${ticTacId}`).innerHTML = `
                        <div class="win-message">🎉 You win! 🎉</div>
                    `;
                    gameActive = false;
                    return;
                }
                
                if (board.every(cell => cell !== '')) {
                    document.getElementById(`ticTacMessage${ticTacId}`).innerHTML = `
                        <div class="tie-message">🤝 It's a tie!</div>
                    `;
                    gameActive = false;
                    return;
                }
                
                currentPlayer = 'O';
                setTimeout(computerMove, 500);
            }
        }
        
        function computerMove() {
            if (!gameActive) return;
            
            const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(x => x !== null);
            if (emptyCells.length > 0) {
                const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                board[randomIndex] = 'O';
                renderBoard();
                
                if (checkWinner()) {
                    document.getElementById(`ticTacMessage${ticTacId}`).innerHTML = `
                        <div class="lose-message">😅 Computer wins! Try again!</div>
                    `;
                    gameActive = false;
                    return;
                }
                
                if (board.every(cell => cell !== '')) {
                    document.getElementById(`ticTacMessage${ticTacId}`).innerHTML = `
                        <div class="tie-message">🤝 It's a tie!</div>
                    `;
                    gameActive = false;
                    return;
                }
                
                currentPlayer = 'X';
            }
        }
        
        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];
            
            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                return board[a] && board[a] === board[b] && board[a] === board[c];
            });
        }
        
        window[`resetTicTacToe${ticTacId}`] = function() {
            board = Array(9).fill('');
            currentPlayer = 'X';
            gameActive = true;
            renderBoard();
            document.getElementById(`ticTacMessage${ticTacId}`).innerHTML = '';
        };
        
        renderBoard();
    }
    
    // Track recent surprises to avoid repetition
    let recentSurprises = [];
    const maxRecentSurprises = 3;
    
    // This function is already defined above in the modal system

    if (surpriseBtn) {
        console.log('Adding click listener to surprise button');
        surpriseBtn.addEventListener('click', function() {
            console.log('Surprise button clicked!');
            displayRandomSurprise();
        });

        if (newSurpriseBtn) {
            newSurpriseBtn.addEventListener('click', function() {
                console.log('New surprise button clicked!');
                displayRandomSurprise();
            });
        }
    } else {
        console.error('Surprise button not found! Check if the element exists.');
    }

    // Animate sections on scroll (simple implementation)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Type writer effect for hero section (optional enhancement)
    const typewriterText = document.querySelector('.hero-content h2');
    if (typewriterText) {
        const text = typewriterText.textContent;
        typewriterText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typewriterText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Skill tags hover effect enhancement
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add active class to current nav link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #3498db !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            padding: 1rem 0;
        }
        
        .nav-menu.active .nav-link {
            margin: 0.5rem 0;
            text-align: center;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);
