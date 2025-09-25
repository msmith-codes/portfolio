
const sides = document.getElementById("sides");
const times = document.getElementById("times");
const result = document.getElementById("result");

function rollDice(event) {
    event.preventDefault();

    const sides_value = sides.value;
    const times_value = times.value;

    const results = [];

    for(let i = 0; i < times_value; ++i) {
        const num = Math.floor(Math.random() * sides_value) + 1;
        results.push(num);
    }

    result.innerHTML = results.join(", ");
}

function clearResults(event) {
    event.preventDefault();

    result.innerHTML = "";
}