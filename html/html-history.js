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
        ${tgif.date} ${authorsTemplate(tgif.person1, tgif.person2)}
        <br/>
        ${addEmojiImgTags(tgif.tgif, emojis)}
    </li>
`;

const tgifListTemplate = (tgifs, emojis, folks) => `

    <style>
        body {
            font-family: sans-serif;
            font-size: 16px;
        }

        ul {
            list-style: none;
            padding: 0;
        }

        li {
            margin-bottom: 0.8em;
        }

        .emoji {
            height: 1.3em;
            vertical-align: text-bottom;
        }
    </style>

    <ul>
        ${tgifs.map(tgif => tgifListItemTemplate(tgif, emojis, folks)).join('')}
    </ul>    
`;

const tgifsToHtml = (tgifs, emojis, folks) => tgifListTemplate(tgifs, emojis, folks)

module.exports = {
    tgifsToHtml
}