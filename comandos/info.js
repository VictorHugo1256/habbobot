const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    let usuario = args[0]
    if(!usuario) return message.reply(`Você precisa colocar um nome de usuário válido!`)
    client.db.query(`SELECT username, rank, credits, look, activity_points, vip_points, motto, online FROM users WHERE username = '${usuario}'`, async (err, rows) =>{
        if(!rows[0]) return message.reply(`Não encontrei ninguém com esse nome!`)
        const plus = new RichEmbed()
        .setAuthor(`${usuario}`, "https://media.discordapp.net/attachments/481552947717734431/549671313317560420/fenix.png?width=676&height=676")
        .setColor(0x00AE86)
        .setTimestamp()
        .setURL(client.config.hotel.link)
        .setThumbnail(`http://habbo.city/habbo-imaging/avatarimage?figure=${rows[0].look}&action=wlk,wav&gesture=sml&size=l&head_direction=3`)
        .addField("Creditos: " , rows[0].credits, true)
        .addField("Duckets: " , rows[0].activity_points, true)
		.addField("Diamantes: " , rows[0].vip_points, true)
        .addField("Missão:" , rows[0].motto ? rows[0].motto : 'Missão não definida', true)
        .addField("Online:" ,  rows[0].online ==  1 ? 'Sim' : 'Não', true)
		.addField("Rank:" , rows[0].rank ==  1 ? 'Usuário' : 'Staff', true)
        return message.channel.send(plus);
        });  
}

exports.config = {
    nome: 'info',
    descricao: 'Mostra informações sobre outros usuários',
    aliases: [],
}
