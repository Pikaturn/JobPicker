const fs = require('fs');

const teamMembers = ['Mindaugas', 'Viktorija', 'Kristijonas', 'Paulius', 'Dovile'];

function getRandomTeamMember(excludeList) {
    const availableMembers = teamMembers.filter(member => !excludeList.includes(member));
    const randomIndex = Math.floor(Math.random() * availableMembers.length);
    return availableMembers[randomIndex];
}

function getLastWeekAssignments() {
    try {
        const lastWeekAssignmentsString = fs.readFileSync('lastWeekAssignments.json', 'utf8');
        return JSON.parse(lastWeekAssignmentsString);
    } catch (error) {
        console.error('Error reading last week assignments:', error.message);
        return {};
    }
}

function generateHtml() {
    const lastWeekAssignments = getLastWeekAssignments();
    console.log(lastWeekAssignments);
    const lastWeekPgDeals = lastWeekAssignments.pgDeals;
    const lastWeekZendesk = lastWeekAssignments.zendesk;

    // Get a random team member for PG Deals Manager (excluding last week's manager)
    const pgDeals = getRandomTeamMember([lastWeekZendesk]);

    // Get a random team member for Zendesk Manager (excluding last week's manager and PG Deals Manager)
    const zendesk = getRandomTeamMember([lastWeekPgDeals, pgDeals]);

    // Save this week's assignments to be used as last week's assignments next time
    const thisWeekAssignments = { pgDeals, zendesk };
    fs.writeFileSync('lastWeekAssignments.json', JSON.stringify(thisWeekAssignments));

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="stylesheet" href="styles.css">
        <style>@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap");</style>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Weekly Tasks Assigner</title>
    </head>
    <body>
        <h1>Weekly Tasks Assigner</h1>
        <div id="content-container">
            <div id="pg-deals">PG Deals Manager: ${pgDeals}</div>
            <div id="zendesk">Zendesk Manager: ${zendesk}</div>
        </div>
        <script src="updateValues.js"></script>
    </body>
    </html>
    `;

    fs.writeFileSync('index.html', htmlContent);
}

generateHtml();
