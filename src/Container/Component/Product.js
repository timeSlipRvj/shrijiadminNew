import { FaRegHeart } from "react-icons/fa";
import { BiGitCompare, BiCart } from "react-icons/bi";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addToWishlist } from "../../Redux/Actions/WishlistActions";
import {addToCart} from '../../Redux/Actions/CartActions'
import { connect } from "react-redux";
import { siteUrl} from '../../Utils/util'
import { toast } from "react-toastify";
import {modifyCompare} from '../../Redux/Actions/ProductActions'


class Product extends Component {
  state = {
    product: {
      price: 1000,
      specialPrice: 900,
      categories: [],
      options: [],
      name: "Product ABC",
      shortDescription: "This is a nice product",
    },
  };
  componentDidMount() {
    if (this.props.product) {
      this.setState({ product: this.props.product });
    }
  }

  render() {
    return (
      <div className={this.props.hidetop? "product_details2":"product_details_list"} style={{visibility: this.props.visibility?this.props.visibility:"auto"}}>
           <Link to={"/product/"+this.state.product.url+"/"+this.state.product._id}>
          <div className="image_box">
            {this.state.product.baseImage ? (
              <img
                src={
                  siteUrl +
                  this.state.product.baseImage.image
                }
                alt="RELOAD"
              />
            ) : (
              <img src="https://via.placeholder.com/200" alt="RELOAD" />
            )}

            {this.state.product.specialPrice != null && 
            this.state.product.specialPriceType == "Percent" ? (
              <p className="discount">{this.state.product.specialPrice}%off</p>
            ) : (
              this.state.product.specialPrice != null &&
              this.state.product.specialPriceType == "Fixed" ? (
              <p className="discount">
                {Math.trunc(
                  ((this.state.product.price -
                    this.state.product.specialPrice) /
                    this.state.product.price) *
                    100
                )}
                %off
              </p>
            ) : (
              ""
            )
            )}
         
          </div>
        </Link>
        <div className="add_to_cart_box">
          {this.props.hidetop? "":
          <div id="div_first" className="add_to_cart_inner_box">
            <BiGitCompare className="Compare_Icon compare-icon" onClick={(e)=>{
              let arr = this.props.compareProducts
              if(!arr.includes(this.state.product._id)){
                arr.push(this.state.product._id)
                this.props.modifyCompare(arr);
              }else{
                toast.error(
                  "Already added for comparing.",
                  {
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  }
                );
              }
            }}/>
            { this.state.product.options.length>0 ?  <Link to={"/product/"+this.state.product.url+"/"+this.state.product._id}><div className="add_to_cart_text_icon" >
              <p >
              <span className="large_screen_text">VIEW OPTIONS</span>
              <span className="small_screen_text">VIEW</span>
              </p>
              <BiCart className="Bicartnew" />
            </div></Link>:
            <div className="add_to_cart_text_icon" onClick={(e)=>{
              if(this.props.user.ID)
                this.props.addToCart(this.state.product._id, 1, null, this.props.cart);
                else
                document.getElementById("pfp").click();

            }}>
              <p >
              <span className="large_screen_text">ADD TO CART</span>
              <span className="small_screen_text">ADD</span>
              </p>
              <BiCart className="Bicartnew" />
            </div>
  }
            <FaRegHeart
              className="Fav_icon wishlist-icon"
              style={{ color: "#9d9d9d" }}
              onClick={(e) => {
                if(this.props.user.ID)
                this.props.addToWishlist(this.state.product._id);
                else
                document.getElementById("pfp").click();
              }}
            />
          </div>}
        </div>
        <div className="product_details">
        <div className="category_name_product_box">
          {this.props.category
            ? this.state.product.categories.slice(0,2).map((category, key) => {
                return (
                  
                  <Link
                    key={key}
                    to={"/categories/" +category.name + "/" + category.url + "/" + category._id}
                  >
                    <p className="category_name_product">{category.name}</p>{" "}
                  </Link>
                  
                );
              })
            : ""}
            </div>

          <Link to={"/product/"+this.state.product.url+"/"+this.state.product._id}>
            <p className="name_details_each_product">
              {this.state.product.name.length > 40?this.state.product.name.slice(0,40)+ "...":this.state.product.name}
              <br />
              {this.state.product.shortDescription? this.state.product.shortDescription: <span style={{visibility: "hidden"}}>space</span>}
            </p>
            <div className="price_of_product">
              {this.state.product.specialPrice != null &&
              this.state.product.specialPrice ? (
                <React.Fragment>
                  <p className="para_price_one">₹ {this.state.product.price}</p>
                  <p className="para_price_two">
                    ₹ {this.state.product.specialPriceType == "Fixed"
                          ? this.state.product.specialPrice
                          : this.state.product.price.toString() -
                            (this.state.product.specialPrice.toString() /
                              100) *
                              this.state.product.price.toString()}
                  </p>
                </React.Fragment>
              ) : (
                <p className="para_price_two">₹ {this.state.product.price}</p>
              )}
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    wishlist: state.userWishlist.wishlist,
    cart: state.userCart.cart,
    compareProducts: state.compareProducts.products,
    user: state.getUser.user
  };
};
export default connect(mapStateToProps, { addToWishlist,addToCart, modifyCompare })(Product);
