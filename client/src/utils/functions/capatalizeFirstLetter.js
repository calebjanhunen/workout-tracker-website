export function capatalizeFirstLetter(exerciseName) {
    const stringArr = exerciseName.split(' ');

    return stringArr
        .map(word => word[0].toUpperCase() + word.substr(1))
        .join(' ');
}
