"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-01

      Project to read field values from a query string
      Author: 
      Date:   

      Filename: project09-01b.js
*/

// Store the query string after the first character
let query = location.search.slice(1);

// Replace + characters with spaces and decode URI components
query = query.replace(/\+/g, " ");
query = decodeURIComponent(query);

// Split the query string into an array of name=value pairs
let cardFields = query.split("&");

// Loop through each name=value pair
for (let item of cardFields) {
   let nameValue = item.split("=");
   let name = nameValue[0];
   let value = nameValue[1];
   
   document.getElementById(name).textContent = value;
}

