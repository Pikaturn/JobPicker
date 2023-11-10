const fs = require('fs');

const teamMembers = ['Mindaugas', 'Viktorija', 'Kristijonas', 'Paulius', 'Dovile'];

function getRandomTeamMember() {
    const randomIndex = Math.floor(Math.random() * teamMembers.length);
    return teamMembers[randomIndex];
}

function generateHtml() {
    const pgDeals = getRandomTeamMember();
    const zendesk = getRandomTeamMember();

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
        <div id="zendesk"> Zendesk Manager: ${zendesk}</div>
    </div>
    <script src = "updateValues.js"></script>
</body>
</html>
    `;

    fs.writeFileSync('index.html', htmlContent);
}

generateHtml();