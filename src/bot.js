const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

//modules for custom commands
const quoteModule = require("./modules/quote.js");

//client on ready
client.on('ready', ()=>{
    client.user.setGame(config.prefix+" help");
    console.log('I am ready ^^');
});

//client on message
client.on('message',(msg)=>{

    //check if message might have been to client
    if(!msg.content.toLocaleLowerCase().startsWith(config.prefix)){
        return;
    }
    //ensure that the message was for client
    let args = msg.content.toLocaleLowerCase().split(" ");
    if(!(args[0]===config.prefix)){
        return;
    }

    /*insert commands below*/

    //simple help command
    if(args[1]==="help"){
        msg.channel.send("Westerdals discord bot - avaiable commands with \""+config.prefix+"\" as prefix:"+
        "\nhelp   -   Displays this page ^^"+
        "\nquote  -   Displays a random quote");
        return;
    }

    //quote command
    if(args[1]==="quote"){
        msg.channel.send(quoteModule.quote(args, msg));
        return;
    }

    //TODO make command for timeschedules

    //default message if command was not found
    msg.channel.send("No such command, please type \""+config.prefix+" help\" to see available commands owo");
});

client.login(process.env.TOKEN);