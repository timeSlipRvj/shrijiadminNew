import React, { Component } from "react";
import {Link} from "react-router-dom"
import { IoCloseCircleSharp } from "react-icons/io5";
import { connect } from "react-redux";
import {deleteFromWishlist} from "../../Redux/Actions/WishlistActions"
import { siteUrl} from '../../Utils/util'

class Wishlist extends Component {
  render() {
    return (
      <div className="tble_box1">
        <div className="scroll_x_box">
        <table className="col_names1">
          <tbody>
            <tr className="table_headingnew">
              <td className="product_image">
              <span className="large_screen_text">PRODUCT IMAGE</span>
              <span className="small_screen_text">IMAGE</span>
              </td>
              <td className="product_Name">
              <span className="large_screen_text">PRODUCT NAME</span>
              <span className="small_screen_text">NAME</span>
              </td>
              <td className="product_availnew">
              <span className="large_screen_text">AVAILABILITY</span>
              <span className="small_screen_text">AVAILABILITY</span>
              </td>
              <td className="product_codenew">
              <span className="large_screen_text">PRODUCT CODE</span>
              <span className="small_screen_text">CODE</span>
              </td>
              <td className="product_pricenew">
              <span className="large_screen_text">UNIT PRICE</span>
              <span className="small_screen_text">UNIT PRICE</span>
              </td>
              <td className="product_pricenew">
              <span className="large_screen_text">Remove</span>
              <span className="small_screen_text">Remove</span>
              </td>
            </tr>
            {this.props.wishlist.map((product, key) => {
              return <tr className="table_heading1" key={key}>
                <td className="product_image1">
                  <img
                    alt="reload"
                    src={product.baseImage && product.baseImage.image?siteUrl+product.baseImage.image: "https://via.placeholder.com/150"}
                  ></img>
                </td>
                <td className="product_Name1">
                  <p className="product_para_1">
                    {product.name}
                  </p>
                  {product.tags && product.tags.length > 0?
                  <p className="product_para_2"> {"Tags:" + product.tags.map((tag)=>{
                    return " "+tag.name
                  })} </p>
                  :""}
                  <Link to={"/product/"+product.url+"/"+product._id}><p className="product_para_3">View Detail</p></Link>
                </td>
                <td className="product_avail1new">{product.stockAvailability?"Available":"Out of Stock"}</td>
                <td className="product_code1">{product.SKU != ""? product.SKU: "--"}</td>
                <td className="product_price1new">Rs.{product.specialPrice?(product.specialPriceType == "Fixed"?product.specialPrice:((product.price).toString()-((product.specialPrice).toString()/100)*(product.price).toString())):product.price}</td>
                <td className="product_price1new">
                                    <IoCloseCircleSharp id="closeIcon" onClick={(e)=>{
                                      this.props.deleteFromWishlist(product._id)
                                    }}/>
                  </td>
              </tr>;
            })}
          </tbody>
        </table>
        </div>
        <div className="button_box_1new">
          <button id="continue_shopping"> <Link to="/shop" style={{color: "white"}}>Continue Shopping</Link></button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    wishlist: state.userWishlist.wishlist,
  };
};
export default connect(mapStateToProps, {deleteFromWishlist})(Wishlist);
