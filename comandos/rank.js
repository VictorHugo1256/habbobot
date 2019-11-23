const config = require('../config.js')
exports.run = async (client, message, args) => {
    if(!config.donos.includes(message.author.id)) return message.reply("você não é um dos meus criadores!")
    let usuario = args[0]
    if(!usuario) return message.reply(`Voce precisa colocar um nome de usuário válido!`)
    let rank = parseInt(args[1])
    if(!rank) return message.reply(`Voce precisa colocar um ID de rank válido!`)
    
    client.db.query(`UPDATE users SET rank = ${rank} WHERE username = '${usuario}' LIMIT 1`,(erro,sucesso) =>{
        if(erro) return message.reply("Ocorreu um erro ao executar esse comando.")
        if(sucesso) return message.reply("Comando executado com sucesso!")
			
    })
}

exports.config = {
    nome: 'rank',
    descricao: 'De um rank a um usuário do hotel',
    aliases: [],
}