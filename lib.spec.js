const { countEmojis, addRowToPerson, addNumberMaps, getTgifLeagueTable, leagueTableToString, getFavouriteEmoji, addRanks } = require('./lib');

describe('addNumberMaps', () => {
  it('should add two object with the same single property', () => {
    expect(addNumberMaps({
      a: 1
    },
      {
        a: 2
      }
    )).toEqual({
      a: 3
    })
  });

  it('should add two object with no intersecting properties', () => {
    expect(addNumberMaps({
      a: 1
    },
      {
        b: 2
      }
    )).toEqual({
      a: 1,
      b: 2
    })
  });

  it('should add two object with some but not all intersecting properties', () => {
    expect(addNumberMaps({
      a: 1,
      b: 3
    },
      {
        b: 2,
        c: 5
      }
    )).toEqual({
      a: 1,
      b: 5,
      c: 5
    })
  });
});

describe('countEmojis', () => {
  it('should split a string into a map of emojis-strings and their number of occurrences', () => {
    expect(countEmojis(':hello: there :everybody::hello:')).toEqual({
      ':hello:': 2,
      ':everybody:': 1
    })
  });

  it('should return an empty map when given an empty string', () => {
    expect(countEmojis('')).toEqual({})
  });

  it('should return an empty map when given a string without emojis', () => {
    expect(countEmojis('whatever')).toEqual({})
  });
});

describe('addRowToPerson', () => {
  it('should increment the number of occurences', () => {

    const person = {
      name: 'Whatever',
      count: 0,
      emojiCounts: {},
      tgifs: []
    }

    const row = {
      "date": "2021-01-15",
      "person1": "Freya",
      "person2": "",
      "tgif": ":heavy_division_sign: :two: :tea:m’s :what:+:madetech: :two:"
    }
    expect(addRowToPerson(person, row).count).toEqual(1);
  })

  it('should increment the emoji counts', () => {
    const person = {
      name: 'Whatever',
      count: 0,
      emojiCounts: {
        ':heavy_division_sign:': 1,
        ':two:': 2,
        ':tea:': 1,
        ':what:': 1,
        ':madetech:': 1,
      },
      tgifs: []
    }

    const row = {
      "date": "2021-01-15",
      "person1": "Freya",
      "person2": "",
      "tgif": ":heavy_division_sign: :two: :tea:m’s :what:+:madetech: :two:"
    }

    expect(addRowToPerson(person, row).emojiCounts).toEqual({
      ':heavy_division_sign:': 2,
      ':two:': 4,
      ':tea:': 2,
      ':what:': 2,
      ':madetech:': 2,
    });
  });

  it('should add to the list of tgifs', () => {

    const person = {
      name: 'Whatever',
      count: 0,
      emojiCounts: {},
      tgifs: [
        'some fake tgif'
      ]
    }

    const row = {
      "date": "2021-01-15",
      "person1": "Freya",
      "person2": "",
      "tgif": ":heavy_division_sign: :two: :tea:m’s :what:+:madetech: :two:"
    }
    expect(addRowToPerson(person, row).tgifs).toEqual([
      'some fake tgif',
      ':heavy_division_sign: :two: :tea:m’s :what:+:madetech: :two:'
    ]);

  });
});

describe('addRanks', () => {
  it('should add the ranks', () => {
    const table = [
      {thing: 'a', count: 1},
      {thing: 'b', count: 5},
      {thing: 'c', count: 2},
      {thing: 'd', count: 2},
    ];

    expect(addRanks(table)).toEqual([
      {thing: 'b', count: 5, rank: 1},
      {thing: 'c', count: 2, rank: 2},
      {thing: 'd', count: 2, rank: 2},
      {thing: 'a', count: 1, rank: 3},
    ]);

  })
});

describe('getTgifLeagueTable', () => {
  it('should get the table', () => {
    const data = [
      {
        "date": "2021-01-29",
        "person1": "Laurie",
        "person2": "",
        "tgif": "First sprint done :boom:",
      }
    ];

    expect(getTgifLeagueTable(data)).toEqual([
      {
        "name": "Laurie",
        "count": 1,
        "emojiCounts": {
          ":boom:": 1
        },
        "tgifs": [
          "First sprint done :boom:"
        ],
        "rank": 1
      }
    ]);
  });

  it('should return one entry per name', () => {
    const data = [
      {
        "date": "2021-01-29",
        "person1": "Laurie",
        "person2": "",
        "tgif": "First sprint done :boom:"
      },
      {
        "date": "2021-01-29",
        "person1": "Laurie",
        "person2": "",
        "tgif": "Second sprint done :boom:"
      }
    ];

    expect(getTgifLeagueTable(data)).toEqual([
      {
        "name": "Laurie",
        "count": 2,
        "emojiCounts": {
          ":boom:": 2
        },
        "tgifs": [
          "First sprint done :boom:",
          "Second sprint done :boom:"
        ],
        "rank": 1
      }
    ]);
  });
});


describe('getFavouriteEmoji', () => {
  it('should get the favourite emoji that occurs more than once', () => {
    expect(getFavouriteEmoji({
      ":boom:": 2,
      ":what:": 3
    })).toEqual({
      emoji: ':what:',
      count: 3
    });
  });
});

describe('leagueTableToString', () => {
  it('should return a league table as a string', () => {
    const leagueTable = [
      {
        "name": "Laurie",
        "count": 5,
        "emojiCounts": {
          ":boom:": 2,
          ":what:": 3,
        },
        "tgifs": []
      },
      {
        "name": "Freya",
        "count": 3,
        "emojiCounts": {
          ":boom:": 2
        },
        "tgifs": []
      },
      {
        "name": "Scott",
        "count": 2,
        "emojiCounts": {
          ":boom:": 1
        },
        "tgifs": []
      },
      {
        "name": "Bill",
        "count": 1,
        "emojiCounts": {
          ":boom:": 2
        },
        "tgifs": []
      }
    ];
    expect(leagueTableToString(leagueTable)).toEqual(
      ':first_place_medal:    |    Laurie    |    5 tgifs    |    favourite emoji: :what: (3 uses)\n' +
      ':second_place_medal:    |    Freya    |    3 tgifs    |    favourite emoji: :boom: (2 uses)\n' +
      ':third_place_medal:    |    Scott    |    2 tgifs\n' +
      '  4     |    Bill    |    1 tgifs    |    favourite emoji: :boom: (2 uses)'
    );
  })
});