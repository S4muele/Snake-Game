const grid = document.getElementById("grid")
const startBtn = document.getElementById("start-btn")
const scoreboard = document.getElementById("score")
let score = 0
let gameCells = []
let snake = [2, 1, 0]
let snakeDirection = 1
let snakeSpeed = 1000
let speedIncrement = 0.9
let cellsPerRow = 10 // #grid width divided by .game-cell width
let apple = 0
let timerId = setInterval(moveSnake, snakeSpeed) //automate snake movement

function displayScore() { // Displaying the score
    scoreboard.textContent = " " + score
}
displayScore()

function startGame() { //start/restart button logic
    clearInterval(timerId)
    score = 0
    snake.forEach(index => gameCells[index].classList.remove("snake"))
    snake = [2, 1, 0]
    gameCells[apple].classList.remove("apple")
    displayScore()
    snake.forEach(index => gameCells[index].classList.add("snake"))
    generateApple()
    snakeSpeed = 1000
    snakeDirection = 1
    timerId = setInterval(moveSnake, snakeSpeed)
}

function createGrid() { //rendering the game grid
    for (let i = 0; i < 100; i++) {
        const gameCell = document.createElement("div") 
        gameCell.classList.add("game-cell")
        grid.appendChild(gameCell)
        gameCells.push(gameCell) 
    }   
}
createGrid()

snake.forEach(index => gameCells[index].classList.add("snake")) //rendering the snake

function generateApple() {
    do {
        apple = Math.floor(Math.random() * (cellsPerRow * cellsPerRow))
    } while (gameCells[apple].classList.contains("snake"))
    gameCells[apple].classList.add("apple")
}
generateApple()

function moveSnake() { //snake movement 
    if ( //checking snake head position and snake direction
        (snake[0] - cellsPerRow < 0 && snakeDirection === - cellsPerRow) ||
        (snake[0] % cellsPerRow === cellsPerRow - 1 && snakeDirection === 1) ||
        (snake[0] + cellsPerRow >= cellsPerRow * cellsPerRow && snakeDirection === + cellsPerRow) ||
        (snake[0] % cellsPerRow === 0 && snakeDirection === - 1) ||
        gameCells[snake[0] + snakeDirection].classList.contains("snake")
    ) return clearInterval(timerId) // to stop the game if the grid wall is hit    
    let tail = snake.pop() //moving the snake
    gameCells[tail].classList.remove("snake")
    snake.unshift(snake[0] + snakeDirection)
    gameCells[snake[0]].classList.add("snake")  
    if (gameCells[snake[0]].classList.contains("apple")) { //when it eats an apple
        gameCells[snake[0]].classList.remove("apple")
        snake.push(tail)
        gameCells[tail].classList.add("snake")
        generateApple()
        clearInterval(timerId)
        snakeSpeed *= speedIncrement
        timerId = setInterval(moveSnake, snakeSpeed)
        score ++
        displayScore()
    }     
}

document.addEventListener("keydown", controlSnake) //Using arrows to change snake direction
function controlSnake(e) {
    if (e.key === "ArrowUp") {
        snakeDirection = - cellsPerRow   
    } else if (e.key === "ArrowRight") {
        snakeDirection = 1
    } else if (e.key === "ArrowDown") {
        snakeDirection = cellsPerRow
    } else if (e.key === "ArrowLeft") {
        snakeDirection = -1
    }
}

startBtn.addEventListener("click", startGame)




