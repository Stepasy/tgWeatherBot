const TelegramBot = require('node-telegram-bot-api');
const fs = require("fs");
const schedule = require('node-schedule');

const token = '577254993:AAGkQzsSQj3ZMfnWJTIg6t2qgIYlHlKYJGg';
const bot = new TelegramBot(token, { polling: true });
const chatId = '-1001290975094';

let contents = fs.readFileSync("data.json");
let jsonContent = JSON.parse(contents);
let curDate = new Date().getHours() + ':' + new Date().getMinutes();

bot.on('message', function (msg) {
    let chatId = msg.chat.id;
    bot.sendMessage(chatId, 'rabotaem?');
});

function sleep(ms) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

let sendMessage = schedule.scheduleJob(process.env.SEND_TIME, function(){
    for (let i = 0; i < jsonContent.length; i++) {

            bot.sendMessage(chatId, jsonContent[i].sign + '\n' + '\n' + jsonContent[i].content)
            sleep(5000);

        }
  });