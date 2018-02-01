const fs = require("fs");
const config = require("../config.json");

module.exports = {
    quote: function(_args, msg){

        //command to add a qoute, currently only usable by my discord account
        if(_args[2]==="add"&&msg.author.id==="156476072777482240"){
            var quote = +_args.join(" ").length-14+" "+_args.slice(3,_args.length).join(" ")+"\n";
            fs.appendFile(config.quotePath, quote,"utf8",(err)=>{
                if(err!=null){
                    console.error(err);
                }
            });
            return("quote was sucsesfully added!");
        }

        //command to reset the quotelist, currently only usable by my discord account
        if(_args[2]==="reset"&&msg.author.id==="156476072777482240"){
            fs.writeFile(config.quotePath,"",(err)=>{
                if(err!=null){
                    console.error(err);
                }
            })
            return("Quotelist has been reset");
        }

        //return a random quote from quotelist or a default message
        var lengthOfQuote;
        var quotes = [];
        var data = fs.readFileSync(config.quotePath,"utf8");
        if(!data){
            return "There is no quotes to quote :/";
        }
        while(data.length>0){
            lengthOfQuote = data.split(" ");
            quotes.push(data.substr(lengthOfQuote[0].length+1,lengthOfQuote[0]));
            data = data.substring(parseInt(lengthOfQuote[0])+lengthOfQuote[0].length+2);
        }
        return(quotes[Math.floor(Math.random()*quotes.length)]);
    }
};