import Tfw from 'tfw'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './view/app'
import * as serviceWorker from './serviceWorker'

Tfw.Theme.register(
    "bang", {
        bg0: "#bd881d",
        bg3: "#fff2d9"
    }
)
Tfw.Theme.apply("bang")

ReactDOM.render(<App />, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
