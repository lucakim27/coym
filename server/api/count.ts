export let theMostViewedOccupations: any = {}
export let theMostCommentedOccupations: any = {}

export function countUpMostViewed(occupationName: any) {
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

export function countUpMostCommented(occupationName: any) {
    if (theMostCommentedOccupations[occupationName] == undefined) {
        theMostCommentedOccupations[occupationName] = 1
    } else {
        theMostCommentedOccupations[occupationName] += 1
    }
}

export function getMostCommented() {
    return theMostCommentedOccupations
}