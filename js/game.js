'use strict'

const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3

const HERO = '🤖'
const ALIEN = '👾'
const LASER = '⤊'
const GROUND = '🪨'
const SKY = 'SKY'
const SPACE_CANDIES = '🍔'

var gBoard
var gGame = {
    isOn: false,
    alienCount: 0,
    score: 0
}
var gCandyInterval


function onInit() {
    gBoard = createBoard(BOARD_SIZE)
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard)
    gHeroLaserPos
    gAliensTopRowIdx = 1
    gGame.score = 0
    updateScore(0)
    gIntervalAliens = setInterval(moveAliens, 3000)
    gCandyInterval = setInterval(addSpaceCandy, 10000)

    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')

}

function createBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell()
            if (i === 13) board[i][j] = createCell(GROUND)
        }
    }
    return board
}

function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < board.length; i++) {
        strHtml += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]

            if (cell.gameObject === HERO) {
                cell = HERO
            } else if (cell.gameObject === ALIEN) {
                cell = ALIEN
            } else if (cell.gameObject === GROUND) {
                cell = GROUND
            } else if (!cell.gameObject) {
                cell = ''
            }

            strHtml += `<td data-i="${i}" data-j="${j}" class="cell">${cell}</td>`
        }
        strHtml += `</tr>`
    }
    const elTable = document.querySelector('.board')
    elTable.innerHTML = strHtml
}

function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

function updateScore(diff) {
    // update model
    gGame.score += diff
    // update dom
    document.querySelector('.alien-score span').innerText = gGame.score
}

function onOpenModal(msg) {
    const elModalMsg = document.querySelector('.modal h2')
    elModalMsg.innerText = msg

    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
    endGame()
}

function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}

function getElCell(pos) {
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`)
}

function onStartBtnClick() {
    gGame.isOn = true
}

function addSpaceCandy() {
    if (!gGame.isOn) return
    var emptyPos = getEmptyCell(gBoard)
    if (!emptyPos) return

    // model
    gBoard[emptyPos.i][emptyPos.j] = createCell(SPACE_CANDIES)
    //dom
    updateCell(emptyPos, SPACE_CANDIES)

    setTimeout(() => {
        if (gBoard[emptyPos.i][emptyPos.j].gameObject === HERO) return
        gBoard[emptyPos.i][emptyPos.j] = createCell()
        updateCell(emptyPos)
    }, 3000);
}

function endGame() {
    gGame.isOn = false
    clearInterval(gIntervalAliens)
    clearInterval(gCandyInterval)
}