const { leagueTableToHtml } = require('./html-stuff');

describe('html stuff', () => {
     it('should return the league table view', () => {
        
        const leagueTable = [
            {
              "name": "Laurie",
              "count": 3,
              "emojiCounts": {
                ":boom:": 2,
                ":what:": 3,
              },
              "tgifs": [],
              "favouriteEmoji": {
                "count": 3,
                "emoji": ":what:",
              },
              "rank": 3
            },
            {
              "name": "Freya",
              "count": 5,
              "emojiCounts": {
                ":boom:": 2
              },
              "favouriteEmoji": {
                "count": 2,
                "emoji": ":boom:",
              },
              "tgifs": [],
              "rank": 1
            },
            {
              "name": "Scott",
              "count": 5,
              "emojiCounts": {
                ":boom:": 1
              },
              "tgifs": [],
              "rank": 1
            },
            {
              "name": "Bill",
              "count": 4,
              "emojiCounts": {
                ":boom:": 2
              },
              "favouriteEmoji": {
                "count": 2,
                "emoji": ":boom:",
              },
              "tgifs": [],
              "rank": 2
            }
          ];

          // expect no errors
          const result = leagueTableToHtml(leagueTable);
          console.log(result);
          console.log('hello');
    });
});