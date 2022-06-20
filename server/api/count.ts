export const theMostViewedOccupations = {}
export const theMostCommentedOccupations = {}

export function countUpMostViewed(occupationName: string | number, theMostViewedOccupations?: any) {
    if (theMostViewedOccupations === undefined || theMostViewedOccupations === null) {
        return 0
    }
    if (theMostViewedOccupations[occupationName] == undefined) {
        theMostViewedOccupations[occupationName] = 1
    } else {
        theMostViewedOccupations[occupationName] += 1
    }
}

export function getMostViewed() {
    return theMostViewedOccupations
}

export function countUpMostCommented(occupationName: string | number, theMostCommentedOccupations?: any) {
    if (theMostCommentedOccupations[occupationName] == undefined) {
        theMostCommentedOccupations[occupationName] = 1
    } else {
        theMostCommentedOccupations[occupationName] += 1
    }
}

export function getMostCommented() {
    return theMostCommentedOccupations
}