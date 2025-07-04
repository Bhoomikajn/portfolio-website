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

    // Surprise Section Functionality
    const surpriseBtn = document.getElementById('surpriseBtn');
    const newSurpriseBtn = document.getElementById('newSurpriseBtn');
    const surpriseContent = document.getElementById('surpriseContent');

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
        function showPuzzle() {
            surpriseContent.innerHTML = `
                 3ch3>🧩 Sliding Puzzle Game</h3>
                 3cp>Arrange the numbers 1-8 in order!</p>
                 3cdiv class="puzzle-grid">
                     3cdiv class="puzzle-tile">1</div>
                     3cdiv class="puzzle-tile">2</div>
                     3cdiv class="puzzle-tile">3</div>
                     3cdiv class="puzzle-tile">4</div>
                     3cdiv class="puzzle-tile">5</div>
                     3cdiv class="puzzle-tile">6</div>
                     3cdiv class="puzzle-tile">7</div>
                     3cdiv class="puzzle-tile">8</div>
                     3cdiv class="puzzle-tile empty"></div>
                 3c/div>
            `;
        },
        async function showRandomRiddle() {
            // Show loading message first
            surpriseContent.innerHTML = `
                 3ch3>🤔 Riddle Me This!</h3>
                 3cdiv class="loading-message">
                     3ci class="fas fa-spinner fa-spin"></i> Fetching a fresh riddle for you...
                 3c/div>
            `;
            
            try {
                const riddle = await fetchRandomRiddle();
                const riddleId = Date.now(); // Unique ID for this riddle
                
                surpriseContent.innerHTML = `
                     3ch3>🤔 Riddle Me This!</h3>
                     3cdiv class="riddle-container">
                         3cp class="riddle-question"> 3ci>${riddle.question}</i></p>
                         3cdiv class="riddle-input-section">
                             3cinput type="text" id="riddleInput${riddleId}" placeholder="Type your answer here and press Enter..." class="riddle-input">
                             3cbutton onclick="checkRiddleAnswer${riddleId}()" class="game-controls riddle-submit-btn">🚀 Submit Answer</button>
                         3c/div>
                         3cdiv id="riddleResult${riddleId}" class="riddle-result"></div>
                         3cdiv id="confetti${riddleId}" class="confetti-container"></div>
                     3c/div>
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
                    result.innerHTML = ' 3cdiv class="hint-message">💡 Please type your answer first!</div>';
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
                         3cdiv class="correct-answer">
                            🎉 AMAZING! You got it right! 🎉<br>
                             3cstrong>Answer: ${riddle.answer}</strong><br>
                             3cspan class="celebration-text">You're brilliant! ✨</span>
                         3c/div>
                    `;
                    createConfetti(confettiContainer);
                    input.disabled = true;
                } else {
                    // Wrong answer - show encouragement and reveal answer
                    const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
                    result.innerHTML = `
                         3cdiv class="wrong-answer">
                             3cdiv class="encouragement">${randomMessage}</div>
                             3cdiv class="answer-reveal">The answer is:  3cstrong>${riddle.answer}</strong></div>
                             3cdiv class="motivation">Keep practicing - you're getting smarter! 🧠💫</div>
                         3c/div>
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
                surpriseContent.innerHTML = `
                     3ch3>🤔 Riddle Me This!</h3>
                     3cdiv class="error-message">Oops! Couldn't fetch a riddle. Please try another surprise!</div>
                `;
            }
        },
        async function showRandomQuote() {
            // Show loading message
            surpriseContent.innerHTML = `
                 3ch3>💭 Inspirational Quote</h3>
                 3cdiv class="loading-message">
                     3ci class="fas fa-spinner fa-spin"></i> Getting an inspiring quote...
                 3c/div>
            `;
            
            try {
                const quote = await fetchRandomQuote();
                surpriseContent.innerHTML = `
                     3ch3>💭 Inspirational Quote</h3>
                     3cdiv class="quote-container">
                         3cp class="quote-text"> 3ci>"${quote.text}"</i></p>
                         3cp class="quote-author">- ${quote.author}</p>
                     3c/div>
                `;
            } catch (error) {
                surpriseContent.innerHTML = `
                     3ch3>💭 Inspirational Quote</h3>
                     3cdiv class="error-message">Couldn't fetch a quote right now. Please try another surprise!</div>
                `;
            }
        },
        async function showRandomJoke() {
            // Show loading message
            surpriseContent.innerHTML = `
                 3ch3>😂 Laugh Out Loud</h3>
                 3cdiv class="loading-message">
                     3ci class="fas fa-spinner fa-spin"></i> Finding a funny joke...
                 3c/div>
            `;
            
            try {
                const joke = await fetchRandomJoke();
                surpriseContent.innerHTML = `
                     3ch3>😂 Laugh Out Loud</h3>
                     3cdiv class="joke-container">
                         3cp class="joke-text"> 3ci>${joke.setup}</i></p>
                         3cdiv class="riddle-answer">${joke.punchline}</div>
                     3c/div>
                `;
            } catch (error) {
                surpriseContent.innerHTML = `
                     3ch3>😂 Laugh Out Loud</h3>
                     3cdiv class="error-message">Couldn't fetch a joke right now. Please try another surprise!</div>
                `;
            }
        },
        async function showRandomFact() {
            // Show loading message
            surpriseContent.innerHTML = `
                 3ch3>🤓 Fun Fact</h3>
                 3cdiv class="loading-message">
                     3ci class="fas fa-spinner fa-spin"></i> Discovering an interesting fact...
                 3c/div>
            `;
            
            try {
                const fact = await fetchRandomFact();
                surpriseContent.innerHTML = `
                     3ch3>🤓 Fun Fact</h3>
                     3cdiv class="quote-container">
                         3cp class="quote-text"> 3ci>${fact}</i></p>
                         3cp class="quote-author">- Random Facts</p>
                     3c/div>
                `;
            } catch (error) {
                surpriseContent.innerHTML = `
                     3ch3>🤓 Fun Fact</h3>
                     3cdiv class="error-message">Couldn't fetch a fact right now. Please try another surprise!</div>
                `;
            }
        },
        function showSpinningWheel() {
            surpriseContent.innerHTML = `
                 3ch3>🎡 Spinning Wheel of Positivity</h3>
                 3cdiv class="wheel-container">
                     3cdiv class="wheel" id="wheel">
                         3cdiv class="wheel-center">SPIN</div>
                     3c/div>
                     3cdiv class="wheel-pointer">▼</div>
                     3cbutton class="game-controls" onclick="spinWheel()">🎯 Spin the Wheel!</button>
                     3cdiv id="wheelResult" class="wheel-result"></div>
                 3c/div>
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
                    result.innerHTML = ` 3cdiv class="wheel-message">${randomMessage}</div>`;
                    result.style.display = 'block';
                }, 3000);
            };
        },
        function showSudoku() {
            surpriseContent.innerHTML = `
                 3ch3>🧮 Sudoku Challenge</h3>
                 3cp>Fill in numbers 1-9 (simplified version)</p>
                 3cdiv class="sudoku-grid">
                    ${[...Array(81)].map((_, i) => ` 3cdiv class="sudoku-cell"> 3cinput type="text" maxlength="1"></div>`).join('')}
                 3c/div>
            `;
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

    function displayRandomSurprise() {
        const randomIndex = Math.floor(Math.random() * surprises.length);
        surprises[randomIndex]();

        surpriseContent.style.display = 'block';
        newSurpriseBtn.style.display = 'inline-block';
    }

    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', function() {
            displayRandomSurprise();
            surpriseBtn.style.display = 'none';
        });

        newSurpriseBtn.addEventListener('click', function() {
            displayRandomSurprise();
        });
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
