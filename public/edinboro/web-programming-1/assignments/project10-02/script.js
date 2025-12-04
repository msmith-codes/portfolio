"use strict";
/*    JavaScript 7th Edition
      Chapter 10
      Project 10-02

      Project to create a drag and drop tangram puzzle
      Author: 
      Date:   

      Filename: project10-02.js
*/

// Reference to the tangram puzzle board
let puzzleBoard = document.getElementById("puzzle");
// Counter for the zIndex style of each puzzle piece
let zCounter = 1;
let eventX, eventY, tanX, tanY;

// Node list representing the tangram pieces
let tans = document.querySelectorAll("div#puzzle > img");

// Function to rotate a tan by a specified number of degrees
function rotateTan(elem, deg) {
   const obj = window.getComputedStyle(elem, null);
   const matrix = obj.getPropertyValue("transform");
   let angle = 0;
   if (matrix !== "none") {
      const values = matrix.split('(')[1].split(')')[0].split(',');
      const a = values[0];
      const b = values[1];
      angle = Math.round(Math.atan2(b, a) * (180/Math.PI));      
   }
   
   if (angle < 0) {
      angle += 360;
   }
   
   let newAngle = angle + deg;
   
   elem.style.transform = "rotate(" + newAngle + "deg)";
}

for (let i = 0; i < tans.length; i++) {
   tans[i].addEventListener("pointerdown", grabTan);
}

function grabTan(e) {
   if (e.shiftKey) {
      rotateTan(e.target, 15);
   } else {
      eventX = e.clientX;
      eventY = e.clientY;
      e.target.style.touchAction = "none";
      zCounter++;
      e.target.style.zIndex = zCounter;
      
      e.target.addEventListener("pointermove", moveTan);
      e.target.addEventListener("pointerup", dropTan);
   }
}

function moveTan(e) {
   let tanX = e.clientX - eventX;
   let tanY = e.clientY - eventY;
   
   e.target.style.left = e.target.offsetLeft + tanX + "px";
   e.target.style.top = e.target.offsetTop + tanY + "px";
   
   eventX = e.clientX;
   eventY = e.clientY;
}

function dropTan(e) {
   e.target.removeEventListener("pointermove", moveTan);
   e.target.removeEventListener("pointerup", dropTan);
}

