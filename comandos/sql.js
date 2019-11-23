const config = require('../config.js')
const { Collection,RichEmbed } = require('discord.js')
exports.run = async (client, message, args) => {
    if(!config.donos.includes(message.author.id)) return message.reply("você não é um dos meus criadores!")
    client.db.query(args.join(" "), (erro,rows) => {
        if(erro) return message.reply(`Erro: \`\`\`${erro.sqlMessage}\`\`\``)
        if(rows)  {
            if(rows.length > 1){
                let paginas = new Collection();
                for(let i = 0; i < rows.length; i++) {
                    let embed = new RichEmbed()
                    .setDescription(JSON.stringify(rows[i],null,'\n'))
                    .setTimestamp()
                    paginas[i] = {embed};
                };
                let paginaAtual = 0;
                message.channel.send(paginas[paginaAtual]).then(m => {
                m.react('➡').catch()
                let reacaoMenu = ['⬅','➡']
                const filter = (reaction, user) => reacaoMenu.includes(reaction.emoji.name) && user.id === message.author.id
                const collector = m.createReactionCollector(filter, { time: 60000 });
                collector.on('collect', async r => {
                    switch(r.emoji.name){
                        case '➡':
                    if(paginaAtual + 1 <= paginas.length) paginaAtual += 1
                    if(paginaAtual == paginas.length) m.reactions.forEach(mensagem => {
                        if(mensagem.emoji.name == '➡') mensagem.remove()
                    })
                    m.edit(paginas[paginaAtual])
                    break;
            
                        case '⬅':
                    if(paginaAtual - 1 >= 0) paginaAtual -= 1
                    if(paginaAtual == 0) m.reactions.forEach(mensagem => {
                        if(mensagem.emoji.name == '⬅') mensagem.remove()
                    })
                    m.edit(paginas[paginaAtual])
                    break;
                    }
                    if(paginaAtual > 0) m.react('⬅')
                    r.remove(message.author)
                })
            })
            }
            else 
			message.reply(`Sucesso: \`\`\`${JSON.stringify(rows[0])}\`\`\``)
        }
    })
}

exports.config = {
    nome: 'sql',
    descricao: 'Executa uma SQL',
    aliases: [],
}
