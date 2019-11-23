const { RichEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    const logo = args[0];
    if(!logo) return message.reply("Escolha um nome de logo válido!")
    const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setImage(`http://gerador.comprahabbo.top/font/volter/${logo}.gif`)
    return message.channel.send(embed)
}

exports.config = {
    nome: 'logo',
    descricao: 'Mostra o logo digitado do hotel.',
    aliases: ['emblemas','badge','badges'],
}
