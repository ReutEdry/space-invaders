'use strict'

const ALIEN_SPEED = 500
var gIntervalAliens
var gAliensPoses = []
var gAliensTopRowIdx
var gAliensBottomRowIdx = 0
var gIsAlienFreeze = true
const firstRightCell = 0
const lastRightJ = 13


function createAliens(board) {
    gAliensTopRowIdx = 1
    for (var j = 3; j < 11; j++) {
        board[gAliensTopRowIdx][j] = createCell(ALIEN)
        gAliensPoses.push({ i: gAliensTopRowIdx, j: j })
    }
    // console.log(gAliensPoses)
}

/// second attempt

function moveAliens() {
    if (!gGame.isOn) return
    // console.log(gAliensPoses)
    for (var i = 0; i < gAliensPoses.length; i++) {
        const alien = gAliensPoses[i]
        // moveAlienRight(alien)
        if (alien.i === gHero.pos.i) {
            onOpenModal('YOU DEAD ☠️')
            return
        } 
        moveAlienDown(alien)
    }
}



// function moveAlienRight(alien) {
//     console.log('hey from right')
//     if (alien.j === lastRightJ) {
//         // moveAlienDown(alien)
//     }
//     // curr location
//     gBoard[alien.i][alien.j] = createCell()
//     updateCell(alien)

//     // nextlocation
//     alien.j++
//     gBoard[alien.i][alien.j] = createCell(ALIEN)
//     updateCell(alien, ALIEN)
//     console.log(gBoard)
// }

function moveAlienDown(alien) {
    
    if(alien.i !== gHero.pos.i) {
    // curr location
    var currLocation = alien
    gBoard[currLocation.i][currLocation.j] = createCell()
    updateCell(alien)
    //next location
    alien.i++
    gBoard[alien.i][alien.j] = createCell(ALIEN)
    updateCell(alien, ALIEN)
    // moveAlienLeft(alien)
    }
}

// function moveAlienLeft(alien) {
//     console.log('hey from left')
//     // curr location
//     gBoard[alien.i][alien.j] = createCell()
//     updateCell(alien)

//     // next location
//     alien.j--
//     gBoard[alien.i][alien.j] = createCell(ALIEN)
//     updateCell(alien, ALIEN)
// }

 

///////// first attempt


// function shiftBoardRight(board, fromI, toI) {
//     for (var i = fromI; i <= toI; i++) {
//         for (var j = 0; j < board[i].length - 1; j++) {
//             board[i][j] = board[i][j + 1]
//         }
//         board[i][board[i].length - 1] = createCell()
//     }
// }

// function shiftBoardLeft(board, fromI, toI) {

// }
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




