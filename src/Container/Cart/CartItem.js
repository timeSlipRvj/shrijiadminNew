import React, { Component } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { IoAddCircleOutline, IoCloseCircleSharp } from "react-icons/io5";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFromCart, updateCartQty } from "../../Redux/Actions/CartActions";
import { siteUrl} from '../../Utils/util'

class CartItem extends Component {
  render() {
    // console.log(this.props.cart)
    return (
      <div className="tble_box">
        <div className="scroll_x_box">
          <table className="col_names">
            <tbody>
              <tr className="table_heading">
                <td className="product_image">
                  <span className="large_screen_text">PRODUCT IMAGE</span>
                  <span className="small_screen_text">IMAGE</span>
                </td>
                <td className="product_Name">
                  <span className="large_screen_text">PRODUCT NAME</span>
                  <span className="small_screen_text">NAME</span>
                </td>
                <td className="product_avail">AVAILABILITY</td>
                <td className="product_price">UNIT PRICE</td>
                <td className="product_quantity">QUANTITY</td>
                <td className="product_subtotal">SUBTOTAL</td>
                <td className="product_subtotal">Remove</td>
              </tr>
              {this.props.cart.map(({ product, qty, couponDiscount, totalPrice,stock }, key) => {
                return (
                  <tr className="table_heading1" key={key}>
                    <td className="product_image1">
                      <img
                        src={
                          product?.baseImage && product?.baseImage?.image
                            ? siteUrl + product?.baseImage.image
                            : "https://via.placeholder.com/150"
                        }
                        alt="Reload"
                      ></img>
                    </td>
                    <td className="product_Name1">
                      <p className="product_para_1">{product.name}</p>
                      {product.tags && product.tags.length > 0 ? (
                        <p className="product_para_2">
                          {" "}
                          {"Tags:" +
                            product.tags.map((tag) => {
                              return " " + tag.name;
                            })}{" "}
                        </p>
                      ) : (
                        ""
                      )}
                      {stock && stock.name ? (
                        <p className="product_para_2">
                          
                          {"Options: " + stock.name.split("-")}
                        </p>
                      ) : (
                        ""
                      )}
                      <Link to={"/product/" + product.url + "/" + product._id}>
                        <p className="product_para_3">View Detail</p>
                      </Link>
                    </td>
                    <td className="product_avail1">
                      {product.stockAvailability ? "Available" : "Out of Stock"}
                    </td>
                    <td className="product_price1">
                      Rs.
                      {product?.options?.length>0?stock.price?.toString():product.specialPrice
                        ? product.specialPriceType == "Fixed"
                          ? product.specialPrice
                          : product.price.toString() -
                          (product.specialPrice.toString() / 100) *
                          product.price.toString()
                        : product.price}
                    </td>
                    <td className="product_quantity1">
                      <FiMinusCircle id="minus_icon" onClick={(e) => {
                        if(qty-1 == 0){
                          this.props.deleteFromCart(product._id, stock && stock._id?stock._id:null, this.props.cart); 
                        }else
                          this.props.updateCartQty(product._id, qty - 1,stock && stock._id?stock._id:null, this.props.cart);
                      }} />
                      <p className="product_quant_para">{qty}</p>
                      <IoAddCircleOutline
                        id="add_icon"
                        onClick={(e) => {
                          this.props.updateCartQty(product._id, qty + 1, stock && stock._id?stock._id:null, this.props.cart);
                        }}
                      />
                    </td>
                    <td className="product_subtotal1">
                      <p className="product__sub_para">
                        Rs.{" "}
                        {totalPrice}
                           {couponDiscount && couponDiscount != 0 ? <span className="coupon-applied">applied</span>:""}
                      </p>
                    </td>
                    <td className="product_subtotal1">
                    <IoCloseCircleSharp
                        id="closeIcon"
                        onClick={(e) => {
                          this.props.deleteFromCart(product._id, stock && stock._id?stock._id:null, this.props.cart); 
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="button_box_1new">
        <Link to='/shop'>
          <button id="continue_shopping"> Continue Shopping</button>
        </Link>
        </div>
        
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.userCart.cart,
  };
};
export default connect(mapStateToProps, { deleteFromCart, updateCartQty })(
  CartItem
);
