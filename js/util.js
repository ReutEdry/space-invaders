'use strict'

function getEmptyCell(board) {
    var emptPoses = []
    for (var j = 0; j < board[12].length; j++) {
        if (!board[12][j].gameObject) {
            emptPoses.push({ i: 12, j: j })
        }
    }
    if (!emptPoses.length) return null
    var randIdx = getRandomInt(0, emptPoses.length)
    var emptyPos = emptPoses[randIdx]
    return emptyPos
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


