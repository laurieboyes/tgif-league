const addEmojiImgTags = require('./add-emoji-img-tags');

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