export default { pick, range, shuffle }

function pick(arr: number[]): number {
    const idx = Math.floor(Math.random() * arr.length)
    return arr[idx]
}

function shuffle(cards: any[]) {
    for (let i = 0; i < cards.length; i++) {
        const k = Math.floor(Math.random() * cards.length)
        const tmp = cards[i]
        cards[i] = cards[k]
        cards[k] = tmp
    }

    return cards
}


function range(start: number, length: number = 0): number[] {
    const numbers: number[] = []
    if (length <= 0) {
        for (let i = 0; i < start; i++) {
            numbers.push(i)
        }
    } else {
        for (let i = start; i < start + length; i++) {
            numbers.push(i)
        }
    }

    return numbers
}
