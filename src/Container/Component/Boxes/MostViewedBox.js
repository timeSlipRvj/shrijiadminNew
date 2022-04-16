import React, { Component } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BiCart } from "react-icons/bi";
import { siteUrl } from "../../../Utils/util";
import { Link } from "react-router-dom";
import {modifyCompare} from '../../../Redux/Actions/ProductActions'
import { connect } from "react-redux";
import { toast } from "react-toastify";
class MostViewedBox extends Component {
  state = {
    idx: 0,
  };
  // componentDidMount() {
  //   console.log(this.props.row.Tabs[0]);
  // }
  render() {
    return (
      <div>
        <div className="new_Arrivals">
          <p className="most_viewd_text">{this.props.row.Title}</p>
          <hr id="line_1"></hr>
          <div id="arrow_box">
            <IoIosArrowBack
              id="Arrow_forward"
              onClick={() => {
                this.setState({
                  idx:
                    this.state.idx == this.props.row.Tabs[0].Products.length - 1
                      ? 0
                      : this.state.idx + 1,
                });
              }}
            />
            <IoIosArrowForward
              id="Arrow_backward"
              onClick={() => {
                this.setState({
                  idx:
                    this.state.idx > 0
                      ? this.state.idx - 1
                      : this.props.row.Tabs[0].Products.length - 1,
                });
              }}
            />
          </div>
        </div>
        <div className="most_viewed_compare">
          <div className="image_box_second_one">
            <img
              src={
                this.props.row.Tabs[0].Products[this.state.idx].baseImage
                  ? siteUrl +
                    this.props.row.Tabs[0].Products[this.state.idx].baseImage
                      .image
                  : "https://via.placeholder.com/150"
              }
              alt="RELOAD"
            />
          </div>
          <div className="comparing_products_details">
            <Link
              className="compare_product_details_cat"
              to={
                "/categories/" +
                this.props.row.Tabs[0].Products[this.state.idx].categories[0]
                  .name +
                "/" +
                this.props.row.Tabs[0].Products[this.state.idx].categories[0]
                  .url +
                "/" +
                this.props.row.Tabs[0].Products[this.state.idx].categories[0]
                  ._id
              }
            >
              {this.props.row.Tabs[0].Products[this.state.idx].categories
                .length > 0
                ? this.props.row.Tabs[0].Products[this.state.idx].categories[0]
                    .name
                : ""}
            </Link>
            <p className="detail_of_product_comparing">
              {this.props.row.Tabs[0].Products[this.state.idx].name}
            </p>
            <div className="rating_product">
            <div className="star">
                <i
                  className={
                    this.props.row.Tabs[0].Products[this.state.idx].rating > 0
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
                <i
                  className={
                    this.props.row.Tabs[0].Products[this.state.idx].rating > 1
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
                <i
                  className={
                    this.props.row.Tabs[0].Products[this.state.idx].rating > 2
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
                <i
                  className={
                    this.props.row.Tabs[0].Products[this.state.idx].rating > 3
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
                <i
                  className={
                    this.props.row.Tabs[0].Products[this.state.idx].rating > 4
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
              </div>
              <p className="text_rating individual_text_rating">
                {this.props.row.Tabs[0].Products[this.state.idx].rating
                  ? this.props.row.Tabs[0].Products[this.state.idx].rating.toFixed(1)
                  : 0}
                ({this.props.row.Tabs[0].Products[this.state.idx].reviews} Ratings)
              </p>
            </div>
            {this.props.row.Tabs[0].Products[this.state.idx].specialPrice? <React.Fragment>
                <div className="mostview_det">
              <p className="mrp_text">MRP:</p>
              <p className="price_of_the_product">Rs {this.props.row.Tabs[0].Products[this.state.idx].price}</p>
            </div>
            <div className="mostview_det">
              <p className="mrp_text">Our Price:</p>
              <p className="price_of_the_product_after_discount">Rs {this.props.row.Tabs[0].Products[this.state.idx].specialPrice
                        ? this.props.row.Tabs[0].Products[this.state.idx].specialPriceType == "Fixed"
                          ? this.props.row.Tabs[0].Products[this.state.idx].specialPrice
                          : this.props.row.Tabs[0].Products[this.state.idx].price.toString() -
                            (this.props.row.Tabs[0].Products[this.state.idx].specialPrice.toString() /
                              100) *
                              this.props.row.Tabs[0].Products[this.state.idx].price.toString()
                        : this.props.row.Tabs[0].Products[this.state.idx].price}</p>
            </div>
            </React.Fragment>:<div className="mostview_det">
              <p className="mrp_text">Our Price:</p>
              <p className="price_of_the_product_after_discount">Rs {this.props.row.Tabs[0].Products[this.state.idx].price}</p>
            </div>}
            {this.props.row.Tabs[0].Products[this.state.idx].specialPrice && <React.Fragment>
                <div className="mostview_det">
              <p className="mrp_text"> Discount:</p>
              <p
                className="how_much_discount"
                style={{ paddingBottom: "1.903vw" }}
              >
                {this.props.row.Tabs[0].Products[this.state.idx].specialPriceType == "Fixed"
                        ? Math.trunc(
                            ((this.props.row.Tabs[0].Products[this.state.idx].price -
                              this.props.row.Tabs[0].Products[this.state.idx].specialPrice) /
                              this.props.row.Tabs[0].Products[this.state.idx].price) *
                              100
                          )
                        : this.props.row.Tabs[0].Products[this.state.idx].specialPrice}% off
              </p>
            </div>
            <div className="mostview_det">
              <p className="mrp_text">You save:</p>
              <p className="discount_amount">Rs {this.props.row.Tabs[0].Products[this.state.idx].price - (
                        this.props.row.Tabs[0].Products[this.state.idx].specialPriceType == "Fixed"
                        ? this.props.row.Tabs[0].Products[this.state.idx].specialPrice
                        : this.props.row.Tabs[0].Products[this.state.idx].price -
                          (this.props.row.Tabs[0].Products[this.state.idx].specialPrice /
                            100) *
                            this.props.row.Tabs[0].Products[this.state.idx].price)}</p>
            </div>
                </React.Fragment>}
           
            <div className="buttons_compare">
                <Link to={"/product/"+this.props.row.Tabs[0].Products[this.state.idx].url+"/"+this.props.row.Tabs[0].Products[this.state.idx]._id}>
              <button className="cart_button m-0">
                <span className="large_screen_text">View Options</span>
                <span className="small_screen_text">View</span>
                <BiCart
                  style={{
                    // color: 'white',
                    marginLeft: "0.952vw",
                    marginTop: "-0.5vw",
                    // fontSize: '1.3vw'
                  }}
                  className="cart_icon_compare"
                  
                />
              </button>
              </Link>
              <button className="compare_button" onClick={(e)=>{
                    let arr = this.props.compareProducts
                    if(!arr.includes(this.props.row.Tabs[0].Products[this.state.idx]._id)){
                      arr.push(this.props.row.Tabs[0].Products[this.state.idx]._id)
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
                  }}>COMPARE</button>
            </div>
            <Link className="view_details" to={"/product/"+this.props.row.Tabs[0].Products[this.state.idx].url+"/"+this.props.row.Tabs[0].Products[this.state.idx]._id}>View details</Link>
          </div>
          <div className="image_box_second large_screen_text">
            <img
              src={
                this.props.row.Tabs[0].Products[this.state.idx].additionalImages
                  .length > 0
                  ? siteUrl +
                    this.props.row.Tabs[0].Products[this.state.idx]
                      .additionalImages[0].image
                  : "https://via.placeholder.com/150"
              }
              alt="RELOAD"
            />
            {/* <p className='discount_one'>10% off</p> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      compareProducts: state.compareProducts.products,
    };
  };
  export default connect(mapStateToProps, { modifyCompare })(MostViewedBox);