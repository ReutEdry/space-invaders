'use strict'
const LASER_SPEED = 80
var gHero
var gLaserInterval
var gHeroLaserPos

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
    gHeroLaserPos = {
        i: i,
        j: j
    }

    playLaserAudio()
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
        --gHeroLaserPos.i
        stopLaserInterval(gHeroLaserPos)
        blinkLaser(gHeroLaserPos)
    }, 1000);
}

function stopLaserInterval() {
    if (gHeroLaserPos.i === 0 || laserHit()) {
        gHero.isShoot = false
        clearInterval(gLaserInterval)
    }
}

function laserHit() {
    for (var i = 0; i < gAliensPoses.length; i++) {
        var currAlien = gAliensPoses[i]
        if (gHeroLaserPos.i === currAlien.i &&
            gHeroLaserPos.j === currAlien.j) {
            gAliensPoses.splice(i, 1)
            updateScore(10)
            if (!gAliensPoses.length) onOpenModal('YOU DEFETED THE INVADERS 💪🏼🥇')
            return true
        }
    }
    // console.log(gAliensPoses)
    return false
}

function blowUpNegs() {
    if (!gHero.isShoot) return
    playExplositionAudio()
    for (var i = gHeroLaserPos.i - 1; i <= gHeroLaserPos.i + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = gHeroLaserPos.j - 1; j <= gHeroLaserPos.j + 1; j++) {
            if (i === gHeroLaserPos.i && j === gHeroLaserPos.j) continue
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
    // console.log(gAliensPoses)
}
