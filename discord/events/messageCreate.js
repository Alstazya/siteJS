module.exports = (client, message) => {
    let args = message.content.toLowerCase().slice(client.config.prefix.length).split(" ")

    if (message.author.bot) return;

    if (client.commands.has(args[0])) {
        client.commands.get(args[0]).run(client, message, args)
    }
}