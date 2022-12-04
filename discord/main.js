const { Client, IntentsBitField, Partials } = require("discord.js")
const fs = require("fs")

const client = new Client({
    "intents": [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
    "partials": [
        Partials.Guilds,
        Partials.User,
        Partials.Reaction,
        Partials.GuildMember
    ]
})

// Configuration
client.config = JSON.parse(fs.readFileSync("./discord/config.json", "utf-8"))

// Liste des commandes
client.commands = new Map()

// Créer les events
for (let file of fs.readdirSync("./discord/events")) {
    if (file.endsWith(".js")) {
        console.log(file + " chargé")
        client.on(file.split(".")[0], require("./events/" + file).bind(null, client))
    }
}

// Créer les commandes
for (let file of fs.readdirSync("./discord/commands")) {
    if (file.endsWith(".js")) {
        let command = require("./commands/" + file)

        client.commands.set(command.help.name.toLowerCase(), command)

        for (let alias of command.help.alias) {
            client.commands.set(alias.toLowerCase(), command)
        }
    }
}

client.login(client.config.token)

module.exports = client
