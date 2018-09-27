require('dotenv').config();
require('./server');
const osmosis = require('osmosis');
const fs = require('fs');
const schedule = require('node-schedule');
const TelegramBot = require('node-telegram-bot-api');

const token = '688918595:AAEMBHcu93RiA7xTvk8WUl_OYzOq1d306n0';
const bot = new TelegramBot(token, { polling: true });
const chatId = '-1001207370426';

const url = 'https://sinoptik.ua/%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0-%D1%85%D0%B0%D1%80%D1%8C%D0%BA%D0%BE%D0%B2';

bot.on('message', function (msg) {
    let chatId = msg.chat.id;
    bot.sendMessage(chatId, 'rabotaem?');
});

let sendMessage = schedule.scheduleJob(process.env.SEND_TIME, function(){
   
        osmosis
            .get(url)
            .find('#bd1 > .temperature > .min > span')
            .set('min')
            .find('#bd1 > .temperature > .max > span')
            .set('max')
            .find('.today-temp')
            .set('now')
            .data(function(data) {
    
                bot.sendMessage(chatId, 'Доброе утро! ' + 'Температура за бортом ' + data.now + '\n' +
                '\n' + 'Сегодня в Харькове минимальая температура будет ' + data.min + '\n' + 
                'Сегодня в Харькове максимальная температура будет ' + data.max);
    
            })
       
});

var datetime = Date.now()
console.log(datetime);