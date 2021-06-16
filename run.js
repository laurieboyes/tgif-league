const { getTgifLeagueTable, leagueTableToString } = require ('./lib');
const data = require('./data.json');
   

const leagueTable = getTgifLeagueTable(data);
console.log(leagueTableToString(leagueTable));