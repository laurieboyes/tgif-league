const addEmojiImgTags = require('./add-emoji-img-tags');
const { tgifsToHtml } = require('./html-history');

const styleTag = `
    <style>
        .emoji {
            height: 1.3em;
            vertical-align: text-bottom;
        }
        
        body {
            font-family: sans-serif;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            max-width: 100%;
            margin-bottom: 1rem;
        }

        th {
            border-bottom: 2px solid #dee2e6;
            padding: .75rem;
            border-top: 1px solid #dee2e6;
            text-align: left;
        }

        td {
            padding: .75rem;
            border-top: 1px solid #dee2e6;
        }

        .person {
            text-align: center;
        }

        .align-centre {
            text-align: center;
        }

        .person-pic {
            height: 3em;
        }

        .person img {
            display: block;
            margin: auto;
        }

        ul {
            list-style: none;
            padding: 0;
            font-family: sans-serif;
            font-size: 16px;
        }

        li {
            margin-bottom: 2em;
        }
    </style>
`;

const leagueTableTemplate = rows => `
    <table>
        <tr>
            <th>Rank</th>
            <th class="align-centre">Author</th>
            <th>tgif count</th>
            <th>Favourite Emoji</th>
        </tr>
        ${rows}
    </table>
`

const leagueTableRowTemplate = ({rank, name, count, favouriteEmoji}, folks) => {
    if(!folks[name]) {
        throw new Error(`no person pic for ${name}`)
    }
    return `
        <tr>
            <td>${rank}</td>
            <td class="person"><img class="person-pic" src="${folks[name]}"/>${name}</td>
            <td>${count}</td>
            <td>${favouriteEmoji ? `${favouriteEmoji.emoji} (${favouriteEmoji.count} uses)` : '(tbd)'}</td>
        </tr>
    `;
}

const leagueTableToHtml = (leagueTable, emojis, folks) => leagueTableTemplate(
    leagueTable
        .sort((a, b) => a.rank - b.rank)
        .map((row, i) => addEmojiImgTags(leagueTableRowTemplate(row, folks), emojis))
        .join('\n')
    );

const theWholePage = (tgifs, leagueTable, emojis, folks) => styleTag + leagueTableToHtml(leagueTable, emojis, folks) +'<br/>' + tgifsToHtml(tgifs, emojis, folks)

module.exports = {
    leagueTableToHtml,
    theWholePage
};