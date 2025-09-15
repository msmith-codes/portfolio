/*    JavaScript 7th Edition
      Chapter 2
      Project 02-01

      Celsius <-> Farenheit Coverter
      Author: Michael Smith 
      Date: 9/15/2025   

      Filename: project02-01.js
 */

const cValue = document.getElementById('cValue');
const fValue = document.getElementById('fValue');


function FahrenheitToCelsius(degree)
{
    return (degree - 32) / 1.8;
}

function CelsiusToFahrenheit(degree)
{
    return (degree * 1.8) + 32;
}


cValue.onchange = function() {
    var cDegree = cValue.value;
    fValue.value = CelsiusToFahrenheit(cDegree);
};

fValue.onchange = function() {
    var fDegree = fValue.value;
    cValue.value = FahrenheitToCelsius(fDegree);
}
