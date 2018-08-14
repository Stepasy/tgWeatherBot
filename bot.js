const TelegramBot = require('node-telegram-bot-api');
const fs = require("fs");
const token = '577254993:AAGkQzsSQj3ZMfnWJTIg6t2qgIYlHlKYJGg';
const bot = new TelegramBot(token, { polling: true });
const chatId = '@vagidashoroscopes';

let contents = fs.readFileSync("data.json");
let jsonContent = JSON.parse(contents);
let curDate = new Date().getHours() + ':' + new Date().getMinutes();

setInterval(function() {
    for (var i = 0; i < jsonContent.length; i++) {
        var curDate = new Date().getHours() + ':' + new Date().getMinutes();
        if (curDate == '1:05') {
            bot.sendMessage(-1001290975094, jsonContent[i].sign)
            bot.sendMessage(-1001290975094, jsonContent[i].content)
        }
    }
}, 5000);