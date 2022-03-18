const theMostViewedOccupations = {}

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

module.exports = {
    countUpMostViewed,
    getMostViewed
}
