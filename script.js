document.addEventListener('DOMContentLoaded', () => {
    const coin = document.querySelector('.coin');
    const flipButton = document.getElementById('flip-button');
    const headsCount = document.getElementById('heads-count');
    const tailsCount = document.getElementById('tails-count');
    const totalFlips = document.getElementById('total-flips');

    let isFlipping = false;
    let heads = 0;
    let tails = 0;
    let total = 0;
    let currentRotation = 0;

    function updateStats(result) {
        if (result === 'heads') {
            heads++;
            headsCount.textContent = heads;
        } else {
            tails++;
            tailsCount.textContent = tails;
        }
        total++;
        totalFlips.textContent = total;
    }

    function flipCoin() {
        if (isFlipping) return;
        
        isFlipping = true;
        flipButton.disabled = true;

        // Generate random number between 0 and 1
        const random = Math.random();
        const result = random < 0.5 ? 'heads' : 'tails';

        // Calculate the final rotation
        const extraFlips = 5; // Number of complete rotations
        const finalRotation = result === 'heads' ? 
            extraFlips * 360 : // For heads, end at 0 degrees
            extraFlips * 360 + 180; // For tails, end at 180 degrees

        // Add flip animation class with dynamic rotation
        coin.style.transform = `rotateY(${finalRotation}deg)`;
        coin.classList.add('flip');

        // Update stats after animation
        setTimeout(() => {
            updateStats(result);
            coin.classList.remove('flip');
            isFlipping = false;
            flipButton.disabled = false;
        }, 1000);
    }

    // Add click event listener to flip button
    flipButton.addEventListener('click', flipCoin);

    // Add keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !isFlipping) {
            e.preventDefault();
            flipCoin();
        }
    });
});
