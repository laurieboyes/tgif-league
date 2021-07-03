
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

const leagueTableToHtml = leagueTable => leagueTableTemplate(
    leagueTable
        .sort((a, b) => a.rank - b.rank)
        .map((row, i) => leagueTableRowTemplate(row))
        .join('\n')
    );

module.exports = {
    leagueTableToHtml
};