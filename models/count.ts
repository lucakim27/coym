let theMostViewedOccupations: any = {}
let theMostCommentedOccupations: any = {}

/**
 * Returns theMostViewedOccupations object
 * @return {Object}
 */
export const getMostViewed = function(): any {
    return theMostViewedOccupations
}

/**
 * Returns theMostCommentedOccupations object
 * @return {Object}
 */
export const getMostCommented = function(): any {
    return theMostCommentedOccupations
}

/**
 * Set the integer variable with a key of the parameter to 1 in the object
 * Count up the integer variable with a key of the parameter in the object
 * @param {String} occupationName
 */
export const countUpMostViewed = function(occupationName: any) {
    if (theMostViewedOccupations[occupationName] == undefined) {
        theMostViewedOccupations[occupationName] = 1
    } else {
        theMostViewedOccupations[occupationName] += 1
    }
}

/**
 * Set the integer variable with a key of the parameter to 1 in the object
 * Count up the integer variable with a key of the parameter in the object
 * @param {String} occupationName
 */
export const countUpMostCommented = function(occupationName: any) {
    if (theMostCommentedOccupations[occupationName] == undefined) {
        theMostCommentedOccupations[occupationName] = 1
    } else {
        theMostCommentedOccupations[occupationName] += 1
    }
}