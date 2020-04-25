import { ICard, IWeaponCard, IRole } from '../types'
import Tools from '../tools'
import Role from '../role'

const COLT45_NAME = "Colt.45"

const COLT45: IWeaponCard = {
    kind: "weapon",
    name: COLT45_NAME,
    range: 1,
    volcanic: false
}

interface IPlayerSkills {
    autoGoogles: boolean
    autoHideout: boolean
    autoMustang: boolean
    autoVolcanic: boolean
    canDoubleTheDraws: boolean
    canGiveTwoCardsAndGetOneLife: boolean
    canStealCardFromFoeWhenTouched: boolean
    canStealDeadPlayers: boolean,
    canSwapBangAndMissed: boolean
    canTakeCardPerLifeLost: boolean
    canTakeFirstCardFromHeap: boolean
    canTakeFirstCardFromOtherPlayer: boolean
    canTakeThreeCardsAndKeepTwo: boolean
    canTakeThreeCardsIfSecondIsRed: boolean
    everyBangNeedTwoMissed: boolean
    hasAlwaysCardsInHand: boolean
    maxLives: number
}

type IPlayerDef = [string, Partial<IPlayerSkills>]

const PLAYERS: IPlayerDef[] = [
    ["Bart Cassidy", { canTakeCardPerLifeLost: true }],
    ["Black Jack", { canTakeThreeCardsIfSecondIsRed: true }],
    ["Calamity Janet", { canSwapBangAndMissed: true }],
    ["El Gringo", { canStealCardFromFoeWhenTouched: true, maxLives: 3 }],
    ["Jesse Jones", { canTakeFirstCardFromOtherPlayer: true }],
    ["Jourdannais", { autoHideout: true }],
    ["Kit Carlson", { canTakeThreeCardsAndKeepTwo: true }],
    ["Lucky Duke", { canDoubleTheDraws: true }],
    ["Paul Regret", { autoMustang: true, maxLives: 3 }],
    ["Pedro Ramirez", { canTakeFirstCardFromHeap: true, maxLives: 3 }],
    ["Rose Doolan", { autoGoogles: true }],
    ["Sid Ketchum", { canGiveTwoCardsAndGetOneLife: true }],
    ["Slab le flingueur", { everyBangNeedTwoMissed: true }],
    ["Susy Lafayette", { hasAlwaysCardsInHand: true }],
    ["Sam le vautour", { canStealDeadPlayers: true }],
    ["Willy le Kid", { autoVolcanic: true }]
]


export default class Player {
    protected _weapon: IWeaponCard = COLT45
    // Can draw before being hitten by a Bang!.
    protected _hideout = false
    // Other people distance is decreased by 1.
    protected _googles = false
    // People see this player at a distance increased by 1.
    protected _mustang = false
    // While in jail, you can only play if you draw a hearts.
    protected _prison = false
    protected _lives = 4
    public readonly maxLives: number
    public readonly name: string
    public readonly role: IRole

    protected readonly _skills: IPlayerSkills

    constructor(name: string, role: IRole, skills: Partial<IPlayerSkills>) {
        this.name = name
        this.role = role
        this._skills = {
            autoGoogles: false,
            autoHideout: false,
            autoMustang: false,
            autoVolcanic: false,
            canDoubleTheDraws: false,
            canGiveTwoCardsAndGetOneLife: false,
            canStealCardFromFoeWhenTouched: false,
            canStealDeadPlayers: false,
            canSwapBangAndMissed: false,
            canTakeCardPerLifeLost: false,
            canTakeFirstCardFromHeap: false,
            canTakeFirstCardFromOtherPlayer: false,
            canTakeThreeCardsAndKeepTwo: false,
            canTakeThreeCardsIfSecondIsRed: false,
            everyBangNeedTwoMissed: false,
            hasAlwaysCardsInHand: false,
            maxLives: 4,
            ...skills
        }
        this.maxLives = this._skills.maxLives + (role === 'sheriff' ? 1 : 0)
        this._lives = this.maxLives - 2
    }

    get skills() { return { ...this._skills } }

    get description(): string[] {
        const desc: string[] = []
        const { _skills } = this
        if (_skills.autoGoogles) {
            desc.push("On considère qu'elle a une lunette en jeu à tout moment : la distance de tous les autres joueurs est réduite de 1 pour elle. Si elle a une autre Lunuette réèlle en jeu, elle peut utiliser les deux, e qui réduit la distance de tous les autres joueurs de 2 en tout.")
        }
        if (_skills.autoHideout) {
            desc.push("On considère qu'il a une planque en jeu à tout moment. Il peut \"dégainer !\" quand il est la cible d'un BANG!, et s'il tire un coeur, le tir l'a raté. S'il a une autre vraie carte Planque en jeu, il peut l'utiliser également, de qui lui donne deux chances d'annuler un BANG! avant d'avoir à jouer une Raté!")
        }
        if (_skills.autoMustang) {
            desc.push("On considère qu'il a un Mustang en jeu à tout moment : tous les autres joueurs doivent ajouter 1 à la distance qui les sépare de lui. S'il a un autre Mustang réèl en jeu, il peut utiliser les deux, ce qui augmente la distance de 2 en tout.")
        }
        if (_skills.autoVolcanic) {
            desc.push("Il peut jouer autant de cartes BANG! qu'il le désire pendant son tour.")
        }
        if (_skills.canTakeCardPerLifeLost) {
            desc.push("Chaque fois qu'il perd un point de vie, il pioche immédiatement une carte.")
        }
        if (_skills.canTakeThreeCardsIfSecondIsRed) {
            desc.push("Durant la phase 1 de son tour, il doit montrer la seconde carte qu'il a piochée. Si c'est un Coeur ou un Carreau, il pioche une troisième carte (sans la montrer).")
        }
        if (_skills.canSwapBangAndMissed) {
            desc.push("Elle peut utiliser les cartes BANG! comme des Raté! et vice-versa. Si elle joue un Raté! à la place d'un BANG!, elle ne peut pas jouer d'autre carte BANG! durant son tour (sauf si elle a une Volcanic en jeu).")
        }
        if (_skills.canStealCardFromFoeWhenTouched) {
            desc.push("Chaque fois qu'il perd un point de vie à cause d'une carte jouée par un autre joueur, il tire une carte au hasard dans la main de ce dernier (une carte par point de vie). Si ce joueur n'a plus de cartes, dommage, il ne peut pas lui en prendre ! N'oubliez pas que les points de vie perdus à cause de la dynamite ne sont pas considérés comme étant causés par un joueur.")
        }
        if (_skills.canTakeFirstCardFromOtherPlayer) {
            desc.push("Pendant la phase 1 de son tour, il peut choisir soit de prendre sa première carte dans la pioche, soit de prendre une carte au hasard de la main d'un autre joueur. Il pioche ensuite sa seconde carte dans la pioche.")
        }
        if (_skills.canTakeThreeCardsAndKeepTwo) {
            desc.push("Durant la phase 1 de son tour, il regarde les trois premières cartes de la pioche, en choisit 2 qu'il garde et repose la troisième sur la pioche, face cachée.")
        }
        if (_skills.canDoubleTheDraws) {
            desc.push("Chaque fois qu'il doit \"dégainer\", il retourne les deux premières cartes de la pioche et choisit celle qu'il préfère. Il défausse ensuite les deux cartes.")
        }
        if (_skills.canTakeFirstCardFromHeap) {
            desc.push("Durant la phase 1 de son jeu, il peut choisir de piocher la première carte de la défausse au lieu de prendre dans la pioche. Il prend sa deuxième carte normalement, dans la pioche.")
        }
        if (_skills.canGiveTwoCardsAndGetOneLife) {
            desc.push("A tout moment, il peut défausser deux cartes de sa main pour regagner un point de vie. S'il le désire et si c'est possible, il peut utiliser cette caractéristique plusieurs fois d'affilée.")
        }
        if (_skills.everyBangNeedTwoMissed) {
            desc.push("Quand il joue une carte BANG! sur un joueur, ce dernier doit jouer deux cartes Raté! au lieu d'une pour l'annuler. L'effet de la Planque ne compte que pour une seule carte Raté!")
        }
        if (_skills.hasAlwaysCardsInHand) {
            desc.push("Dès qu'elle n'a plus aucune carte en main, elle prend une carte dans la pioche.")
        }
        if (_skills.canStealDeadPlayers) {
            desc.push("Peut prendre toutes les cartes en main et en jeu d'un joueur éliminé.")
        }

        return desc
    }

    /**
     * If the player has something else than the default weapon,
     * then he must cast it in the heap if he wants to add a new one.
     */
    hasDefaultWeapon(): boolean {
        return this._weapon.name === COLT45_NAME
    }

    get weapon() { return { ...this._weapon } }
    set weapon(weapon: IWeaponCard) { this._weapon = { ...weapon } }

    get lives() { return this._lives }

    static getRandomPlayers(count: number): Player[] {
        const playerDefs = Tools.shuffle(PLAYERS).slice(0, count)
        const playerRoles = Role.distributeRoles(count)
        const players = playerDefs.map(
            (def: IPlayerDef, idx: number) => {
                const [name, skills] = def
                const role = playerRoles[idx]
                return new Player(name, role, skills)
            }
        )
        return players
    }
}
