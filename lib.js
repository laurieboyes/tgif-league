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

const getFavouriteEmoji = emojiCounts => 
  Object.entries(emojiCounts)
    .sort((a,b) => b[1] - a[1])
    .map(([emoji, count]) => ({ emoji, count}))
    .filter(({count}) => count > 1)[0];

const addFavouriteEmojis = (table) => table
    .map(row => ({...row, favouriteEmoji: getFavouriteEmoji(row.emojiCounts)}))

const getTgifLeagueTable = (data) => {
  const tableWithCounts = data.reduce((acc, row) => {
    
    const person1 = getPerson(acc, row.person1);
    const person2 = getPerson(acc, row.person2);
    const person3 = getPerson(acc, row.person3);
    
    const others = acc.filter(p => ![person1, person2, person3].includes(p));


    return [
      ...others,
      ...(row.person1.length ? [addRowToPerson(person1, row)] : []),
      ...(row.person2?.length ? [addRowToPerson(person2, row)] : []),
      ...(row.person3?.length ? [addRowToPerson(person3, row)] : []),
    ];
 }, []);
  const tableWithRanks = addRanks(tableWithCounts );
  const tableWithFavouriteEmojis = addFavouriteEmojis(tableWithRanks)
  return tableWithFavouriteEmojis;
}

const medalMap = {
  1: ':first_place_medal:',
  2: ':second_place_medal:',
  3: ':third_place_medal:'
}

const leagueTableToString = leagueTable => leagueTable
    .sort((a, b) => b.count - a.count)
    .map((row, i) => {
      return `${medalMap[i + 1] || `  ${i + 1} `}    |    ${row.name}    |    ${row.count} tgifs${row.favouriteEmoji ? `    |    favourite emoji: ${row.favouriteEmoji.emoji} (${row.favouriteEmoji.count} uses)` : ''}`;
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