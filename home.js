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