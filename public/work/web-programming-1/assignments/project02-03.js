/*    JavaScript 7th Edition
      Chapter 2
      Project 02-03

      Application to return the shape of a clicked object
      Author: Michael Smith 
      Date: 9/15/2025

      Filename: project02-03.js
 */

const square = document.getElementById('square');
const triangle = document.getElementById('triangle');
const circle = document.getElementById('circle');

const feedback = document.getElementById('feedback');

function reset()
{
    feedback.innerHTML = "";
}

function hover(str)
{
    feedback.innerHTML = `You're hovering over the ${str}`
}

square.onmouseover = function() {
    hover('square');
};

square.onmouseout = function() {
    reset();
}

triangle.onmouseover = function() {
    hover('triangle');
}

triangle.onmouseout = function() {
    reset();
}

circle.onmouseover = function() {
    hover('circle');
}

circle.onmouseout = function() {
    reset();
}
