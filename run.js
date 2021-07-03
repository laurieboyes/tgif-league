const { getTgifLeagueTable, leagueTableToString } = require ('./lib');
const { leagueTableToHtml } = require ('./html-stuff');
const data = require('./data.json');
const emojis = require('./emojis.json');
const folks = require('./folks.json');
   

const leagueTable = getTgifLeagueTable(data);

console.log(leagueTableToHtml(leagueTable, emojis, folks))
// console.log(leagueTableToString(leagueTable));