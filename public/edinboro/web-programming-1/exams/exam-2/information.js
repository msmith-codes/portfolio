function setText(id, value)
{
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = value || '-';
}

function informationMain() 
{
    const params = new URLSearchParams(window.location.search);
    const first = params.get('firstName');
    const last = params.get('lastName');
    const email = params.get('email');
    const state = params.get('state');

    if (first || last || email || state) {
        setText('firstNameVal', first);
        setText('lastNameVal', last);
        setText('emailVal', email);
        setText('stateVal', state);

        const main = document.querySelector('main.container');
        if (main) {
            const p = document.createElement('p');
            p.id = 'summary';
            p.style.marginTop = '1rem';

            // Create separate lines for each field using DOM nodes
            if (first) {
                const line = document.createElement('div');
                line.appendChild(document.createTextNode(first));
                p.appendChild(line);
            }
            if (last) {
                const line = document.createElement('div');
                line.appendChild(document.createTextNode(last));
                p.appendChild(line);
            }
            if (email) {
                const line = document.createElement('div');
                line.appendChild(document.createTextNode(email));
                p.appendChild(line);
            }
            if (state) {
                const line = document.createElement('div');
                line.appendChild(document.createTextNode(state));
                p.appendChild(line);
            }
            main.appendChild(p);
        }
    } else {
        const msg = document.getElementById('no-data-msg');
        if (msg) msg.style.display = 'block';
    }
}

informationMain();