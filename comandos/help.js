const { RichEmbed } = require('discord.js');
const config = require("../config.js");
exports.run = async (client, message) => {
    const embed = new RichEmbed()
    .setDescription(`Olá, aqui estão os meus comandos!`)
    .setAuthor(config.hotel.nomeBot, "https://media.discordapp.net/attachments/481552947717734431/549671313317560420/fenix.png?width=676&height=676")
    .setColor(0x00AE86)
    .setTimestamp()
    .setURL(config.hotel.link)
    client.comandos.forEach(comandos => {
      embed.addField(`${config.prefix}${comandos.config.nome}`, `${comandos.config.descricao}`);
    }
  )
  message.author.send(embed)
  .then(() => message.reply('Enviei os comandos no seu privado!'));
},
exports.config = {
    nome: 'help',
    descricao: 'Mostra os comandos disponiveis para você',
    aliases: [],
}
