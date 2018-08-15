require('./server');
require('dotenv').config();
const osmosis = require('osmosis');
const fs = require('fs');
const schedule = require('node-schedule');

const signs = ['Aries', 'Lion', 'Sagittarius', 'Taurus', 'Virgo', 'Capricorn', 'Gemini', 'Libra', 'Aquarius', 'Cancer', 'Scorpio', 'Pisces'];
const urlP1 = 'http://orakul.com/horoscope/astrologic/general/';
const urlP2 = '/today.html';

let horoscope = [];

let parseWebsite = schedule.scheduleJob(process.env.PARSE_TIME, function(){

    signs.forEach(element => {
        let url = urlP1 + element + urlP2;

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
    });
});

require('./bot');