const { RichEmbed } = require('discord.js');
const config = require('../config.js');

exports.run = async (client, message, args) => {
    client.db.query(`SELECT username, rank FROM users WHERE rank IN (${config.ranksStaff.toString()})`, async (error, rows) => {
        if (error) throw error;
        else if (!rows || rows.length == 0) return message.reply('Não encontrei nenhum staff no hotel.');
        else {
            const embed = new RichEmbed()
                .setColor(0x00AE86)
                .setTitle('Equipe Staff')
                .setThumbnail('https://cdn.fenixservers.com.br/c_images/album1584/ADM.gif')
                .addField('Fundador', rows.filter(x => x.rank == 16).map(x => x.username).join(', ') || 'Ninguém ocupa esse cargo.')
                .addField('CEO', rows.filter(x => x.rank == 15).map(x => x.username).join(', ') || 'Ninguém ocupa esse cargo.')
                .addField('Gerente', rows.filter(x => x.rank == 14).map(x => x.username).join(', ') || 'Ninguém ocupa esse cargo.')
                .addField('Administrador', rows.filter(x => x.rank == 13).map(x => x.username).join(', ') || 'Ninguém ocupa esse cargo.')
                .addField('Moderador', rows.filter(x => x.rank == 12).map(x => x.username).join(', ') || 'Ninguém ocupa esse cargo.')
                .addField('Embaixador', rows.filter(x => x.rank == 10).map(x => x.username).join(', ') || 'Ninguém ocupa esse cargo.');
            message.channel.send(embed)
        }
    });
}

exports.config = {
    nome: 'staffs',
    descricao: 'Mostra os integrantes da equipe staff.',
    aliases: ['staff','equipe'],
}
