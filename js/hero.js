'use strict'
const LASER_SPEED = 80
var gHero

function createHero(board) {
    gHero = {
        pos: {
            i: 12,
            j: 5
        },
        isShoot: false
    }
    board[gHero.pos.i][gHero.pos.j] = createCell(HERO)
}

// Handle game keys
function onHandleKey(keyEvent) {

    const nexLocation = {
        i: gHero.pos.i,
        j: gHero.pos.j
    }

    switch (keyEvent) {
        case 'ArrowRight':
            nexLocation.j++
            break;
        case 'ArrowLeft':
            nexLocation.j--
    }
    return nexLocation
}

// Move the hero right (1) or left (-1)
function moveHero(dir) {

    if (!gGame.isOn) return

    const nexLocation = onHandleKey(dir.key)

    if (nexLocation.j < 0 ||
        nexLocation.j > gBoard[0].length - 1) return console.log('out of border')

    //mover from curr cell
    // model
    gBoard[gHero.pos.i][gHero.pos.j] = createCell()
    //dom
    updateCell(gHero.pos)

    // //move to next cell
    gHero.pos.i = nexLocation.i
    gHero.pos.j = nexLocation.j
    // // model
    gBoard[gHero.pos.i][gHero.pos.j] = createCell(HERO)
    // // dom
    updateCell(gHero.pos, HERO)
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {

}

// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {

}