import React, { Component } from 'react'
import './Loader.css'
export class Loader extends Component {
    render() {
        return (
            <div id="loader">
                <div id="shadow"></div>
                <div id="box"></div>
            </div>
        )
    }
}

export default Loader
