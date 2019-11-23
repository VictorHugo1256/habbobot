
const {shorten, custom} = require('isgd'); // use npm i isgd
 
exports.run = async (client, message, args) => {
  message.delete(); 
  if (!args[0]) return message.channel.send('**Como usar: ;encurtar <URL>**');  
  if (!args[1]) {    
    shorten(args[0], function(res) { 
      if (res.startsWith('Error:')) return message.channel.send('**Por favor, coloque uma URL válida**');      
      message.reply(`**seu link encurtado: <${res}>**`);   
    });   
  } else {    
    custom(args[0], args[1], function(res) { 
      if (res.startsWith('Error:')) return message.channel.send(`**${res}**`);
      message.channel.send(`**<${res}>**`);     
    });   
  } 
}

exports.config = {
    nome: 'encurtar',
    descricao: 'Encurta qualquer link desejado',
    aliases: [],
}
