'use strict'
const LASER_SPEED = 80
var gHero
var gInterval
var gLaserPos

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

function onHandleKey(event) {

    const nexLocation = {
        i: gHero.pos.i,
        j: gHero.pos.j
    }

    switch (event.key) {
        case 'ArrowRight':
            nexLocation.j++
            break;
        case 'ArrowLeft':
            nexLocation.j--
    }

    if (event.code === 'Space') shoot()

    return nexLocation
}

function moveHero(dir) {
    if (!gGame.isOn) return
    const nexLocation = onHandleKey(dir)

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

function shoot() {
    if (gHero.isShoot === true) return console.log('bye')
    gHero.isShoot = true
    const i = gHero.pos.i
    const j = gHero.pos.j
    gLaserPos = {
        i: i,
        j: j
    }
    setBlinkLaser()
}

function blinkLaser(pos) {
    updateCell(pos, LASER)

    setTimeout(() => {
        updateCell(pos)
    }, 500);
}

function setBlinkLaser() {
    gInterval = setInterval(() => {
        --gLaserPos.i
        stopInterval(gLaserPos)
        blinkLaser(gLaserPos)
    }, 1000);
}

function stopInterval() {
    if (gLaserPos.i === 0 || alienHit()) {
        gHero.isShoot = false
        clearInterval(gInterval)
    }
}

function alienHit() {
    for (var i = 0; i < gAliensPoses.length; i++) {
        var currAlien = gAliensPoses[i]
        if (gLaserPos.i === currAlien.i &&
            gLaserPos.j === currAlien.j) {
            gAliensPoses.splice(i, 1)
            updateScore(10)
            if (!gAliensPoses.length) onOpenModal()
            return true
        }
    }
    return false
}