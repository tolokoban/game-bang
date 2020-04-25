import { IRole } from '../types'
import Tools from '../tools'

const MIN_NB_ROLES = 4
const MAX_NB_ROLES = 7

export default {
    distributeRoles,
    MIN_NB_ROLES,
    MAX_NB_ROLES
}

function distributeRoles(count: number): IRole[] {
    if (count < MIN_NB_ROLES) throw Error(`Minimum number of roles is ${MIN_NB_ROLES}!`)
    if (count > MAX_NB_ROLES) throw Error(`Maximum number of roles is ${MAX_NB_ROLES}!`)
    switch (count) {
        case 4: return distribute("SROO")
        case 5: return distribute("SROOA")
        case 6: return distribute("SROOOA")
        case 7: return distribute("SROOOAA")
        default: throw Error("Wrong number of roles!")
    }

}

const MAP: { [key: string]: IRole } = {
    S: "sheriff",
    O: "outlaw",
    R: "renegade",
    D: "deputy"
}

function distribute(pattern: string): IRole[] {
    const roles: IRole[] = []
    for (const char of pattern) {
        roles.push(MAP[char])
    }
    return Tools.shuffle(roles)
}
