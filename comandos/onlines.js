const { RichEmbed } = require('discord.js');
const config = require("../config.js");

exports.run = async (client, message, args) => {
    client.db.query("SELECT username FROM users WHERE online = '1'", async (err, rows) =>{
    const embed = new RichEmbed()
    .setTitle("Usuarios Online")
    .setAuthor(config.hotel.nomeBot, "https://media.discordapp.net/attachments/481552947717734431/549671313317560420/fenix.png?width=676&height=676")
    .setColor(0x00AE86)
    .setURL(client.config.hotel.link)
    .setDescription (`Temos atualmente ${rows.length == 0 ? 'nenhum' : rows.length} usuarios conectados.`)
        return message.channel.send(embed)
    })
}

exports.config = {
    nome: 'onlines',
    descricao: 'Mostra os usuários onlines',
    aliases: [],
}
