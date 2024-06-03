const fs = require('fs'); // calling node module for file operations

const teamMembers = ['Dovilė', 'Viktorija', 'Ernestas'];

// function simulateRandomPicking(iterations) {
//   const lastWeekAssignmentsString = fs.readFileSync(
//     'lastWeekAssignments.json',
//     'utf8'
//   );
//   const lastWeekPgDeals = lastWeekAssignmentsString.pgDeals;
//   const lastWeekZendesk = lastWeekAssignmentsString.zenDesk;
//   const pickCount = {};
//   for (let i = 0; i < iterations; i++) {
//     const pgDeals = getRandomTeamMember([lastWeekPgDeals]);
//     const zenDesk = getRandomTeamMember([lastWeekZendesk, pgDeals]);

//     pickCount[pgDeals] = (pickCount[pgDeals] || 0) + 1;
//     pickCount[zenDesk] = (pickCount[zenDesk] || 0) + 1;
//   }
// }

const getRandomTeamMember = (excludeList) => {
  // excludeList function which takes last week's assigned members and excludes them
  const availableMembers = teamMembers.filter(
    (member) => !excludeList.includes(member)
  );
  // created a new variable where we store filtered out members which are not in the exclude list (lasWeekPgdeals, lastWeekZendesk, PgDeals)
  const randomIndex = Math.floor(Math.random() * availableMembers.length); // member picker calculation, a random number is generated from 0 to 1 then it is multiplied by the length of the array and rounded down to an integer. The final result is from 0 to arrays length (0-2)
  return availableMembers[randomIndex]; // available member returned
};

const getLastWeekAssignments = () => {
  try {
    const lastWeekAssignmentsString = fs.readFileSync(
      'lastWeekAssignments.json',
      'utf8'
    ); // try to read lastweekAssigmnet.json file
    return JSON.parse(lastWeekAssignmentsString); //return an object with key/value pairs of job and person
  } catch (error) {
    console.error('Error reading last week assignments:', error.message); // if failed return error in the console
    return {};
  }
};

function generateHtml() {
  const lastWeekAssignments = getLastWeekAssignments(); // object key/value pairs assigned to variable
  const lastWeekPgDeals = lastWeekAssignments.pgDeals; // add object values to variables
  const lastWeekZendesk = lastWeekAssignments.zendesk; //

  // Get a random team member for PG Deals Manager (excluding last week's manager)
  const pgDeals = getRandomTeamMember([lastWeekPgDeals]);
  console.log(pgDeals);
  // Get a random team member for Zendesk Manager (excluding last week's manager and PG Deals Manager)
  const zendesk = getRandomTeamMember([lastWeekZendesk, pgDeals]);
  console.log(zendesk);

  const thisWeekAssignments = { pgDeals, zendesk }; // Save this week's assignments to be used as last week's assignments next time
  fs.writeFileSync(
    'lastWeekAssignments.json',
    JSON.stringify(thisWeekAssignments)
  );

  const htmlContent = `
    
  <!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="styles.css" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');
    </style>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weekly Tasks Assigner</title>
  </head>
  <body>
  <div #body-b>
    <div id="body-container">
      <h1 id="title"><u>Weekly Tasks Assigner</u></h1>
      <div id="content-container"></div>
      <div id="current-date">Current date:</div>
      
    </div>
    <div id="tasks">
      <div id="pg-deals">
        PG Deals Manager: <span id="name">${pgDeals}</span>
      </div>

      <div id="zendesk">Zendesk Manager: <span id="name">${zendesk}</span></div>
      <div id="line"></div>
      <div id="last-week">
        <div id="last-week-picks">Last Week Picks</div>
        <div id="last-name">
          PG Deals Manager: <span id="last-name">${lastWeekPgDeals}</span>
        </div>

        <div id="last-name">Zendesk Manager: <span id="last-name">${lastWeekZendesk}</span></div>
      </div>
      <div id="next-monday">Next Scheduled Assigment:</div>
    </div>
    <script src="script.js"></script>
    <footer>
    <p>&copy; 2023 MP All rights reserved.</p>
    </div>
  </body>
</html>
`;
  fs.writeFileSync('index.html', htmlContent); //creates/updates the index.html with new values
}

generateHtml();

// simulateRandomPicking(100000);

// simulateRandomPicking(); // Average tests
