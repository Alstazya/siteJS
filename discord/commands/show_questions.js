const { EmbedBuilder } = require("discord.js")
const { nbQuestion, allQuestion } = require("../../bdd")

module.exports.run = async (client, message, args) => {
    let nbQ = await nbQuestion()
    let allQ = await allQuestion()

    let affichage = ""

    for (let i = 0; i < nbQ; i+= 1){
        affichage+=allQ[i].IDQUESTION+" | "+allQ[i].QUESTION+"\n"
    }

    message.channel.send({
        "embeds": [
            new EmbedBuilder()
                .setTitle("Aide")
                .setDescription("Il y a actuellement " + nbQ + " questions.\n\nListe des question(s):\n**ID | Question**\n"+affichage)
                .setColor(client.config.colors.normal)
                .setThumbnail(client.user.avatarURL())
                .setFooter({
                    "text": client.config.footer
                })
        ]
    })
}

exports.help = {
    "name": "show_questions",
    "description": "Montre toutes les questions",
    "alias": []
}