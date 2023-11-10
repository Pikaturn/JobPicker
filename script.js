'use strict'

const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: 'AKIA6GEYC6555IPBS7HK',
    secretAccessKey: "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",
    region: 'eu-north-1'
})

const teamMembers = ['Mindaugas','Viktorija','Kristijonas',"Paulius",'Dovile']
const pgDeals = document.getElementById('pg-deals')
const zendesk = document.getElementById('zendesk')
let currentSelection =['Person1', 'Person2'];

let lastWeekSelection =[];

function isMonday8am(){
    const today = new Date();
    return today.getDay() === 1 && today.getHours() === 8;
}


function selectTeamMembers(){
let currentSelection =[]

while (currentSelection.length <2){
    const randomIndex = Math.floor(Math.random() * teamMembers.length);
    const selectedMember = teamMembers[randomIndex];

    if(!lastWeekSelection.includes(selectedMember) || lastWeekSelection.length === 0 ){
        currentSelection.push(selectedMember)
    }


    lastWeekSelection = currentSelection;
}
return currentSelection;
}


if (isMonday8am()){
    currentSelection = selectTeamMembers();
    pgDeals.textContent = `Pg Deals Manager: ${currentSelection[0]}`
zendesk.textContent = `Zendesk Manager: ${currentSelection[1]}`
}