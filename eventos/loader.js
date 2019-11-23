const requerEvento = (event) => require(`../eventos/${event}`)
const config = require('../config.js')
const { RichEmbed } = require('discord.js');
const FiltroConvites = (message) => {
  if(config.donos.includes(message.author.id)) return;
  if(message.member.hasPermission("ADMINISTRATOR"))return;
  let convites = message.content.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
  message.embeds.forEach(embed => {
      if(embed.title) convites += embed.title.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
      if(embed.description) convites += embed.description.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
      embed.fields.forEach(field => {
          convites += field.name.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
          convites += field.value.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
      })
      if(embed.footer) convites += embed.footer.text.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
      if(embed.author) convites += embed.author.name.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi) || []
      })
  if(convites.length > 0){
    message.delete().catch();
        const conviteWarn = new RichEmbed()
        .setTitle(`Oops!`)   
        .setColor('#ffffff')
        .setDescription(`você não tem permissão para enviar convites de outros servidores!`)
        return message.reply(conviteWarn)
      }
  }
module.exports = async client => {
client.on("ready", () => {
    console.log("Imperial iniciado com sucesso.")
    setInterval(() => {
        client.user.setActivity("www.habbin.com.br",  { type: 'WATCHING' });
      }, 13000);
  });

client.on("warn", (err) => {
		console.log(err.message)
});
client.on("error", (err) => {
		console.log(err.message)
});
client.on("disconnect", (err) => {
		console.log(err.message)
});
client.on("reconnect", (err) => {
		console.log(err.message)
});

client.on("messageUpdate", async (antiga, nova) => {
  if(nova.content) await FiltroConvites(nova);
})

client.on('guildMemberAdd', membro => {
  if(membro.guild.id == '569014295891804160') membro.addRole('571003630275002388').catch();
});

client.on('message', requerEvento('message'));
}
