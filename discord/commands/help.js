const { EmbedBuilder } = require("discord.js")
const fs = require("fs")

module.exports.run = (client, message, args) => {
    let commands = []

    for (let file of fs.readdirSync("./discord/commands")) {
        if (file.endsWith(".js")) {
            commands.push(require("./" + file).help.name)
        }
    }


    if (args[1] != undefined && commands.includes(args[1])){
        message.channel.send({
            "embeds": [
                new EmbedBuilder()
                    .setTitle("Aide")
                    .setDescription("**Commande "+args[1]+":**\n• " + require("./"+args[1]).help.description)
                    .setColor(client.config.colors.normal)
                    .setThumbnail(client.user.avatarURL())
                    .setFooter({
                        "text": client.config.footer
                    })
            ]
        })
    }
    else {
        message.channel.send({
            "content": "**" + message.author.username + ", voici la page d'aide :**",
            "embeds": [
                new EmbedBuilder()
                    .setTitle("Aide")
                    .setDescription("Commandes disponibles :\n• `" + commands.join("`\n• `") + "`" + "\nVous pouvez aussi taper .help [nom_commande] pour afficher les infos de cette commande")
                    .setColor(client.config.colors.normal)
                    .setThumbnail(client.user.avatarURL())
                    .setFooter({
                        "text": client.config.footer
                    })
            ]
        })
    }
}

exports.help = {
    "name": "help",
    "description": "Affiche la page d'aide",
    "alias": []
}