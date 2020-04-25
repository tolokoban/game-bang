import React from "react"
import PlayersView from '../players'
import Player from '../../player'

import "./app.css"

interface IAppState {
    activePlayerIndex: number
    players: Player[]
}

export default class App extends React.Component<{}, IAppState> {
    state = {
        players: Player.getRandomPlayers(4),
        activePlayerIndex: 0
    }

    render() {
        const classes = ['view-App', 'thm-bg0']

        return (<div className={classes.join(' ')}>
            <PlayersView players={this.state.players} activePlayerIndex={this.state.activePlayerIndex}/>
        </div>)
    }
}
