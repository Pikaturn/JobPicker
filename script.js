'use strict';

const correctPassword = 'Dsp2024';
const content = document.getElementById('content-container');
const currentDateHtml = document.getElementById('current-date');
const nextMonday = document.getElementById('next-monday');
const currentDateGlobal = new Date();
let body = document.getElementById('body-b');
let h1 = document.getElementById('title');

h1.addEventListener('click', function () {
  window.location.href = 'index.html';
});

// const promptForPassword = () => {
//   let enteredPassword = prompt('Enter the key to view the content:', '');
//   if (enteredPassword === correctPassword) {
//     body.style.display = 'block';
//   } else if (enteredPassword !== correctPassword) {
//     alert('Incorrect Key. Try again');
//     promptForPassword();
//   } else if (enteredPassword === '') {
//     promptForPassword();
//   }
// };

function displayCurrentDate() {
  const currentDate = new Date(); // fetch current date
  const formattedDate = currentDate.toDateString(); // format to date string
  currentDateHtml.innerHTML = `Current Date: <span id="name">${formattedDate}</span>`; // update the current-date
}

function getNextSunday() {
  const currentDate = new Date(); // create a variable with the current date

  const dayofWeek = currentDate.getDay(); // get the current day of the week
  const daysUntilSunday = dayofWeek === 6 ? 1 : 7 - dayofWeek; // if the current day of the week =0 then there's 1 day left till next monday otherwise 8 - current day of the week
  currentDate.setDate(currentDate.getDate() + daysUntilSunday); // gets current date and adds days that are left untill Sunday
  const nextSundayDate = currentDate.toDateString(); // converts to readable string
  return nextSundayDate;
}

getNextSunday();
displayCurrentDate();

nextMonday.textContent = `Next Scheduled Assignment: ${getNextSunday()}`;
// promptForPassword();
