// Set the date we're counting down to
const countdownDate = new Date("March 14, 2025 00:00:00").getTime();

// Update the countdown every 1 second
const timer = setInterval(function() {
    // Get today's date and time
    const now = new Date().getTime();
    
    // Find the distance between now and the countdown date
    const distance = countdownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the results
    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
    
    // If the countdown is finished, display some text
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        document.querySelector(".countdown-title").textContent = "The Date Has Arrived!";
    }
}, 1000);


// Countdown value animation
const countdownValues = document.querySelectorAll('.countdown-value');
countdownValues.forEach(value => {
    value.addEventListener('transitionend', () => {
        value.classList.remove('pulse');
    });
});

function pulseCountdownChange() {
    countdownValues.forEach(value => {
        const currentValue = value.textContent;
        value.setAttribute('data-last-value', currentValue);
        
        // Set up MutationObserver to detect changes
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'characterData' || mutation.type === 'childList') {
                    const newValue = mutation.target.textContent || mutation.target.textContent;
                    const lastValue = value.getAttribute('data-last-value');
                    
                    if (newValue !== lastValue) {
                        // Add pulse animation class when value changes
                        value.classList.add('pulse');
                        value.setAttribute('data-last-value', newValue);
                    }
                }
            });
        });
        
        // Start observing the element
        observer.observe(value, { characterData: true, childList: true, subtree: true });
    });
}

// Initialize the pulse animation for countdown
pulseCountdownChange();

/*  Custom cursor effect
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Expand cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, .music-button, .drawing-toggle');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'rgba(0, 0, 0, 0.8)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'rgba(0, 0, 0, 0.5)';
        });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    interactiveElements.forEach(element => {
        element.style.cursor = 'none';
    });
});

// Floating particles effect
function createParticles() {
    const container = document.querySelector('.container');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 3px and 8px
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight + window.innerHeight;
        particle.style.left = `${startX}px`;
        particle.style.bottom = `${-startY}px`;
        
        // Random animation duration between 10s and 20s
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay so they don't all start at once
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        document.body.appendChild(particle);
    }
}

// Initialize particles
window.addEventListener('load', createParticles);

//Drawing functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create drawing toggle button
    const drawingToggle = document.createElement('div');
    drawingToggle.className = 'drawing-toggle';
    drawingToggle.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    document.body.appendChild(drawingToggle);
    
    // Create canvas for drawing
    const drawingCanvas = document.createElement('canvas');
    drawingCanvas.id = 'drawing-canvas';
    document.body.appendChild(drawingCanvas);
    
    let isDrawingMode = false;
    let isDrawing = false;
    let drawElements = [];
    
    // Toggle drawing mode
    drawingToggle.addEventListener('click', () => {
        isDrawingMode = !isDrawingMode;
        drawingToggle.classList.toggle('active');
        
        if (isDrawingMode) {
            drawingCanvas.style.pointerEvents = 'auto';
            document.body.style.cursor = 'crosshair';
        } else {
            drawingCanvas.style.pointerEvents = 'none';
            document.body.style.cursor = 'none';
            
            // Animate existing elements when turning off drawing mode
            drawElements.forEach(element => {
                if (!element.classList.contains('animating')) {
                    element.classList.add('animating');
                }
            });
        }
    });
    
    // Handle drawing
    drawingCanvas.addEventListener('mousedown', (e) => {
        if (isDrawingMode) {
            isDrawing = true;
            createDrawingElement(e.clientX, e.clientY);
        }
    });
    
    drawingCanvas.addEventListener('mousemove', (e) => {
        if (isDrawingMode && isDrawing) {
            createDrawingElement(e.clientX, e.clientY);
        }
    });
    
    drawingCanvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });
    
    drawingCanvas.addEventListener('mouseleave', () => {
        isDrawing = false;
    });
    
    // Touch support for mobile
    drawingCanvas.addEventListener('touchstart', (e) => {
        if (isDrawingMode) {
            isDrawing = true;
            const touch = e.touches[0];
            createDrawingElement(touch.clientX, touch.clientY);
            e.preventDefault();
        }
    });
    
    drawingCanvas.addEventListener('touchmove', (e) => {
        if (isDrawingMode && isDrawing) {
            const touch = e.touches[0];
            createDrawingElement(touch.clientX, touch.clientY);
            e.preventDefault();
        }
    });
    
    drawingCanvas.addEventListener('touchend', () => {
        isDrawing = false;
    });
    
    function createDrawingElement(x, y) {
        const element = document.createElement('div');
        element.className = 'drawing-element';
        
        // Random size between 10px and 25px
        const size = Math.random() * 15 + 10;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Position at cursor/touch point
        element.style.left = `${x - size/2}px`;
        element.style.top = `${y - size/2}px`;
        
        // Random opacity
        element.style.opacity = Math.random() * 0.3 + 0.7;
        
        document.body.appendChild(element);
        drawElements.push(element);
    }*/ 
