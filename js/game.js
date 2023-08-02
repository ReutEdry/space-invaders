'use strict'

const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3

const HERO = '🤖'
const ALIEN = '👽'
const LASER = '⤊'
const GROUND = '🧱'
const SKY = 'SKY'

var gBoard
var gGame = {
    isOn: false,
    alienCount: 0
}


// Called when game loads
function onInit() {
    gBoard = createBoard(BOARD_SIZE)
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard)

    gGame.isOn = true
    console.log(gBoard)
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


// position such as: {i: 2, j: 7}
function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}

function getElCell(pos) {
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`)
}
