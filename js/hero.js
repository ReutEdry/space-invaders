'use strict'
const LASER_SPEED = 80
var gHero
var gLaserInterval
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

    const nextLocation = {
        i: gHero.pos.i,
        j: gHero.pos.j
    }

    switch (event.key) {
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'n':
            blowUpNegs()
            break;
    }

    if (event.code === 'Space') shoot()
    return nextLocation
}

function moveHero(dir) {
    if (!gGame.isOn) return

    const nextLocation = onHandleKey(dir)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]


    if (nextLocation.j < 0 || nextLocation.j > gBoard[0].length - 1) return

    if (nextCell.gameObject === SPACE_CANDIES) {
        updateScore(50)
        nextCell.gameObject = HERO
    }

    //mover from curr cell
    // model
    gBoard[gHero.pos.i][gHero.pos.j] = createCell()
    //dom
    updateCell(gHero.pos)

    // //move to next cell
    gHero.pos.i = nextLocation.i
    gHero.pos.j = nextLocation.j
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
    playAudio()
    setBlinkLaser()
}

function blinkLaser(pos) {
    updateCell(pos, LASER)

    setTimeout(() => {
        updateCell(pos)
    }, 500);
}

function setBlinkLaser() {

    gLaserInterval = setInterval(() => {
        --gLaserPos.i
        stopLaserInterval(gLaserPos)
        blinkLaser(gLaserPos)
    }, 1000);
}

function stopLaserInterval() {
    if (gLaserPos.i === 0 || laserHit()) {
        gHero.isShoot = false
        clearInterval(gLaserInterval)
    }
}

function laserHit() {
    for (var i = 0; i < gAliensPoses.length; i++) {
        var currAlien = gAliensPoses[i]
        if (gLaserPos.i === currAlien.i &&
            gLaserPos.j === currAlien.j) {
            gAliensPoses.splice(i, 1)
            updateScore(10)
            if (!gAliensPoses.length) onOpenModal('YOU DEFETED THE INVADERS 💪🏼🥇')
            return true
        }
    }
    return false
}

function blowUpNegs() {
    for (var i = gLaserPos.i - 1; i <= gLaserPos.i + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = gLaserPos.j - 1; j <= gLaserPos.j + 1; j++) {
            if (i === gLaserPos.i && j === gLaserPos.j) continue
            if (j < 0 || j > gBoard[0].length - 1) continue
            if (gBoard[i][j].gameObject === ALIEN) {
                gBoard[i][j] = createCell()
                updateCell({ i, j })
                removeBlowedAliens(i, j)

            }
        }
    }
    // i wanted to say that when i press the 'n' key so the laser will stop because he exploded
    gHero.isShoot = false
    clearInterval(gLaserInterval)
}

function removeBlowedAliens(iIdx, jIdx) {
    for (var i = 0; i < gAliensPoses.length; i++) {
        if (gAliensPoses[i].i === iIdx && gAliensPoses[i].j === jIdx) {
            gAliensPoses.splice(i, 1)
            updateScore(10)
            if (!gAliensPoses.length) onOpenModal('YOU DEFETED THE INVADERS 💪🏼🥇')
        }
    }
}


function playAudio() {
    var audio = new Audio('audio/blaster.mp3')
    audio.play()
}