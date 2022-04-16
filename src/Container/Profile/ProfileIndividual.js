import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"
import Header from '../Component/Header/Header'
import Header01 from '../Component/Header/Header01';
import './ProfileIndividual.css'
import { MdAccountCircle,MdShoppingBasket } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import PopularBox from '../Component/Boxes/PopularBox';
import Footer from '../Component/Footer/Footer'
import Complaint from './Complaint';
import PersonalInfo from './PersonalInfo';
import Wishlist from './Wishlist';
import AddressProfile from './AddressProfile';
import { logoutUser } from '../../Redux/Actions/UserActions'
import Loader from '../Loader/Loader';
import Orders from './Orders';

class ProfileIndividual extends Component {
    state = {
        redirect: false,
        tab: "personal"
    }
    componentDidMount() {
        if (this.props.location.wishlistActive) {
            // document.querySelector("#v-pills-messages-tab").click()
            this.setState({tab: "wish"})
        } if(this.props.location.ordersActive){
            // document.querySelector("#v-pills-orders-tab").click()
            this.setState({tab: "order"})
        }

    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <React.Fragment>
                <Header01></Header01>
                <Header></Header>
                <div className="Heading_about">
                    <p>PROFILE</p>
                    <hr />
                </div>
                <div className="profileOuterMainBOx">
                    <div className="firstboxprofile large_screen_text">
                        <div className="name_individual_Hi">
                            <div className="image_user1" ><img   alt='reload' style={{ cursor: 'pointer' }} src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img></div>
                            <div className="name_hi">
                                <p className="himessage">Hi,</p>
                                <p className="nameperson">{this.props.user["First Name"]}</p> 
                            </div>
                        </div>
                        <div className='orderboxsummary align-items-center'>
                            <MdShoppingBasket className='accountIcon'></MdShoppingBasket>
                            <p className="nav nav-pills m-0" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <button className="nav-link pillval my-0" id="v-pills-orders-tab" data-bs-toggle="pill" data-bs-target="#v-pills-orders" type="button" role="tab" aria-controls="v-pills-orders" aria-selected="false" onClick={(e) =>{this.setState({tab: "order"})}}>ORDERS</button>
                            </p>
                        </div>
                        
                        <div className='orderboxsummary1'>
                            <MdAccountCircle className='accountIcon'></MdAccountCircle>
                            <p>ACCOUNT SETTINGS</p>
                        </div>
                        <div className="settingcategory">
                            <div className="nav flex-column nav-pills me-3 navcolor" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <button className="nav-link  pillval profile_account_link" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={(e) =>{this.setState({tab: "personal"})}}>Personal Information</button>
                                <button className="nav-link pillval profile_account_link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false" onClick={(e) =>{this.setState({tab: "address"})}}>My Address</button>
                                <button className="nav-link pillval profile_account_link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false" onClick={(e) =>{this.setState({tab: "wish"})}}>My wishlist</button>
                                <button className="nav-link pillval profile_account_link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false" onClick={(e) =>{this.setState({tab: "complaint"})}}>My Complaints</button>
                            </div>
                        </div>
                        <div className='orderboxsummary1'>
                            <BiLogOut className='accountIcon'></BiLogOut>
                            <p onClick={()=>{
                                this.props.logoutUser()
                                this.setState({redirect: true})
                                }}>LOGOUT</p>
                        </div>
                    </div>
                    {/* Responsiveness */}
                    <div className="firstboxprofile_r small_screen_text">
                    <div className="name_individual_Hi">
                            <div className="image_user1" ><img   alt='reload' style={{ cursor: 'pointer' }} src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img></div>
                            <div className="name_hi mt-2">
                                <p className="himessage">Hi,</p>
                                <p className="himessage">{this.props.user["First Name"]}</p>
                            </div>
                        </div>
                        <div className="Order_Section" >
                            <MdShoppingBasket ></MdShoppingBasket>
                            <p className="nav nav-pills m-0 p-0" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <button className="nav-link pillval my-0" id="v-pills-orders-tab" data-bs-toggle="pill" data-bs-target="#v-pills-orders" type="button" role="tab" aria-controls="v-pills-orders" aria-selected="false" onClick={(e) =>{this.setState({tab: "order"})}}>ORDERS</button>
                            </p>
                        </div>
                        <div className="Account_Section dropdown" >
                            <MdAccountCircle className="mdAccountCircle"></MdAccountCircle>
                            <p className="dropdown-toggle p-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">ACCOUNT SETTINGS</p>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <div className="nav flex-row nav-pills me-3 navcolor" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <button className="nav-link pillval" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={(e) =>{this.setState({tab: "personal"})}}>Personal Information</button>
                                <button className="nav-link pillval" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false" onClick={(e) =>{this.setState({tab: "address"})}}>My Address</button>
                                <button className="nav-link pillval" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false" onClick={(e) =>{this.setState({tab: "wish"})}}>My wishlist</button>
                                <button className="nav-link pillval" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false" onClick={(e) =>{this.setState({tab: "complaint"})}}>My Complaints</button>
                            </div>
                        </div>
                        
                        </div>
                        <div className="Order_Section" >
                        <BiLogOut className='accountIcon'></BiLogOut>
                            <p onClick={()=>{
                                this.props.logoutUser()
                                this.setState({redirect: true})
                                }}>LOGOUT</p>
                        </div>
                    </div>
                    
                    {/* Responsiveness */}

                    <div className="secondBoxprofile">
                        <div className="tab-content" id="v-pills-tabContent">
                        {/* <div  className="tab-pane fade" id="v-pills-orders" role="tabpanel" aria-labelledby="v-pills-orders-tab">
                                <Orders/>
                            </div> */}
                            <div  className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                {this.state.tab == "personal" && <PersonalInfo/>}
                                {this.state.tab == "order" && <Orders/>}
                                {this.state.tab == "wish" && <Wishlist />}
                                {this.state.tab == "address" && <AddressProfile/>}
                                {this.state.tab == "complaint" && <Complaint />}
                            </div>
                            {/* <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                <AddressProfile/>
                            </div> */}
                            {/* <div  className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                <Wishlist/>
                            </div>
                            <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                <Complaint />
                            </div> */}
                        </div>
                    </div>
                </div >
                <PopularBox />
                <Footer></Footer>
            </React.Fragment >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userLoading: state.getUser.loading,
        user: state.getUser.user
    }
}
export default connect(mapStateToProps, { logoutUser })(ProfileIndividual)
