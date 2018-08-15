const osmosis = require('osmosis');
const fs = require('fs');
const schedule = require('node-schedule');

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});

let signs = ['Aries', 'Lion', 'Sagittarius', 'Taurus', 'Virgo', 'Capricorn', 'Gemini', 'Libra', 'Aquarius', 'Cancer', 'Scorpio', 'Pisces'];
let horoscope = [];

let parseWebsite = schedule.scheduleJob('30 7 * * *', function(){

for (let i = 0; i < signs.length; i++) {

    let url = 'http://orakul.com/horoscope/astrologic/general/' + signs[i] + '/today.html';

    osmosis
        .get(url)
        .find('h1')
        .set('sign')
        .find('.horoBlock > p[1]')
        .set('content')
        .data(function(data) {
            horoscope.push(data);
        })
        .done(function() {
            fs.writeFile('data.json', JSON.stringify(horoscope, null, 4), function(err) {
                if (err) console.error(err);
            })
        });
}
});


console.log('index');

require('./bot');