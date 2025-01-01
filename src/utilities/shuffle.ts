export function shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}
