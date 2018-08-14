const osmosis = require('osmosis');
const fs = require('fs');

let signs = ['Aries', 'Lion', 'Sagittarius', 'Taurus', 'Virgo', 'Capricorn', 'Gemini', 'Libra', 'Aquarius', 'Cancer', 'Scorpio', 'Pisces'];
let horoscope = [];

for (let i = 0; i < signs.length; i++) {

    let url = 'http://orakul.com/horoscope/astrologic/general/' + signs[i] + '/today.html';

    osmosis
        .get(url)
        .find('h1')
        .set('sign')
        .find('.horoBlock > p[1]')
        .set('content')
        .data(function(data) {
            console.log(data);
            horoscope.push(data);
        })
        .done(function() {
            fs.writeFile('data.json', JSON.stringify(horoscope, null, 4), function(err) {
                if (err) console.error(err);
                else console.log('Data Saved to data.json file');
            })
        });
}