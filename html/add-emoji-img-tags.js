const emojiImgTemplate = src => `<img class="emoji" src="${src}"/>`

const addEmojiImgTags = (str, emojis) => {
    return str.replace(/(:[^:/]*:)/gsm, (match) => {
        if(emojis[match]) {
            return emojiImgTemplate(emojis[match]);
        } else {
            throw new Error(`no emoji in the map for ${match}`);
        }
    });
}

module.exports = addEmojiImgTags;