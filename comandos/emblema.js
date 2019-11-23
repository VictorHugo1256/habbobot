const { RichEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    const emblema = args[0];
    if(!emblema) return message.reply("Escolha um nome de emblema válido!")
    const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setImage(`https://cdn.fenixproject.gq/c_images/album1584/${emblema}.gif`)
    return message.channel.send(embed)
}

exports.config = {
    nome: 'emblema',
    descricao: 'Mostra algum emblema do hotel.',
    aliases: ['emblemas','badge','badges'],
}
