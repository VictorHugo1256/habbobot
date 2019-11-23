const { RichEmbed } = require('discord.js')
const config = require('../config.js')
function format(seconds){
    function pad(s){
        return (s < 10 ? '0' : '') + s;
    }
var hours = Math.floor(seconds / (60*60));
var minutes = Math.floor(seconds % (60*60) / 60);
var seconds = Math.floor(seconds % 60);

return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

exports.run = async (client, message, args) => {
    const ram = process.memoryUsage().heapUsed / 1024 / 1024;
    const embed = new RichEmbed()
    .setTitle("Informações do "+ config.hotel.nomeLongo)
    .setColor(0x00AE86)
    .setTimestamp()
    .setThumbnail()
    .setAuthor(config.hotel.nomeBot, "https://media.discordapp.net/attachments/481552947717734431/549671313317560420/fenix.png?width=676&height=676")
    .addField(`Criador por`, `\`${client.users.get('188891718639288321').tag}\``,true)
    .addField(`Tag`,`\`${client.user.tag}\``,true)
    .addField(`ID`, `\`${client.user.id}\``,true)
    .addField(`Api`,`\`Discord.js 11.4.2\``,true)
    .addField(`Versão Node JS`,`\`v10.15.3\``,true)
    .addField(`RAM`,`\`${Math.round(ram)}MB\``,true)
    .addField(`Tempo Online`,`\`${format(process.uptime())}\``,true)
    .addField(`Servidores`,`\`${client.guilds.size}\``,true)
    .addField(`Latência`,`\`${Math.round(client.ping)}ms\``,true)
    .addField(`Prefixo`,`\`;\``,true)
        return message.channel.send(embed)
}

exports.config = {
    nome: 'versao',
    descricao: 'Mostra a versao do BOT',
    aliases: [],
}
