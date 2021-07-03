const { leagueTableToHtml, addEmojiImgTags } = require('./html-stuff');

describe('html stuff', () => {

  describe('leagueTableToHtml', () => {
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
  
      const emojis = {
        ':boom:': 'https://whatever.com/boom.png',
        ':what:': 'https://whatever.com/what.png'
      }
  
      const folks = {
        Laurie: 'https://poutpoutfish.com/laurie.png',
        Freya: 'https://poutpoutfish.com/freya.png',
        Scott: 'https://poutpoutfish.com/scott.png',
        Bill: 'https://poutpoutfish.com/bill.png',
      }
  
      // expect no errors
      const result = leagueTableToHtml(leagueTable, emojis, folks);
      console.log(result);
      console.log('hello');
    });
  
    it('should throw an error if a name is given with no entry in the folks map', () => {
      const leagueTable = [
        {
          "name": "Laurie",
          "count": 3,
          "emojiCounts": {
          },
          "tgifs": [],
          "rank": 3
        }
      ];
  
      const emojis = {
      }
  
      const folks = {
      }
  
      // expect no errors
      expect(() => leagueTableToHtml(leagueTable, emojis, folks)).toThrow('no person pic for Laurie');
    });
  });

  describe('addEmojiImgTags', () => {


    it('should swap in emojis', () => {
      const string = 'lol :haha: lol'
      const emojis = {
        ':haha:': 'haha.png'
      }
      expect(addEmojiImgTags(string, emojis)).toEqual('lol <img class="emoji" src="haha.png"/> lol') 
    });

    it('should swap in multiple emojis', () => {
      const string = 'lol :haha: um :cool: lol'
      const emojis = {
        ':haha:': 'haha.png',
        ':cool:': 'cool.png'
      };
      expect(addEmojiImgTags(string, emojis)).toEqual('lol <img class="emoji" src="haha.png"/> um <img class="emoji" src="cool.png"/> lol') 
    });

    it('shouldn’t intepret two urls as an emoji', () => {
      const string = 'lol <img src="https://whatever.com"/> um <img src="https://whatever.com"/> lol'
      const emojis = {}
      const folks = {};
      expect(addEmojiImgTags(string, emojis, folks)).toEqual('lol <img src="https://whatever.com"/> um <img src="https://whatever.com"/> lol') 
    })

    it('should error if it gets an emoji it doesn’t recognise', () => {
      expect(() => addEmojiImgTags(':whatever:', {})).toThrow('no emoji in the map for :whatever:')
    });

  })
});