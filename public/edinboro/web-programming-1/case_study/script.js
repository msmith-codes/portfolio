    // Timer and history state + helper functions
    let times = [];
    let running = false;
    let startTime = 0;
    let interval = null;
    let timerDisplay; // assigned on DOMContentLoaded

    // Helper to read a cookie by name
    function getCookie(name) {
        const pairs = document.cookie ? document.cookie.split('; ') : [];
        for (let i = 0; i < pairs.length; i++) {
            const p = pairs[i].split('=');
            const key = p.shift();
            const val = p.join('=');
            if (key === name) return decodeURIComponent(val || '');
        }
        return null;
    }

    function formatTime(ms) {
        const totalCentis = Math.round(ms / 10);
        const centis = totalCentis % 100;
        const totalSeconds = Math.floor(totalCentis / 100);
        const secs = totalSeconds % 60;
        const mins = Math.floor(totalSeconds / 60);
        const pad = (n, width = 2) => String(n).padStart(width, '0');
        return `${pad(mins)}:${pad(secs)}.${pad(centis)}`;
    }

    function parseTimeToMs(formatted) {
        // expected MM:SS.CC or M:SS.CC
        if (!formatted) return null;
        const m = formatted.trim().match(/^(\d+):(\d{2})\.(\d{2})$/);
        if (!m) return null;
        const mins = parseInt(m[1], 10);
        const secs = parseInt(m[2], 10);
        const centis = parseInt(m[3], 10);
        return ((mins * 60) + secs) * 1000 + Math.round(centis * 10);
    }

    function averageLastN(n) {
        if (!n || times.length === 0) return null;
        const take = Math.min(n, times.length);
        let sum = 0;
        for (let i = 0; i < take; i++) {
            const ms = parseTimeToMs(times[i]);
            if (!ms) return null;
            sum += ms;
        }
        const avg = Math.round(sum / take);
        return formatTime(avg);
    }

    function updateAveragesDisplay() {
        const el5 = document.getElementById('avg5Val');
        const el12 = document.getElementById('avg12Val');
        if (el5) {
            el5.textContent = times.length >= 5 ? averageLastN(5) : '—';
        }
        if (el12) {
            el12.textContent = times.length >= 12 ? averageLastN(12) : '—';
        }
    }

    function renderTimes() {
        const list = document.getElementById('times');
        if (!list) return;
        list.innerHTML = '';
        for (let i = 0; i < times.length; i++) {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = times[i];
            span.className = 'time-entry';
            li.appendChild(span);

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = 'Remove';
            btn.className = 'remove-btn';
            // remove the correct index (times is newest-first)
            btn.addEventListener('click', function () {
                if (!confirm('Remove this time from history?')) return;
                times.splice(i, 1);
                renderTimes();
            });
            li.appendChild(btn);
            list.appendChild(li);
        }
        updateAveragesDisplay();
        // persist times to localStorage so they survive sessions
        try {
            localStorage.setItem('cube_times', JSON.stringify(times));
        } catch (e) {
            console.warn('Could not save times to localStorage', e);
        }
        // Also write a cookie fallback (useful if localStorage unavailable).
        try {
            const json = JSON.stringify(times);
            // Cookies have size limits (~4KB); avoid writing huge cookies.
            if (json.length < 3800) {
                const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365); // 1 year
                document.cookie = 'cube_times=' + encodeURIComponent(json) + '; path=/; expires=' + expires.toUTCString();
            } else {
                // If too large, remove cookie to avoid truncation issues
                document.cookie = 'cube_times=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                console.warn('Times data too large for cookie; cookie not written.');
            }
        } catch (e) {
            console.warn('Could not save times to cookie', e);
        }
    }

    function updateTimer() {
        if (!running) return;
        const elapsed = Date.now() - startTime;
        if (timerDisplay) timerDisplay.textContent = formatTime(elapsed);
    }

    // Wire up UI: calculate average when button clicked
    document.addEventListener('DOMContentLoaded', function () {
        // initialize DOM references
        timerDisplay = document.getElementById('timer');
        // load persisted times (if any)
        try {
            const raw = localStorage.getItem('cube_times');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) times = parsed;
            }
        } catch (e) {
            console.warn('Failed to load times from localStorage', e);
        }
        // If localStorage didn't yield times, try cookie fallback
        try {
            if (!times || times.length === 0) {
                const cookieRaw = getCookie('cube_times');
                if (cookieRaw) {
                    const parsed = JSON.parse(cookieRaw);
                    if (Array.isArray(parsed)) times = parsed;
                }
            }
        } catch (e) {
            console.warn('Failed to load times from cookie', e);
        }
        renderTimes();
        const btn = document.getElementById('calcAvgBtn');
        const input = document.getElementById('avgN');
        const out = document.getElementById('avgResult');
        if (btn && input && out) {
            btn.addEventListener('click', function () {
                const n = parseInt(input.value, 10) || 0;
                if (n <= 0) {
                    out.textContent = 'Enter a positive number.';
                    return;
                }
                if (times.length === 0) {
                    out.textContent = 'No recorded times yet.';
                    return;
                }
                if (n > times.length) {
                    out.textContent = `Only ${times.length} time(s) available; computing average of ${times.length}.`;
                }
                const avg = averageLastN(n);
                if (avg === null) {
                    out.textContent = 'Could not compute average.';
                } else {
                    out.textContent = `Average of last ${Math.min(n, times.length)}: ${avg}`;
                }
            });

            // AO5 / AO12 quick buttons
            const ao5 = document.getElementById('ao5Btn');
            const ao12 = document.getElementById('ao12Btn');
            if (ao5) ao5.addEventListener('click', function () {
                const needed = 5;
                if (times.length < needed) {
                    out.textContent = `Need at least ${needed} times recorded (have ${times.length}).`;
                    return;
                }
                const avg = averageLastN(needed);
                out.textContent = `AO${needed}: ${avg}`;
            });
            if (ao12) ao12.addEventListener('click', function () {
                const needed = 12;
                if (times.length < needed) {
                    out.textContent = `Need at least ${needed} times recorded (have ${times.length}).`;
                    return;
                }
                const avg = averageLastN(needed);
                out.textContent = `AO${needed}: ${avg}`;
            });
        }

        // --- Add-time form with exception handling and multi-field validation ---
        const addForm = document.getElementById('addTimeForm');
        const addInput = document.getElementById('addTimeInput');
        const addError = document.getElementById('addTimeError');
        if (addForm && addInput && addError) {
            // if query string contains form values, prefill
            try {
                const params = new URLSearchParams(window.location.search);
                if (params.has('time')) addInput.value = params.get('time');
                if (params.has('addEvent')) {
                    const ev = params.get('addEvent');
                    const r = document.querySelector(`input[name="addEvent"][value="${ev}"]`);
                    if (r) r.checked = true;
                }
                if (params.has('addSession')) {
                    const s = params.get('addSession');
                    const sel = document.getElementById('addSession');
                    if (sel) sel.value = s;
                }
                if (params.has('addPenalty')) {
                    const p = params.get('addPenalty');
                    const pen = document.getElementById('addPenalty');
                    if (pen) pen.checked = p === '1' || p === 'true';
                }
                if (params.has('addNotes')) {
                    const n = params.get('addNotes');
                    const notesEl = document.getElementById('addNotes');
                    if (notesEl) notesEl.value = n;
                }
            } catch (e) {
                console.warn('Failed to parse query string', e);
            }

            // (Share button removed) -- no-op

            addForm.addEventListener('submit', function (ev) {
                ev.preventDefault();
                addError.innerHTML = '';
                try {
                    const raw = addInput.value.trim();
                    const eventSelected = document.querySelector('input[name="addEvent"]:checked');
                    const sessionEl = document.getElementById('addSession');
                    const sessionVal = sessionEl ? sessionEl.value : '';
                    const penaltyEl = document.getElementById('addPenalty');
                    const penalty = penaltyEl ? penaltyEl.checked : false;
                    const notesEl = document.getElementById('addNotes');
                    const notes = notesEl ? notesEl.value.trim() : '';

                    const errors = [];

                    // Validate event radio
                    if (!eventSelected) {
                        errors.push('Please select an event (3x3, 4x4, or 2x2).');
                    }

                    // Validate session select
                    if (!sessionVal) {
                        errors.push('Please choose a session.');
                    }

                    // Validate time format
                    if (!raw) {
                        errors.push('Please enter a time in MM:SS.CC format.');
                    } else {
                        const ok = /^\d+:\d{2}\.\d{2}$/.test(raw);
                        if (!ok) {
                            errors.push('Invalid time format. Expected MM:SS.CC (e.g. 01:23.45).');
                        }
                    }

                    // Validate notes length (example of verifying another aspect)
                    if (notes && notes.length > 200) {
                        errors.push('Notes must be 200 characters or fewer.');
                    }

                    if (errors.length) {
                        // Show errors as a list
                        addError.innerHTML = errors.map(function (s) { return '<div>' + s + '</div>'; }).join('');
                        return;
                    }

                    // parse and apply penalty if any
                    const ms = parseTimeToMs(raw);
                    if (!ms || ms <= 0) {
                        throw new Error('Time could not be parsed or is zero.');
                    }
                    const finalMs = penalty ? ms + 2000 : ms;

                    // add formatted time to history (newest first)
                    times.unshift(formatTime(finalMs));
                    renderTimes();
                    // after successful add, clear any query-string form values so URL isn't polluted
                    try {
                        history.replaceState(null, '', location.pathname);
                    } catch (e) { /* ignore */ }
                    // clear form fields
                    addInput.value = '';
                    if (notesEl) notesEl.value = '';
                    if (sessionEl) sessionEl.value = '';
                    if (penaltyEl) penaltyEl.checked = false;
                    if (eventSelected) {
                        // uncheck selected radio
                        const r = document.querySelector('input[name="addEvent"]:checked');
                        if (r) r.checked = false;
                    }
                } catch (err) {
                    // show a user-friendly message in the page and log the full error
                    addError.textContent = err && err.message ? err.message : 'An unexpected error occurred.';
                    console.error('Add time error:', err);
                }
            });
        }
    });

    let readyToStart = false;
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && !e.repeat) {
            e.preventDefault();
            if (!running && !readyToStart) {
                readyToStart = true;
                timerDisplay.style.color = '#f39c12'; 
            } else if (running) {
                running = false;
                clearInterval(interval);
                const elapsed = Date.now() - startTime;
                timerDisplay.textContent = formatTime(elapsed);
                times.unshift(formatTime(elapsed));
                renderTimes();
                timerDisplay.style.color = '#fff';
            }
        }
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
            readyToStart = false;
            running = true;
            startTime = Date.now();
            interval = setInterval(updateTimer, 10);
            timerDisplay.style.color = '#2ecc40'; 
        }
    });
