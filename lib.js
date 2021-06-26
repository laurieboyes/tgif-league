const BASE_PERSON = {
    count: 0,
    emojiCounts: {},
    tgifs: []
 };

const addNumberMaps = (a, b) => {
  
  return [
    ...Object.entries(a),
    ...Object.entries(b),
  ].reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: (acc[key] || 0) + value
    }
  }, {})
}

 const countEmojis = emojiString => (
    emojiString
      .match(/:[^:]*:/g) || []
    )
    .reduce((acc, match) => {
      return {
        ...acc,
        [match]: (acc[match] || 0) + 1
      }
    }, {});

 
 const addRowToPerson = (person, row) => {
    return {
      ...person,
      count: person.count + 1,
      emojiCounts: addNumberMaps(person.emojiCounts, countEmojis(row.tgif)),
      tgifs: [...person.tgifs, row.tgif]
    };
 };

 const getPerson = (leagueTable, name) => leagueTable.find(p => p.name === name) || { ...BASE_PERSON, name}

const addRanks = (table) => {
  const ranksForCounts = {};
  let lastRank = 0;
  return table
    .sort((a, b) => b.count - a.count)
    .map(a => {
      if(!ranksForCounts[a.count]) {
        ranksForCounts[a.count] = ++lastRank;
      }
      return {...a, rank: ranksForCounts[a.count]}
    })
}

const getTgifLeagueTable = (data) => {
  const table = data.reduce((acc, row) => {
    
    const person1 = getPerson(acc, row.person1);
    const person2 = getPerson(acc, row.person2);
    
    const others = acc.filter(p => ![person1, person2].includes(p));


    return [
      ...others,
      ...(row.person1.length ? [addRowToPerson(person1, row)] : []),
      ...(row.person2.length ? [addRowToPerson(person2, row)] : []),
    ];
 }, []);
  return addRanks(table);
}

const medalMap = {
  1: ':first_place_medal:',
  2: ':second_place_medal:',
  3: ':third_place_medal:'
}

const getFavouriteEmoji = emojiCounts => 
  Object.entries(emojiCounts)
    .sort((a,b) => b[1] - a[1])
    .map(([emoji, count]) => ({ emoji, count}))
    .filter(({count}) => count > 1)[0];

const leagueTableToString = leagueTable => leagueTable
    .sort((a, b) => b.count - a.count)
    .map((row, i) => {
      const favouriteEmoji = getFavouriteEmoji(row.emojiCounts);
      return `${medalMap[i + 1] || `  ${i + 1} `}    |    ${row.name}    |    ${row.count} tgifs${favouriteEmoji ? `    |    favourite emoji: ${favouriteEmoji.emoji} (${favouriteEmoji.count} uses)` : ''}`;
    })
    .join('\n');
 
module.exports = {
  BASE_PERSON,
  addNumberMaps,
  countEmojis,
  addRowToPerson,
  getTgifLeagueTable,
  getFavouriteEmoji,
  addRanks,
  leagueTableToString
}