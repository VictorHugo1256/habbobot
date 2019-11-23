const { RichEmbed } = require('discord.js');
const { hotel } = require('./config.js');

module.exports = class ImperialGostoso extends RichEmbed{
    constructor(){
        super()
            this.setAuthor(`Staffs do ${hotel.nomeLongo}`, "https://media.discordapp.net/attachments/481552947717734431/549671313317560420/fenix.png?width=676&height=676")
            this.setColor(0x00AE86)
            this.setURL(hotel.link);
            this.setTimestamp();
    }
}