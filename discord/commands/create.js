const { EmbedBuilder } = require("discord.js")
const { insertQuestion, insertReponse, searchID } = require("../../bdd")

module.exports.run = (client, message, args) => {
    message.channel.send({
        "embeds": [
            new EmbedBuilder()
                .setTitle("Creation d'une question")
                .setDescription("Veuillez ecrire la question")
                .setColor(client.config.colors.normal)
                .setThumbnail(client.user.avatarURL())
                .setFooter({
                    "text": client.config.footer
                })
        ]
    })

    const collector = message.channel.createMessageCollector({
        filter: m => m.author.id==message.author.id, 
        idle: 120000
    });

    let quiz_question = []
    let names = {'1':"première", '2':"deuxième", '3':'troisième', '4':'quatrième'}
    let ind = 1
    let isHint = false, isLink = false, isConfirmed = false
    let ind_true_answer = 0

    collector.on('collect', async m => {
        let element = m.content
        if (m.content=='cancel'){
            collector.stop()
        }

        if (m.content.toLowerCase()=='confirm' || isConfirmed==true || ind > 4){ 
            if (ind <= 2){
                message.channel.send({
                    "embeds": [
                        new EmbedBuilder()
                            .setTitle("Creation d'une question")
                            .setDescription("Erreur: vous ne pouvez pas confirmer la question avant d'avoir mis au moins")
                            .setColor(client.config.colors.normal)
                            .setThumbnail(client.user.avatarURL())
                            .setFooter({
                                "text": client.config.footer
                            })
                    ]
                })   
            }
            else {
                isConfirmed = true
                if (isHint==false){
                    if (element != 'confirm'){
                        quiz_question.push(element)
                    }
                    message.channel.send({
                        "embeds": [
                            new EmbedBuilder()
                                .setTitle("Creation d'une question")
                                .setDescription("Veuillez entrer le texte lors de la séléction de la bonne réponse (conseil)")
                                .setColor(client.config.colors.normal)
                                .setThumbnail(client.user.avatarURL())
                                .setFooter({
                                    "text": client.config.footer
                                })
                        ]
                    })
                    isHint = true
                }
                else if (isLink==false){
                    quiz_question.push(element)
                    message.channel.send({
                        "embeds": [
                            new EmbedBuilder()
                                .setTitle("Creation d'une question")
                                .setDescription("Veuillez entrer le lien pour le bouton 'en savoir plus'")
                                .setColor(client.config.colors.normal)
                                .setThumbnail(client.user.avatarURL())
                                .setFooter({
                                    "text": client.config.footer
                                })
                        ]
                    })
                    isLink = true
                }
                else{
                    quiz_question.push(element)

                    insertQuestion(quiz_question[0],quiz_question[quiz_question.length-2],quiz_question[quiz_question.length-1])
                    let idq = await searchID(quiz_question[0])
                    for (let i = 1; i < ind-1; i+=1){
                        if (ind_true_answer == i){
                            insertReponse(idq.IDQUESTION,quiz_question[i],1)
                        }
                        else {
                            insertReponse(idq.IDQUESTION,quiz_question[i],0)
                        }

                    }

                    message.channel.send({
                        "embeds": [
                            new EmbedBuilder()
                                .setTitle("Creation d'une question")
                                .setDescription("Votre question a bien été ajoutée au quiz")
                                .setColor(client.config.colors.normal)
                                .setThumbnail(client.user.avatarURL())
                                .setFooter({
                                    "text": client.config.footer
                                })
                        ]
                    })
                    collector.stop()
                }
            }           
            
        }
        else {
            message.channel.send({
                "embeds": [
                    new EmbedBuilder()
                        .setTitle("Creation d'une question")
                        .setDescription("Veuillez ecrire la " + names[ind] + " réponse" + "\nSi cette réponse est la bonne réponse, veuillez rajouter le caractère '&'" + (ind>2?"\nOu saisissez 'confirm' pour valider la création de la question":""))
                        .setColor(client.config.colors.normal)
                        .setThumbnail(client.user.avatarURL())
                        .setFooter({
                            "text": client.config.footer
                        })
                ]
            })

            if (element[0]=="&"){
                ind_true_answer = ind-1
                quiz_question.push(element.slice(1))
            }
            else{
                quiz_question.push(element)
            }
            ind += 1
        }
    });

    collector.on('end', (collected, reason) => {
        if (reason=='idle'){
            message.channel.send({
                "embeds": [
                    new EmbedBuilder()
                        .setTitle("Creation d'une question")
                        .setDescription("Erreur lors de la création de commande: vous avez mis trop de temps")
                        .setColor(client.config.colors.normal)
                        .setThumbnail(client.user.avatarURL())
                        .setFooter({
                            "text": client.config.footer
                        })
                ]
            })
        }
    });
}

exports.help = {
    "name": "create",
    "description": "Créé une question",
    "alias": []
}