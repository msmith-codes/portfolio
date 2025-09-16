
function calculate(event)
{
    event.preventDefault();

    const aprInput = document.getElementById("aprInput");
    const amtBorrowInput = document.getElementById("amtBorrowInput");
    const numMonthsInput = document.getElementById("numMonthsInput");
    const result = document.getElementById("result");
    
    const x = (1 + aprInput) ** numMonthsInput;
    const payment = (amtBorrowInput * aprInput * x) / ( x - 1);

    result.innerHTML = `$${payment}`;
}
