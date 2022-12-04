const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

const cellSize = 20 // pixels

let player = {
    "y": 1,
    "x": 0,
    "won": false,
    "canMove": true
}

let lastQuestion = null

canvas.setAttribute("width", maze.length * cellSize)
canvas.setAttribute("height", maze.length * cellSize)

document.addEventListener("keydown", event => {
    if (player.canMove) {
        switch (event.key) {
            case "ArrowUp":
                if (0 < player.y && maze[player.y - 1][player.x] != 0) {
                    player.y -= 1
                    update()
                }
                break
    
            case "ArrowDown":
                if (player.y + 1 < maze.length && maze[player.y + 1][player.x] != 0) {
                    player.y += 1
                    update()
                }
                break
    
            case "ArrowLeft":
                if (0 < player.x && maze[player.y][player.x - 1] != 0) {
                    player.x -= 1
                    update()
                }
                break
    
            case "ArrowRight":
                if (player.x + 1 < maze.length && maze[player.y][player.x + 1] != 0) {
                    player.x += 1
                    update()
                }
                break
        }
    }
})

function update() {
    // Entrée
    console.log(maze[1][0])
    maze[1][0] = 1
    maze[maze.length - 2][maze.length - 1] = 1

    for (let row = 0; row < maze.length; row++) {
        for (let column = 0; column < maze.length; column++) {
            context.fillStyle = maze[row][column] == 0 ? "#4444dd" : "#44dd44"
            context.fillRect(column * cellSize, row * cellSize, cellSize, cellSize)

            if (maze[row][column] == 2) {
                context.fillStyle = "#0c0c0c"
                context.beginPath()
                context.arc(cellSize * (column + 0.5), cellSize * (row + 0.5), cellSize - 14, 0, Math.PI * 2)
                context.fill()
            }

            if (player.y == row && player.x == column) {
                context.fillStyle = "#dd4444"
                context.fillRect(column * cellSize + 4, row * cellSize + 4, cellSize - 8, cellSize - 8)
            }
        }
    }

    if (!player.won && checkWin()) {
        alert("Vous avez gagné !")
        player.won = true
    } else if (maze[player.y][player.x] == 2) {
        player.canMove = false
        let question = Math.floor(Math.random() * questions.length)
        lastQuestion = questions[question]
        document.getElementById("question").innerText = questions[question]["question"]

        console.log(questions[question])

        for (let answer of questions[question]["responses"]) {
            let div = document.createElement("div")
            let input = document.createElement("input")
            input.type = "radio"
            input.name="fav_language"
            
            let label = document.createElement("label")
            label.className = "la_reponse"
            label.innerText = answer["REPONSE"]

            div.appendChild(input)
            div.appendChild(label)
            document.getElementById("answers").appendChild(div)
        }

        questions.splice(question, 1)
    }
}

function checkWin() {
    return player.y == maze.length - 2 && player.x == maze.length - 1
}

function valid() {
    let answer = lastQuestion.responses.find(res => res["REPONSE"] == document.querySelector("#answers > div > input:checked + label").innerText)
    if (answer["ESTBONNEREP"] == 1) {
        alert("Bonne réponse !")
        player.canMove = true
        document.getElementById("question").value = ""
        
        for (let child of document.getElementById("answers").children) {
            child.remove()
        }
    } else {
        alert("Mauvaise réponse ! Retentez")
    }
}

update()