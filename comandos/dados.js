const { createCanvas, loadImage } = require('canvas');
const { Attachment, Collection } = require('discord.js');
const dados = new Collection();

    exports.run = async (client, message, args) => {
        let usuario = args[0];
        if(!usuario) return message.reply(`Você precisa colocar um nome de usuário válido!`);
    
        client.db.query(`SELECT username, credits, look, activity_points, vip_points, gotw_points, motto FROM users WHERE username = '${usuario}'`, async(error, rows) => {
            if(!rows[0]) return message.reply(`Não encontrei ninguém com esse nome!`)
            if (error) throw error;
            else if (rows) {
                const canvas = createCanvas(600, 320);
                const ctx = canvas.getContext('2d');
                const userOne = await loadImage(`https://habbo.city/habbo-imaging/avatarimage?figure=${rows[0].look}&gesture=sml&size=l&action=wlk,wav&head_direction=3`);
                const background = await loadImage('./assets/images/emojis/spromo_egit.png')
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
                ctx.drawImage(userOne, 23, 60, 85, 160);
                ctx.font = "16px Arial Black";
                ctx.fillStyle = "#ffffff";
                ctx.fillText(`${rows[0].username}`, 140, 110);
                ctx.fillText(`${rows[0].credits}`, 60, 287);
                ctx.fillText(`${rows[0].activity_points}`, 170, 287);
                ctx.fillText(`${rows[0].vip_points}`, 290, 287);
                ctx.fillText(`${rows[0].gotw_points}`, 410, 287);
                ctx.font = "12px Arial Black";
                ctx.fillText(`${rows[0].motto}`, 140, 140);
                let mensagem = `aqui estão as informações: `;
                message.reply(mensagem, new Attachment(canvas.toBuffer()));
                }
        });
    }
    exports.config = {
        nome: 'dados',
        descricao: 'Envia dados de qualquer usuario',
        aliases: [],
    }