import React from "react"
import PlayerView from '../player'
import Player from '../../player'

import "./players.css"

interface IPlayersProps {
    className?: string[]
    players: Player[]
    activePlayerIndex: number
}
interface IPlayersState {}

export default class Players extends React.Component<IPlayersProps, IPlayersState> {
    state = {}

    render() {
        const { players } = this.props
        const classes = ['view-Players', `layout-${players.length}`]

        return (<div className={classes.join(' ')}>
            {
                players.map((player: Player, idx: number) =>
                    <PlayerView
                        key={`player-${idx}`}
                        player={player}
                        active={idx === this.props.activePlayerIndex}/>)
            }
        </div>)
    }
}
