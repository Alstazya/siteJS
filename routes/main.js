const router = require("express").Router()

router.get("/", (req, res) => {
    res.render("main.ejs", {
        "user": "Hugo",
        "maze": [[]]
    })
})

router.get("/cookies", (req, res) => {
    res.render("cookies.ejs", {
        "user": "Hugo"
    })
})

router.get("/mentions", (req, res) => {
    res.render("mentionLegale.ejs", {
        "user": "Hugo"
    })
})

router.get("/donnees", (req, res) => {
    res.render("donneesPerso.ejs", {
        "user": "Hugo"
    })
})

router.get("/startGame", (req, res) => {
    res.render("startGame.ejs", {
        "user": "Hugo"
    })
})

router.get("/contact", (req, res) => {
    res.render("contact.ejs", {
        "user": "Hugo"
    })
})

router.get("/carte_question", (req, res) => {
    res.render("carte_question.ejs", {
        "user": "Hugo"
    })
})

router.get("/easteregg", (req, res) => {
    res.render("easterEgg.ejs", {
        "user": "Hugo"
    })
})

router.get("/liensUtiles", (req, res) => {
    res.render("liensUtiles.ejs", {
        "user": "Hugo"
    })
})


module.exports = router