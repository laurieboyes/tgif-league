const { tgifsToHtml } = require('./html-history')

describe('tgifsToHtml', () => {
    it('should output all the tgifs in html', () => {
        const data = [
            {
                "date": "2021-01-29",
                "person1": "Laurie",
                "person2": "",
                "tgif": "First sprint done :boom:"
            },
            {
                "date": "2021-01-29",
                "person1": "Laurie",
                "person2": "Sophie",
                "tgif": "Second sprint done :boom:"
            }
        ];

        const emojis = {
            ':boom:': 'boom.png'
        }

        const folks = {
            Laurie: 'laurie.png'
        };

        // expect no errors
        const result = tgifsToHtml(data, emojis, folks);
        console.log(result);
    });
});