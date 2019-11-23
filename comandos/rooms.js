const { RichEmbed } = require('discord.js');
const config = require("../config.js");
exports.run = async (client, message, args) => {
    client.db.query("SELECT caption FROM rooms WHERE users_now > 0 ORDER BY users_now DESC LIMIT 5", async (err, rows) =>{
    const embed = new RichEmbed()
    .setTitle("Quartos mais cheios")
    .setAuthor(config.hotel.nomeBot, "https://media.discordapp.net/attachments/481552947717734431/549671313317560420/fenix.png?width=676&height=676")
    .setColor(0x00AE86)
    .setURL(client.config.hotel.link)
    .setDescription (`Os quartos mais cheios atualmente são \`${rows.map(room => room.caption).join(', ') == 0 ? 'nenhum quarto com usuários' : rows.map(room => room.caption).join(', ')}\`.`);
    if(rows[0]) embed.addField("Top 1: " , rows[0].caption, true);
    if(rows[1]) embed.addField("Top 2: " , rows[1].caption, true);
    if(rows[2]) embed.addField("Top 3: " , rows[2].caption, true);
    if(rows[3]) embed.addField("Top 4: " , rows[3].caption, true);
    if(rows[4]) embed.addField("Top 5: " , rows[4].caption, true);
 
     return message.channel.send(embed);
    })
}

exports.config = {
    nome: 'rooms',
    descricao: 'Mostra as salas mais cheias',
    aliases: [],
}
