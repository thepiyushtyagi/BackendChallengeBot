var Discord = require('discord.io');
var logger = require('winston');
let request = require('request');
let redis = require('./redis');
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
var bot = new Discord.Client({
    token: process.env.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    let searchKey = process.env.searchKey;
    let searchEngineId = process.env.searchEngineId;
    let googleSearchApi = `https://www.googleapis.com/customsearch/v1?key=${searchKey}&cx=${searchEngineId}&num=5&q=`;
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        let searchString = null;
        args = args.splice(1);
        if (args.length > 0){
            searchString = args.join(' ')
            googleSearchApi += searchString;
        }
        switch(cmd) {

            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'test':
                bot.sendMessage({
                    to: channelID,
                    message: 'Test!'
                });
                break;
            case 'hi':
                bot.sendMessage({
                    to: channelID,
                    message: 'hey!'
                });
                break;
            case 'google':
                request.get(googleSearchApi, function (err, resp, response) {
                    if (err){
                        return bot.sendMessage({
                            to: channelID,
                            message: `getting error ${err} in google search api`
                        });
                    }
                    let topLinks = [];
                    try{
                        let topItems = JSON.parse(response).items;
                        if (topItems){
                            topItems.forEach((item) => {
                                topLinks.push(item.link);
                            });
                        }
                        topLinks.forEach((link) => {
                            bot.sendMessage({
                                to: channelID,
                                message: link
                            });
                        })
                    }catch (e) {
                        return bot.sendMessage({
                            to: channelID,
                            message: `getting error ${e} in google search api`
                        });
                    }
                })
                break;
            case 'recent':
                redis.keys(`*${searchString}*`, (err, data) => {
                    if (err || !data){
                        return bot.sendMessage({
                            to: channelID,
                            message: `getting error while fetching recent`
                        });
                    }
                    data.forEach((history) => {
                        bot.sendMessage({
                            to: channelID,
                            message: history
                        });
                    });

                });
                break;


        }
    }
});
