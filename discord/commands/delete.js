const { EmbedBuilder } = require("discord.js")
const { deleteQuestion } = require("../../bdd")

module.exports.run = (client, message, args) => {
    deleteQuestion(args[1])

    message.channel.send({
        "embeds": [
            new EmbedBuilder()
                .setTitle("Suppression d'une question")
                .setDescription("La question avec l'id " + args[1] + " a bien été supprimée si elle existait")
                .setColor(client.config.colors.normal)
                .setThumbnail(client.user.avatarURL())
                .setFooter({
                    "text": client.config.footer
                })
        ]
    })
}

exports.help = {
    "name": "delete",
    "description": "Supprime une question\n• Syntaxe: delete [idquestion]",
    "alias": []
}