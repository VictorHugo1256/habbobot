const { RichEmbed, Collection } = require('discord.js');
const config = require('../config.js');
let linkIcones = `${config.hotel.link}${config.hotel.pastaSWF}${config.hotel.iconsSWF}`
let linkEmblemas = `${config.hotel.link}${config.hotel.pastaSWF}${config.hotel.emblemasSWF}`

exports.run = async (client, message, args) => {
    let paginas = new Collection();
    let paginasID = []//MLT23
    client.db.query("SELECT * FROM catalog_items WHERE limited_sells > '0'", async (err, rows) =>{
        await rows.forEach(async item => {
            if(item.limited_stack < item.limited_sells){
            let embed = new RichEmbed()
            .setTitle("Raros LTD's")
            .setAuthor(config.hotel.nomeBot, "https://media.discordapp.net/attachments/481552947717734431/549671313317560420/fenix.png?width=676&height=676")
            .setColor(0x00AE86)
            .setURL(config.hotel.link)
            .addField(`Nome: `, `${item.amount}x ${item.catalog_name} `)
            if(item.limited_stack <= 100) embed.addField(`Vendidos: `, `${item.limited_stack}/${item.limited_sells}`)
            else embed.addField(`Vendidos: `, `${item.limited_stack}/${item.limited_sells} (${(item.limited_stack / item.limited_sells)*100}%)`)
            let custo = ""
            if(item.cost_credits > 0) custo = `Créditos: ${item.cost_credits}\n`
            else if(item.cost_pixels > 0) custo += `Dukets: ${item.cost_pixels}\n`
            else if(item.cost_diamonds > 0) custo += `Diamantes: ${item.cost_diamonds}\n`
            else if(item.cost_gotw > 0) custo += `Estrelas: ${item.cost_gotw}`
            embed.addField(`Preço: `, `${custo ? custo : 'Grátis!'}`)
            if(item.badge.length > 0) embed.addField(`Emblema: `, `[${item.badge}](${linkEmblemas}${item.badge}.gif)`)
            //client.db.query(`SELECT item_name FROM furniture WHERE id = '${item.item_id}'`, async (err, row) => embed.setImage(`${linkIcones}${row[0].item_name.replace(/\*/gi,'_')}_icon.png`))
            paginas[item.id] = {embed}
            paginasID.push(item.id)
            }
        });
        let paginaAtual = 0;
        message.channel.send(paginas[paginasID[paginaAtual]]).then(m => {
        m.react('➡').catch()
        let reacaoMenu = ['⬅','➡']
        const filter = (reaction, user) => reacaoMenu.includes(reaction.emoji.name) && user.id === message.author.id
        const collector = m.createReactionCollector(filter, { time: 60000 });
        collector.on('collect', async r => {
            switch(r.emoji.name){
                case '➡':
            if(paginaAtual + 1 <= paginasID.length) paginaAtual += 1
            if(paginaAtual == paginasID.length) m.reactions.forEach(mensagem => {
                if(mensagem.emoji.name == '➡') mensagem.remove()
            })
            m.edit(paginas[paginasID[paginaAtual]])
            break;
    
                case '⬅':
            if(paginaAtual - 1 >= 0) paginaAtual -= 1
            if(paginaAtual == 0) m.reactions.forEach(mensagem => {
                if(mensagem.emoji.name == '⬅') mensagem.remove()
            })
            m.edit(paginas[paginasID[paginaAtual]])
            break;
            }
            if(paginaAtual > 0) m.react('⬅')
            r.remove(message.author)
        })
    })
    })
}

exports.config = {
    nome: 'ltd',
    descricao: 'Mostra os raros LTDs disponíveis.',
    aliases: ['tlds'],
}
