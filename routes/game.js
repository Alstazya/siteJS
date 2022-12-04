const router = require("express").Router()
const generator = require("amazejs")
const { getAllQuestionsAndResponses } = require("../bdd")

router.get("/", async (req, res) => {
    let size = 21
    let rows = new Array()
    let maze = new generator.Backtracker(size, size)
    maze.generate()

    for (let i = 0; i < maze.grid.length; i += size) rows.push(Array.from(maze.grid.slice(i, i + size), value => parseInt(value)))

    let possibilities = new Array()

    for (let row = 0; row < rows.length; row++) {
        for (let column = 0; column < rows[row].length; column++) {
            if (rows[row][column] == 1 && 0 < row && row < rows.length - 1 && 0 < column && column < rows.length) {
                possibilities.push([column, row])
            }
        }
    }

    for (let i = 0; i < Math.floor(size / 2); i++) {
        let coords = Math.floor(Math.random() * possibilities.length)
        rows[possibilities[coords][1]][possibilities[coords][0]] = 2
        possibilities.splice(coords, 1)
    }

    let questions = await getAllQuestionsAndResponses()
    
    res.render("startGame.ejs", {
        "maze": rows,
        "questions": questions
    })
})

module.exports = router