'use strict'

const ALIEN_SPEED = 500
var gIntervalAliens
var gAliensPoses = []
var gAliensTopRowIdx
var gAliensBottomRowIdx = 0
var gIsAlienFreeze = true

function createAliens(board) {
    var rowStart = 1
    for (var j = 3; j < 11; j++) {
        board[rowStart][j] = createCell(ALIEN)
        gAliensPoses.push({ i: rowStart, j: j })
    }
}

// attempt to move them to the right
// function shiftBoardRight(board, fromI, toI) {
//     for (var i = fromI; i <= toI; i++) {
//         for (var j = 0; j < board[i].length - 1; j++) {
//             board[i][j] = board[i][j + 1]
//         }
//         board[i][board[i].length - 1] = createCell()
//     }
// }

function shiftBoardLeft(board, fromI, toI) {

}
// attempt to move them down - it is workin but has a bug
// function shiftBoardDown(board) {
//     if (!gGame.isOn) return
//     console.log(gBoard)
//     var lastLocation
//     for (var i = 0; i < gAliensPoses.length; i++) {
//         if (gAliensPoses[0].i === gHero.pos.i - 1) {
//             onOpenModal('YOU LOST ☠️')
//             return
//         }
//         var currAlien = gAliensPoses[i]
//         board[currAlien.i][currAlien.j] = createCell()
//         updateCell(currAlien)
//         currAlien.i++
//         lastLocation = currAlien
//         board[lastLocation.i][lastLocation.j] = createCell(ALIEN)
//     }
//     console.log(gBoard)
//     renderBoard(gBoard)
// }




