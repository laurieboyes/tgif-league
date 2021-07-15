const { getTgifLeagueTable, leagueTableToString } = require ('./lib');
const { leagueTableToHtml } = require ('./html/html-stuff');
const { tgifsToHtml } = require ('./html/html-history');
const getEmojis = require('./get-emojis-from-strings');

const data = require('./data_2020h2.json');
const emojis = require('./emojis.json');
const folks = require('./folks.json');
   

const leagueTable = getTgifLeagueTable(data);

// console.log(leagueTableToHtml(leagueTable, emojis, folks))
console.log(tgifsToHtml(data, emojis, folks))
// console.log(leagueTableToString(leagueTable));

// get the emojis
// console.log(getEmojis(data.map(({tgif}) => tgif)).filter(a => !Object.keys(emojis).includes(a)).toString());
