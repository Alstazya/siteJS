const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('jeu.db');
let nb;

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function createTable()
{
    db.run("CREATE TABLE IF NOT EXISTS QUESTIONS(IDQUESTION INTEGER Primary KEY autoincrement, QUESTION TEXT NOT NULL, CONSEIL TEXT NOT NULL, LIEN TEXT NOT NULL);"); 
    db.run("CREATE TABLE IF NOT EXISTS REPONSES(IDREPONSE INTEGER PRIMARY KEY AUTOINCREMENT, REPONSE TEXT NOT NULL, ESTBONNEREP INTEGER  NOT NULL, IDQUESTION  INTEGER  NO NULL);");
    db.commit;
}

function dropTable()
{
    db.run("drop TABLE QUESTIONS;")
    db.run("drop TABLE REPONSES;")
    db.commit;
}

function insertQuestion(question, conseil, lien)
{
    db.run('INSERT INTO QUESTIONS(QUESTION, CONSEIL, LIEN) values (?, ?, ?)', question, conseil, lien);
    db.commit;
}

function insertReponse(idquestion, reponse, estbonnerep)
{
    db.run('INSERT INTO REPONSES(idquestion, reponse, estbonnerep) values (?, ?, ?)', idquestion, reponse, estbonnerep);
    db.commit;
}

function nbQuestion()
{
    return new Promise((resolve, reject ) =>{
        db.serialize(() =>{
            db.get("SELECT COUNT(*) as nb FROM QUESTIONS;",(err, row)=>{
                resolve(row['nb']);
            });
        });
    });;
};



function allQuestion()
{
    return new Promise((resolve, reject ) =>{
        db.serialize(() =>{
            db.all("SELECT idquestion, question, conseil, lien FROM QUESTIONS;",(err, rows)=>{
                resolve (rows)
            });
        });
    });
}



async function getReponses(idquestion) {

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all("SELECT reponses.reponse, ESTBONNEREP FROM REPONSES WHERE IDQUESTION= ?", idquestion,(err, rows) =>{
                resolve(rows)
            })
        })
    })
}

async function getAllQuestionsAndResponses() {
    return new Promise(async (resolve, reject) => {
        let data = new Array()
        let questions = await allQuestion()
        
        for (let question of questions) {
            let responses = await getReponses(question["IDQUESTION"])

            data.push({
                "question": question["QUESTION"],
                "responses": responses
            })
        }

        resolve(data)
    })
}

async function getRandomQuestion() {

    let questions = await allQuestion()
    let lenght = Object.keys(questions).length
    let randomNumber = await getRandomInt(lenght)
    let questionWithValues = []
    questionWithValues[0] = questions[randomNumber]['QUESTION']
    questionWithValues[1] = await getReponses(randomNumber)
    return questionWithValues
}

function deleteQuestion(idquestion)
{
    db.run('DELETE FROM REPONSES WHERE IDQUESTION = ?',idquestion)
    db.run('DELETE FROM QUESTIONS WHERE IDQUESTION = ?', idquestion)
    db.commit;
}

function searchID(question)
{
    return new Promise((resolve, reject) =>{
        db.serialize(() => {
            db.get("SELECT IDQUESTION FROM QUESTIONS WHERE QUESTION = ?", question, (err, row) => {
                resolve(row);
            })
        })
    })
}


module.exports=
{
    createTable,
    dropTable,
    insertQuestion,
    insertReponse,
    nbQuestion,
    getRandomQuestion,
    allQuestion,
    deleteQuestion,
    searchID,
    getReponses,
    getAllQuestionsAndResponses
}
                