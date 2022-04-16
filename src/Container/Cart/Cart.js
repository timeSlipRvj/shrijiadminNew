import './Cart.css'
import Footer from '../Component/Footer/Footer'
import Header from '../Component/Header/Header'
import Header01 from '../Component/Header/Header01';
import Product from '../Component/Product';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import Billinginfo from './Billinginfo';
import { Link } from 'react-router-dom';
import React, { Component } from 'react'
import CartItem from './CartItem';
import {connect} from 'react-redux'
import PopularBox from '../Component/Boxes/PopularBox';

class Cart extends Component {
    render() {
        return (
            <div>
                <Header01 />
                <Header></Header>
                <div className="Heading_about">
                    <p>CART</p>
                    <hr />
                </div>
                <p className='No_of_product'>{this.props.cart.length} Item(s)</p>
                <div className="total_items_cart">
                    <div className='total_head_no'>
                        <p>01.</p>
                        <p>TOTAL ITEMS</p>
                    </div>
                    <CartItem />
                </div>
                <Billinginfo />
            
                <div className="most_view_box">
                    <p className="most_viewd_text">RECENTLY VIEWED</p>
                    <hr id="line_view"></hr>
                    {/* <div id="arrow_box">
                        <IoIosArrowBack id="Arrow_forward" />
                        <IoIosArrowForward id="Arrow_backward" />
                    </div> */}
                </div>
                <div className="new_arrival_box">
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </div>
                <PopularBox/>
                <Footer></Footer>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      cart: state.userCart.cart,
    };
  };
export default connect(mapStateToProps)(Cart)
