"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Project 06-03

      Script to complete a form containing billing and shipping address information
      Author: 
      Date:   

      Filename: project06-03.js
*/

window.addEventListener("load", function() {
   let useShip = document.getElementById("useShip");
   useShip.addEventListener("click", copyShippingToBilling);
});

function copyShippingToBilling() {
   let useShip = document.getElementById("useShip");
   if (useShip.checked) {
      document.getElementById("firstnameBill").value = document.getElementById("firstnameShip").value;
      document.getElementById("lastnameBill").value = document.getElementById("lastnameShip").value;
      document.getElementById("address1Bill").value = document.getElementById("address1Ship").value;
      document.getElementById("address2Bill").value = document.getElementById("address2Ship").value;
      document.getElementById("cityBill").value = document.getElementById("cityShip").value;
      document.getElementById("countryBill").value = document.getElementById("countryShip").value;
      document.getElementById("codeBill").value = document.getElementById("codeShip").value;
      document.getElementById("stateBill").selectedIndex = document.getElementById("stateShip").selectedIndex;
   }
}

let formElements = document.querySelectorAll("input[type='text']");
let fieldCount = formElements.length;
let errorBox = document.getElementById("errorBox");

for (let i = 0; i < fieldCount; i++) {
   formElements[i].addEventListener("invalid", showValidationError);
}

function showValidationError(evt) {
   evt.preventDefault();
   errorBox.textContent = "Complete all highlighted fields";
}

