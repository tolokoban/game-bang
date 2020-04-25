export type ICard = ISimpleCard | IWeaponCard

export interface ICardColor {
    rank: number
    suit: ICardSuit
}

export type ICardKind = "weapon" | "bang" | "missed" | "beer" | "saloon"
    | "diligence" | "convoy" | "holdup" | "thunderbolt"
    | "gatling" | "indians" | "duel"
    | "googles" | "hideout" | "prison" | "dynamite"
    | "mustang" | "shop"

export type ICardSuit = "diamonds" | "clubs" | "hearts" | "spades"

export interface ISimpleCard {
    kind: ICardKind
    range?: number
    volcanic?: boolean
    name?: string
}

export interface IWeaponCard extends ISimpleCard {
    kind: "weapon"
    range: number
    // Volcanic can fire more than one Bang! per turn.
    volcanic: boolean
    name: string
}
