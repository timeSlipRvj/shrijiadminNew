import './Header03.css'
import React, { Component } from 'react'

export class Header03 extends Component {
    render() {
        return (
            <div className="Header_three">
            <div className="header_three_left">
                <p style={{marginTop:'0.805vw'}}>Brands:</p>
                <div className="small_logo_box">
                    <ul>
                        <li><img src="https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg" alt="" /></li>
                        <li><img src="https://www.logo.wine/a/logo/Instagram/Instagram-Logo.wine.svg" alt="" /></li>
                        <li><img src="https://www.logo.wine/a/logo/Snapchat/Snapchat-Logo.wine.svg" alt="" /></li>
                        <li><img src="https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg" alt="" /></li>
                        <li><img src="https://www.logo.wine/a/logo/Instagram/Instagram-Logo.wine.svg" alt="" /></li>
                        <li><img src="https://www.logo.wine/a/logo/Snapchat/Snapchat-Logo.wine.svg" alt="" /></li>
                        <li><img src="https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg" alt="" /></li>
                        <li><img src="https://www.logo.wine/a/logo/McDonald's/McDonald's-Logo.wine.svg" alt="" /></li>
                        <li><img src="https://www.logo.wine/a/logo/McDonald's/McDonald's-Logo.wine.svg" alt="" /></li>
                        <li><img src="https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg" alt="" /></li>
                    </ul>
                </div>
            </div>
            <div className="header_three_center">
                <ul>
                    <li>Microwave</li>
                    <li>Washing Machine</li>
                    <li>Mobile & Tablet</li>
                    <li>Refrigerators</li>
                    <li>Television</li>
                    <li>Headphone</li>
                    <li>phone</li>
                    <li>Speaker</li>
                </ul>

            </div>
            
        </div>
        )
    }
}

export default Header03