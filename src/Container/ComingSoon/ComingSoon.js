import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaLinkedin } from "react-icons/fa";
import './ComingSoon.css'
import { IoConstruct } from "react-icons/io5";
import { MdLocalPhone, MdEmail } from "react-icons/md";
import React, { Component } from 'react'

export class ComingSoon extends Component {
    render() {
        return (
            <div className='outerComingPage'>
                <img alt ="Reload" src='https://images.unsplash.com/photo-1501163268664-3fdf329d019f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'></img>
                <img alt ="Reload" src='https://images.unsplash.com/photo-1611734828917-718f25babb2b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80'></img>
                <img alt ="Reload" src='https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'></img>
                <img alt ="Reload" src='https://images.unsplash.com/photo-1614696131965-cc559b1ecad1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80'></img>
                <div className="details_of_comingSoon" style={{ position: 'absolute' }}>
                    <div className='name__'>LOKOSTOP</div>
                    <div className='secondBoxComing'>
                        <p className="para_comingSoon">We promise best electronic gadgets of best brands with high assurance.</p>
                        <div className="Header_two_part3" style={{
                            marginTop: '0', width: '15.373vw',
                            height: ' 2.782vw',
                            display: 'grid', marginLeft: '12.445vw'
                        }}>
                            <div className="mobile_part" >
                                <p style={{ color: 'white' }}>+91-9898989898</p>
                                <MdLocalPhone id='phone' style={{ color: 'white' }} />
                            </div>
                            <div className="email_part">
                                <p style={{ color: 'white' }}>sidhuelectronics1@gmail.com</p>
                                <MdEmail id='mail' style={{ color: 'white' }} />
                            </div>
                        </div>
                    </div>

                    <p className="comingsoonheading">
                        COMING SOON
                    </p>
                    {/* <IoConstruct className='construct_icon' /> */}
                    <p className="para_comingSoon2">The website is under progress and will come to life soon. Stay up-to-date by following us on our  social media</p>
                    <div className='SocialMedia_links'>
                        <ul>
                            <li ><FaFacebook /></li>
                            <li ><FaInstagram /></li>
                            <li ><FaTwitter /></li>
                            <li ><FaPinterest /></li>
                            <li ><FaLinkedin /></li>
                        </ul>
                    </div>
                </div>
            </div >
        )
    }
}

export default ComingSoon
