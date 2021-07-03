const { leagueTableToHtml, addEmojiImgTags } = require('./html-stuff');

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

    const emojis = {
      ':boom:': 'https://whatever.com/boom.png',
      ':what:': 'https://whatever.com/what.png'
    }

    // expect no errors
    const result = leagueTableToHtml(leagueTable, emojis);
    console.log(result);
    console.log('hello');
  });

  describe('addEmojiImgTags', () => {


    it('should swap in emojis', () => {
      const string = 'lol :haha: lol'
      const emojis = {
        ':haha:': 'haha.png'
      }
      expect(addEmojiImgTags(string, emojis)).toEqual('lol <img class="emoji" src="haha.png"> lol') 
    });

    it('should swap in multiple emojis', () => {
      const string = 'lol :haha: um :cool: lol'
      const emojis = {
        ':haha:': 'haha.png',
        ':cool:': 'cool.png'
      }
      expect(addEmojiImgTags(string, emojis)).toEqual('lol <img class="emoji" src="haha.png"> um <img class="emoji" src="cool.png"> lol') 
    });

    it('should error if it gets an emoji it doesn’t recognise', () => {
      expect(() => addEmojiImgTags(':whatever:', {})).toThrow('no emoji in the map for :whatever:')
    });

  })
});