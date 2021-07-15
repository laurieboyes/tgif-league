const emojiImgTemplate = (name, src) => `<img class="emoji" src="${src}" alt="${name}"/>`

const addEmojiImgTags = (str, emojis) => {
    return str.replace(/(:[^:/]*:)/gsm, (match) => {
        if(emojis[match]) {
            return emojiImgTemplate(match, emojis[match]);
        } else {
            throw new Error(`no emoji in the map for ${match}`);
        }
    });
}

module.exports = addEmojiImgTags;