import Deck from "./deck"

describe("deck/deck", () => {
    it("should have 79 cards in the deck", () => {
        const deck = new Deck()
        expect(deck.deckCount).toBe(79)
    })
    it("should have 1 card in the heap", () => {
        const deck = new Deck()
        expect(deck.heapCount).toBe(1)
    })
})
