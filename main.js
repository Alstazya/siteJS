const express = require("express")
const favicon = require("serve-favicon")
const ejs = require("ejs")
const path = require("path")
const app = express()

// Rendu EJS
app.set("view engine", "ejs")

// Dossiers utiles au front
app.use(express.static(path.join(__dirname + "/public")))
app.use(express.static(path.join(__dirname + "/views")))

// Routes
app.use("/", require("./routes/main.js"))
app.use("/game", require("./routes/game.js"))

// Favicon
console.log(__dirname + "/truc")
app.use(favicon(__dirname + "/public/css/images/logoSidaction.png"))

// Bot Discord
// const client = require("./discord/main.js")

app.listen(6892, () => console.log("[SERVER] Serveur lancé : http://localhost:6892"))
