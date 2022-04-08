const theMostViewedOccupations = {}
const theMostCommentedOccupations = {}

function countUpMostViewed(occupationName) {
    if (theMostViewedOccupations[occupationName] == undefined) {
        theMostViewedOccupations[occupationName] = 1
    } else {
        theMostViewedOccupations[occupationName] += 1
    }
}

function getMostViewed() {
    return theMostViewedOccupations
}

function countUpMostCommented(occupationName) {
    if (theMostCommentedOccupations[occupationName] == undefined) {
        theMostCommentedOccupations[occupationName] = 1
    } else {
        theMostCommentedOccupations[occupationName] += 1
    }
}

function getMostCommented() {
    return theMostCommentedOccupations
}

module.exports = {
    countUpMostViewed,
    getMostViewed,
    countUpMostCommented,
    getMostCommented
}
