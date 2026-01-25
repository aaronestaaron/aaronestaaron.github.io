document.addEventListener('DOMContentLoaded', () => {

    // --- 1. BOOT SEQUENCE ---
    const bootScreen = document.getElementById('boot-screen');
    const bootBar = document.getElementById('boot-bar');
    const bootText = document.getElementById('boot-text');
    const bootMessages = [
        "LOADING REALITY ENGINE CORE...",
        "DECRYPTING QUANTUM STREAM...",
        "ESTABLISHING NEURAL INTERFACE...",
        "CALIBRATING SENSORY INPUTS...",
        "REALITY SYNCHRONIZED. WELCOME."
    ];
    let progress = 0;
    let messageIndex = 0;

    const bootInterval = setInterval(() => {
        progress += Math.random() * 10; // Random progress for organic feel
        if (progress >= 100) {
            progress = 100;
            clearInterval(bootInterval);
            bootText.innerText = bootMessages[bootMessages.length - 1]; // Final message
            setTimeout(() => {
                bootScreen.style.opacity = 0;
                bootScreen.style.filter = "blur(20px)"; // Blur out effect
                setTimeout(() => bootScreen.remove(), 1000); // Remove element after transition
            }, 800);
        }
        bootBar.style.width = `${progress}%`;
        // Update message based on progress
        messageIndex = Math.min(Math.floor((progress / 100) * (bootMessages.length - 1)), bootMessages.length - 2);
        bootText.innerText = bootMessages[messageIndex];
    }, 150);


    // --- 2. CUSTOM CURSOR LOGIC ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing1 = document.getElementById('cursor-ring-1');
    const cursorRing2 = document.getElementById('cursor-ring-2');

    document.addEventListener('mousemove', (e) => {
        // Using requestAnimationFrame for smoother cursor updates
        window.requestAnimationFrame(() => {
            const x = e.clientX;
            const y = e.clientY;

            // Dot follows instantly
            cursorDot.style.transform = `translate(${x}px, ${y}px)`;

            // Rings follow with slight delay (for magnetic/trailing effect)
            // Using setTimeout to stagger updates, creating a smooth trail
            setTimeout(() => {
                cursorRing1.style.transform = `translate(${x}px, ${y}px)`;
            }, 30); // Slight delay for ring 1
            setTimeout(() => {
                cursorRing2.style.transform = `translate(${x}px, ${y}px)`;
            }, 60); // More delay for ring 2
        });
    });

    // Cursor interaction with interactive elements (e.g., cards)
    const interactiveElements = document.querySelectorAll('.holo-card'); // Target interactive cards
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing1.style.width = '80px';
            cursorRing1.style.height = '80px';
            cursorRing1.style.borderColor = 'var(--neon-pink)';
            cursorRing2.style.opacity = '0'; // Hide outer ring on hover
        });
        el.addEventListener('mouseleave', () => {
            cursorRing1.style.width = '40px';
            cursorRing1.style.height = '40px';
            cursorRing1.style.borderColor = 'var(--neon-cyan)';
            cursorRing2.style.opacity = '0.5'; // Restore outer ring
        });
    });


    // --- 3. VOLUMETRIC 3D CARD TILT (PARALLAX DEPTH) ---
    const holoCards = document.querySelectorAll('.holo-card');

    document.addEventListener('mousemove', (e) => {
        holoCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the card's center
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            // Calculate rotation values. Dividing by rect.width/height controls sensitivity
            // Invert y-axis rotation for a natural "push" effect (mouse up -> card top comes forward)
            const rotateX = (y / rect.height) * -25; // Max tilt 25 degrees
            const rotateY = (x / rect.width) * 25; // Max tilt 25 degrees

            // Apply rotation to the card wrapper
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Apply a slight inverse translation to content for depth effect
            const content = card.querySelector('.holo-content');
            if(content) {
                // Content moves slightly in opposite direction of card tilt
                content.style.transform = `translateZ(60px) scale(0.95) translateX(${-x * 0.05}px) translateY(${-y * 0.05}px)`;
            }
        });
    });

    // Reset card tilt when mouse leaves the document
    document.addEventListener('mouseleave', () => {
        holoCards.forEach(card => {
            card.style.transform = `rotateX(0deg) rotateY(0deg)`;
            const content = card.querySelector('.holo-content');
            if(content) {
                content.style.transform = `translateZ(60px) scale(0.95)`; // Reset content transform
            }
        });
    });

}); // End DOMContentLoaded
