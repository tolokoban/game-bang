import React from "react"
import Player from '../../player'
import Tools from '../../tools'

import "./player.css"
import BulletImage from './bullet.png'

interface IPlayerProps {
    player: Player
    active: boolean
}
interface IPlayerState { }

export default class PlayerView extends React.Component<IPlayerProps, IPlayerState> {
    state = {}

    render() {
        const { player, active } = this.props
        const classes = [
            'view-Player',
            active ? 'thm-bgPL' : 'thm-bgPD'
        ]
        console.info("player=", player)
        if (player.lives <= 0) {
            classes.push("dead")
        } else {
            classes.push("thm-ele-nav")
        }

        return (<div className={classes.join(' ')}>
            <header>
                <div className="name">{player.name}</div>
                <div className="bullets">{
                    Tools.range(1, player.maxLives).map(
                        life =>
                            <img
                                src={BulletImage}
                                className={
                                    life <= player.maxLives - player.lives ? "on" : "off"
                                }/>
                    )
                }</div>
            </header>
            <div className="body">
                <div className="thm-bg2 desc" style={{color: "#000"}}>{
                    player.description.join("\n")
                }</div>
            </div>
        </div>)
    }
}
