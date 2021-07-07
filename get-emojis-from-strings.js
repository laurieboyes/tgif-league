
const getEmojis = (strings) => Array.from(new Set(strings.map(s => s.match(/(:[^:/]*:)/gsm)).flat())).sort();

module.exports = getEmojis;