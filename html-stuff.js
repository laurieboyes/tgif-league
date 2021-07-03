const emojiImgTemplate = src => `<img class="emoji" src="${src}">`

const addEmojiImgTags = (str, emojis) => {
    return str.replace(/(:[^:]*:)/gsm, (match) => {
        if(emojis[match]) {
            return emojiImgTemplate(emojis[match]);
        } else {
            throw new Error(`no emoji in the map for ${match}`);
        }
    });
}

const leagueTableTemplate = rows => `
    <table>
        <tr>
            <th>Rank</th>
            <th>Author</th>
            <th>tgif count</th>
            <th>Favourite Emoji</th>
        </tr>
        ${rows}
    </table>
`

const leagueTableRowTemplate = ({rank, name, count, favouriteEmoji}) => `
    <tr>
        <td>${rank}</td>
        <td>${name}</td>
        <td>${count}</td>
        <td>${favouriteEmoji ? `${favouriteEmoji.emoji} (${favouriteEmoji.count} uses)` : ''}</td>
    </tr>
`;

const leagueTableToHtml = (leagueTable, emojis) => leagueTableTemplate(
    leagueTable
        .sort((a, b) => a.rank - b.rank)
        .map((row, i) => addEmojiImgTags(leagueTableRowTemplate(row), emojis))
        .join('\n')
    );

module.exports = {
    leagueTableToHtml,
    addEmojiImgTags
};