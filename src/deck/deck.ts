import { ICard, ICardKind, ICardSuit } from './types'

const SUITS: ICardSuit[] = ["diamonds", "clubs", "hearts", "spades"]
const MIN_RANK = 1  // Ace
const MAX_RANK = 13 // King

export default class Deck {
    private readonly deck: ICard[]
    private readonly heap: ICard[]

    constructor() {
        this.deck = [
            ...cards("volcanic", 2),
            ...cards("schofield", 3),
            ...cards("remington"),
            ...cards("riffle"),
            ...cards("winchester"),
            ...cards("bang", 25),
            ...cards("missed", 12),
            ...cards("beer", 6),
            ...cards("saloon"),
            ...cards("diligence"),
            ...cards("convoy", 2),
            ...cards("holdup", 4),
            ...cards("thunderbolt", 4),
            ...cards("gatling"),
            ...cards("indians", 2),
            ...cards("duel", 3),
            ...cards("googles"),
            ...cards("hideout", 2),
            ...cards("prison", 3),
            ...cards("dynamite"),
            ...cards("mustang", 2),
            ...cards("shop", 2)
        ]
        this.heap = []
        this.deck.forEach((card: ICard, idx: number) => {
            card.suit = SUITS[idx % SUITS.length]
            card.rank = MIN_RANK + idx % (MAX_RANK - MIN_RANK + 1)
        })
        this.shuffle()
        this.cast(this.deck.pop() as ICard)
    }

    get deckCount() { return this.deck.length }
    get heapCount() { return this.heap.length }

    shuffle() {
        const { deck } = this
        for (let i = 0; i < deck.length; i++) {
            const k = Math.floor(Math.random() * deck.length)
            const tmp = deck[i]
            deck[i] = deck[k]
            deck[k] = tmp
        }
    }

    // Cast a card to the heap.
    cast(card: ICard) {
        this.heap.unshift({ ...card })
    }

    // Take a card from the desk.
    // If the deck is empty, redurnish it with the heap,
    // suffle and cast a card to the heap.
    take(): ICard | null {
        const { deck, heap } = this
        let card = deck.pop()
        if (!card) {
            while (heap.length > 0) {
                deck.push(heap.pop() as ICard)
            }
            this.shuffle()
            card = deck.pop() as ICard
        }
        this.cast(this.take() as ICard)

        return { ...card }
    }

    // Take a card from the heap.
    takeFromHeap(): ICard | null {
        const card = this.heap.shift()
        if (!card) return null
        return { ...card }
    }

    getVisibleCardOnHeap(): ICard {
        return { ...this.heap[0] }
    }
}


function cards(name: string, count: number = 1): ICard[] {
    const cards: ICard[] = []
    const card: ICard = {
        kind: "weapon",
        rank: 0,
        suit: "diamonds"
    }

    switch (name) {
        case "volcanic":
            card.name = "Volcanic"
            card.kind = "weapon"
            card.range = 1
            card.volcanic = true
            break
        case "schofield":
            card.name = "schofield"
            card.kind = "weapon"
            card.range = 2
            card.volcanic = false
            break
        case "remington":
            card.name = "Remington"
            card.kind = "weapon"
            card.range = 3
            card.volcanic = false
            break
        case "riffle":
            card.name = "Riffle"
            card.kind = "weapon"
            card.range = 4
            card.volcanic = false
            break
        case "winchester":
            card.name = "Winchester"
            card.kind = "weapon"
            card.range = 5
            card.volcanic = false
            break
        default:
            card.kind = name as ICardKind
    }

    for (let i = 0; i < count; i++) {
        cards.push({ ...card })
    }
    return cards
}
