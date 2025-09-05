let startTime, interval, running = false;
const timerDisplay = document.getElementById('timer');
const timesList = document.getElementById('times');
let times = [];

    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    }

    function updateTimer() {
        const elapsed = Date.now() - startTime;
        timerDisplay.textContent = formatTime(elapsed);
    }

// No button controls; all logic is handled by spacebar

    function renderTimes() {
        timesList.innerHTML = '';
        times.forEach((t, i) => {
            const li = document.createElement('li');
            li.textContent = `#${i + 1}: ${t}`;
            timesList.appendChild(li);
        });
    }
    // Spacebar hold to prepare, release to start, press again to stop
    let readyToStart = false;
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && !e.repeat) {
            e.preventDefault();
            if (!running && !readyToStart) {
                // Prepare to start (show a visual cue if desired)
                readyToStart = true;
                timerDisplay.style.color = '#f39c12'; // orange for ready
            } else if (running) {
                // Stop timer and record time
                running = false;
                clearInterval(interval);
                const elapsed = Date.now() - startTime;
                timerDisplay.textContent = formatTime(elapsed);
                times.unshift(formatTime(elapsed));
                renderTimes();
                timerDisplay.style.color = '#fff';
            }
        }
        // R to reset timer
        if (e.code === 'KeyR' && !e.repeat) {
            running = false;
            readyToStart = false;
            clearInterval(interval);
            timerDisplay.textContent = '00:00.00';
            timerDisplay.style.color = '#fff';
        }
    });

    document.addEventListener('keyup', function(e) {
        if (e.code === 'Space' && readyToStart && !running) {
            // Start timer on spacebar release
            readyToStart = false;
            running = true;
            startTime = Date.now();
            interval = setInterval(updateTimer, 10);
            timerDisplay.style.color = '#2ecc40'; // green for running
        }
    });