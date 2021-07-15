const addEmojiImgTags = require('./add-emoji-img-tags');

const authorsTemplate = (person1, person2) => {
    if(person2) {
        return `${person1} + ${person2}`
    } else {
        return person1;
    }
}

const tgifListItemTemplate = (tgif, emojis, folks) => `
    <li>
        <p><b>${tgif.date} ${authorsTemplate(tgif.person1, tgif.person2)}</b>
        <br/>
        ${addEmojiImgTags(tgif.tgif, emojis)}</p>
    </li>
`;

const tgifListTemplate = (tgifs, emojis, folks) => `
    <ul>
        ${tgifs
            .sort((a,b) => b.date.localeCompare(a.date))
            .map(tgif => tgifListItemTemplate(tgif, emojis, folks)).join('')
        }
    </ul>    
`;

const tgifsToHtml = (tgifs, emojis, folks) => tgifListTemplate(tgifs, emojis, folks)

module.exports = {
    tgifsToHtml
}