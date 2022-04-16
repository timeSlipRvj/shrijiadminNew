import { BiCart } from "react-icons/bi";
import {withRouter, Redirect} from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../Redux/Actions/CartActions";
import { siteUrl } from "../../Utils/util";
import api from '../../Apis/api'
import Loader from "../Loader/Loader";
import {modifyCompare} from '../../Redux/Actions/ProductActions'
import { toast } from "react-toastify";
class IndividualProductDetails extends Component {
  state = {
    loading: true,
    productId: this.props.productDetails._id,
    qty: 1,
    footerDetails: {
      Footer: {
        AcceptedPaymentMethodsImage: "",
      },
    },
    stock: [],
    selectedStockArray:[],
    start: 0,
    stockId: null,
    stockPrice: -1,
    selectedImage: "",
    redirect: false,
    category: {}
  };

   componentDidMount() {
    const {stock } = this.state
    
     api.post('/product/stock/byproduct/get', {productId: this.props.match.params.id}).then(res=>{
      res.data.data.forEach(stk=>{
        stock[stk.name] = [stk.qty,stk.price,stk._id] 
      })
      //console.log(stock)
    }).catch(err=>{
      console.log(err)
      this.setState({loading: false})
    })

    this.setState({
      stock,
      footerDetails: this.props.footerData.Footer
        ? this.props.footerData
        : this.state.footerDetails,
        loading: false,
    });
    // console.log(this.props.productDetails.additionalImages)
  }
  setStock = () =>{
    //console.log(this.state.stock)
    let id = ""
    let price = -1
    var arr = Array.from(this.state.selectedStockArray)
    for(var i = 0; i < arr.length; i++) {
      if(Array.isArray(arr[i])){
        if(arr.length == 0){
          
        }
        else if(arr[i].length ==1){
          arr[i] = arr[i][0]
        }else
          arr[i] = arr[i].join("-")
      }
    }
    arr = arr.join("-").split("-").sort().filter(ele=>ele != "")
    //console.log(arr)
    for(var key of Object.keys(this.state.stock)){
      let temparr = key.split("-").sort()
      if(arr.length < temparr.length){
        temparr = temparr.slice(0, arr.length)
        if(this.arrayEquals(arr, temparr)){
          id = this.state.stock[key][2]
          price = this.state.stock[key][1]
        }
      }else if(arr.length == temparr.length && this.arrayEquals(arr, temparr)){
          id = this.state.stock[key][2]
          price = this.state.stock[key][1]

      }else{
        arr = arr.slice(0, temparr.length)
        if(this.arrayEquals(arr, temparr)){
          id = this.state.stock[key][2]
          price = this.state.stock[key][1]
        }
      }
      
    }
    this.setState({stockId: id, stockPrice: price})
  }
  getOption = (type, label, required, values, unique) => {
    if (type == "Field") {
      return (
        <div className="save_box individual_save_box" key={unique} >
          <p className="save_text individual_save_text">
            {" "}
            {label}: {required && "*"}
          </p>
          <input className="product-qty individual_product-qty  product-input" type="text" />
        </div>
      );
    } else if (type == "Textarea") {
      return (
        <div
          className="save_box individual_save_box individual_save_column "
          key={unique}
        >
          <p className="save_text individual_save_text">
            {" "}
            {label}: {required && "*"}
          </p>
          <textarea
            className="product-qty individual_product-qty  product-input"
            type="text"
            row="3"
          ></textarea>
        </div>
      );
    } else if (type == "Dropdown") {
      return (
        <div className="save_box individual_save_box" key={unique}>
          <p className="save_text individual_save_text">
            {" "}
            {label}{required && "*"}
          </p>
          <select className="dropdown_colors individual_dropdown_colors product-input" onChange={(e)=>{
            const {selectedStockArray} = this.state
            selectedStockArray[unique] = e.target.value
            // console.log(selectedStockArray)
            this.setState({selectedStockArray},()=>this.setStock())
          }}>
            <option value="">Please select</option>
            {values.map((value, key) => {
              return (
                <option value={value.label} key={key}>
                  {value.label}
                </option>
              );
            })}
          </select>
        </div>
      );
    } else if (type == "Checkbox") {
      return <div className="save_box individual_save_box" key={unique}>
          <p className="save_text individual_save_text">
            {" "}
            {label}: {required && "*"}
          </p>
          <div className="d-flex checkbox-flex" style={{height: '100%', marginLeft: '0.9vw'}}>
            {values.map((value, key) => {
              return (
                <div className="d-flex p-1 justify-content-center align-items-center" key={key}>
                <input type="checkbox" onChange={(e)=>{
                  const {selectedStockArray} = this.state
                  if(selectedStockArray[unique] == undefined ){
                    selectedStockArray[unique] = []
                  }
                  if(selectedStockArray[unique][key] == value.label){
                    selectedStockArray[unique].splice(key,1)
                  }else
                    selectedStockArray[unique][key] = value.label
                  // console.log(selectedStockArray)
                  this.setState({selectedStockArray},()=>this.setStock())
                }}>
                </input>
                <label>{value.label}</label>
                </div>
              );
            })}
          </div>
        </div>
    } else if (type == "Custom Checkbox") {
      return <div className="save_box individual_save_box" key={unique}>
          <p className="save_text individual_save_text">
            {" "}
            {label}: {required && "*"}
          </p>
          <div className="d-flex checkbox-flex" style={{height: '100%', marginLeft: '0.9vw'}}>
            {values.map((value, key) => {
              return (
                <div className="d-flex p-1 justify-content-center align-items-center" key={key}>
                <input type="checkbox" onChange={(e)=>{
                  const {selectedStockArray} = this.state
                  if(selectedStockArray[unique] == undefined ){
                    selectedStockArray[unique] = []
                  }
                  if(selectedStockArray[unique][key] == value.label){
                    selectedStockArray[unique].splice(key,1)
                  }else
                    selectedStockArray[unique][key] = value.label
                  // console.log(selectedStockArray)
                  this.setState({selectedStockArray})
                }}>
                </input>
                <label>{value.label}</label>
                </div>
              );
            })}
          </div>
        </div>
    } else if (type == "Radio Button") {
      return <div className="save_box individual_save_box" key={unique}>
      <p className="save_text individual_save_text">
        {" "}
        {label}: {required && "*"}
      </p>
      <div className="d-flex checkbox-flex" style={{height: '100%', marginLeft: '0.9vw'}}>
        {values.map((value, key) => {
          return (
            <div className="d-flex p-1 justify-content-center align-items-center" key={key}>
            <input type="radio" name={label} onChange={(e)=>{
              const {selectedStockArray} = this.state
              selectedStockArray[unique] = value.label
              // console.log(selectedStockArray)
              this.setState({selectedStockArray},()=>this.setStock())
            }}>
            </input>
            <label>{value.label}</label>
            </div>
          );
        })}
      </div>
      </div>
 
    } else if (type == "Custom Radio Button") {
      return <div className="save_box individual_save_box" key={unique}>
      <p className="save_text individual_save_text">
        {" "}
        {label}: {required && "*"}
      </p>
      <div className="d-flex checkbox-flex" style={{height: '100%', marginLeft: '0.9vw'}}>
        {values.map((value, key) => {
          return (
            <div className="d-flex p-1 justify-content-center align-items-center" key={key}>
            <input type="radio" name={label} onChange={(e)=>{
              const {selectedStockArray} = this.state
              selectedStockArray[unique] = value.label
              // console.log(selectedStockArray)
              this.setState({selectedStockArray},()=>this.setStock())
            }}>
            </input>
            <label>{value.label}</label>
            </div>
          );
        })}
      </div>
      </div>
    } else if (type == "Multiple Select") {
    } else if (type == "Date") {
      return (
        <div className="save_box individual_save_box" key={unique} >
          <p className="save_text individual_save_text">
            {" "}
            {label}: {required && "*"}
          </p>
          <input className="product-qty individual_product-qty  product-input" type="date" />
        </div>
      );
    } else if (type == "Date Time") {
      return (
        <div className="save_box individual_save_box" key={unique} >
          <p className="save_text individual_save_text">
            {" "}
            {label}: {required && "*"}
          </p>
          <input className="product-qty individual_product-qty  product-input" type="datetime-local" />
        </div>
      );
    } else if (type == "Time") {
      return (
        <div className="save_box individual_save_box" key={unique} >
          <p className="save_text individual_save_text">
            {" "}
            {label}: {required && "*"}
          </p>
          <input className="product-qty individual_product-qty  product-input" type="time" />
        </div>
      );
    }
  };
   arrayEquals = (a, b) =>{
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }
  render() {
    if(this.state.redirect){
      return <Redirect to={"/categories/"+this.state.category.name + "/"+ this.state.category.url+"/"+this.state.category.id}/>
    }
    if(this.state.loading){
      return <Loader />
    }else
    return (
      <React.Fragment>
        <div className="Heading_about">
          <p>PRODUCT DETAILS</p>
          <hr />
        </div>
        <div className="individualproduct_detail_outer_box">
          {this.props.productDetails.additionalImages &&
          this.props.productDetails.additionalImages.length > 0 ? (
            <div className="similar_product_images">
              {this.state.start > 0 &&
              <IoIosArrowUp id="upIconNew"  onClick={(e) => {
                this.setState({start: this.state.start-1})
              }}/>
  }
              <div className="similar_image_three_image_box">
                {this.props.productDetails.additionalImages.slice(this.state.start, 1000).map(
                  (image, key) => {
                    return (
                      <img
                        key={key}
                        className="similar_particular_image"
                        src={siteUrl + image.image}
                        alt="RELOAD"
                        style={{cursor: "pointer"}}
                        onClick={(e) => {
                          this.setState({selectedImage: image.image})
                        }}
                      />
                    );
                  }
                )}
              </div>
                  {this.state.start + 4 < this.props.productDetails.additionalImages?.length &&
              <IoIosArrowDown
                id="upIconNew"
                style={{ marginTop: "1.684vw" }}
                onClick={(e) => {
                  this.setState({start: this.state.start+1})
                }}
              ></IoIosArrowDown>
  }
            </div>
          ) : (
            ""
          )}
          <div className="product_big_image_cart_compare">
            <img
              className="big_image"
              src={
                this.props.productDetails.baseImage
                  ? this.state.selectedImage == ""?siteUrl+this.props.productDetails.baseImage.image: siteUrl+this.state.selectedImage
                  : "https://via.placeholder.com/150"
              }
              alt="Loading"
            />
            <div
              className="buttons_compare individual_buttons_compare "
              style={{ marginTop: "1.025vw"}}
            >
              <button
                className="cart_button individual_cart_button w-100 m-0"
                onClick={async(e) => {
                  await this.setStock()
                  if(!this.props.user.ID)
                  document.getElementById("pfp").click();
                else
                  {if(this.props.productDetails.options.length > 0){

                    this.props.addToCart(
                      this.props.productDetails._id,
                      this.state.qty,
                      this.state.stockId,
                      this.props.cart
                    );
                  }else{
                    this.props.addToCart(
                      this.props.productDetails._id,
                      this.state.qty,
                       null,
                       this.props.cart
                    );
                  }
                }
                }}
              >
                <span className="large_screen_text ">ADD TO CART</span>
                <span className="small_screen_text individual_">ADD</span>{" "}
                <BiCart
                  className="individual_bicart"
                  style={{
                    // color: 'white',
                    marginTop: "-0.5vw",
                    fontSize: "1.3vw",
                  }}
                />
              </button>
              <button className="compare_button individual_compare_button" onClick={(e)=>{
                let arr = this.props.compareProducts
                if(!arr.includes(this.props.productDetails._id)){
                  arr.push(this.props.productDetails._id);
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
              }}>
                COMPARE
              </button>
            </div>
          </div>
          <div className="details_of_individual_product_with_rating">
            <p className="name_of_the_particular_product">
              {this.props.productDetails.name}
            </p>
            <div className="category_of_that_particular_product_box d-flex mb-3">
              {this.props.productDetails.categories.map((category, key) => {
                return (
                  <p className="category_of_that_particular_product" onClick={(e)=>{
                    this.setState({category : {url: category.url, id: category._id, name: category.name}},()=>{this.setState({redirect: true})})
                  }} key={key}>
                    {category.name}
                  </p>
                );
              })}
            </div>
            <div className="rating_product individual_rating_product">
              <div className="star">
                <i
                  className={
                    this.props.productDetails.rating > 0
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
                <i
                  className={
                    this.props.productDetails.rating > 1
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
                <i
                  className={
                    this.props.productDetails.rating > 2
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
                <i
                  className={
                    this.props.productDetails.rating > 3
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
                <i
                  className={
                    this.props.productDetails.rating > 4
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
              </div>
              <p className="text_rating individual_text_rating">
                {this.props.productDetails.rating
                  ? this.props.productDetails.rating.toFixed(1)
                  : 0}
                ({this.props.reviews.length} Ratings)
              </p>
            </div>
            <hr className="product_individual_detail_line" />
            <div className="details_box_margin">
              {this.props.productDetails.specialPrice ? (
                <React.Fragment>
                  <div className="save_box individual_save_box">
                    <p className="save_text individual_save_text">MRP:</p>
                    <p className="price_of_the_product individual_price_of_the_product">
                      {this.props.productDetails.price}
                    </p>
                  </div>
                  <div className="save_box individual_save_box">
                    <p className="save_text individual_save_text">
                      Our Price:
                    </p>
                    <p className="price_of_the_product_after_discount individual_price_of_the_product_after_discount">
                      Rs.{" "}
                      
                      {this.state.stockPrice == -1?this.props.productDetails.specialPrice
                        ? this.props.productDetails.specialPriceType == "Fixed"
                          ? this.props.productDetails.specialPrice
                          : this.props.productDetails.price.toString() -
                            (this.props.productDetails.specialPrice.toString() /
                              100) *
                              this.props.productDetails.price.toString()
                        : this.props.productDetails.price: this.state.stockPrice}
                    </p>
                  </div>
                </React.Fragment>
              ) : (
                <div className="rating_product">
                  <p className="save_text individual_save_text">MRP:</p>
                  <p className="price_of_the_product_after_discount individual_price_of_the_product_after_discount">
                    Rs. {this.props.productDetails.price}
                  </p>
                </div>
              )}
              {this.props.productDetails.specialPrice ? (
                <React.Fragment>
                  <div className="save_box individual_save_box">
                    <p className="save_text individual_save_text">
                      {" "}
                      Discount:
                    </p>
                    <p className="how_much_discount individual_how_much_discount">
                      {this.props.productDetails.specialPriceType == "Fixed"
                        ? Math.trunc(
                            ((this.props.productDetails.price -
                              this.props.productDetails.specialPrice) /
                              this.props.productDetails.price) *
                              100
                          )
                        : this.props.productDetails.specialPrice}
                      % OFF
                    </p>
                  </div>
                  <div className="save_box individual_save_box">
                    <p className="save_text individual_save_text">You save:</p>
                    <p className="discount_amount individual_discount_amount">
                      Rs{" "}
                      {this.state.stockPrice == -1?this.props.productDetails.price -
                        (this.props.productDetails.specialPriceType == "Fixed"
                        ? this.props.productDetails.specialPrice
                        : this.props.productDetails.price -
                          (this.props.productDetails.specialPrice /
                            100) *
                            this.props.productDetails.price): this.props.productDetails.price-this.state.stockPrice}
                    </p>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}

              {/* <div className="save_box">
                <p className="delivery_text">Delivery in:</p>
                <p className="time_delivery">10 days after ordering</p>
              </div> */}
              {this.props.productDetails.options.map((option, key) => {
                return this.getOption(
                  option.type,
                  option.name,
                  option.required,
                  option.value,
                  key
                );
              })}

              <div className="save_box individual_save_box individual_save_column">
                <p className="color_text individual_color_text"> Qty:</p>
                <input
                  className="product-qty individual_product-qty  product-input"
                  type="number"
                  step="1"
                  placeholder="1"
                  min="1"
                  value={this.state.qty}
                  onChange={(e) => {
                    this.setState({ qty: e.target.value });
                  }}
                />
              </div>
            </div>
            {this.props.productDetails.SKU != "" ? (
              <div className="save_box">
                <p
                  className="delivery_text"
                  style={{ width: "auto", marginLeft: "0" }}
                >
                  Product Code:
                </p>
                <p className="time_delivery">{this.props.productDetails.SKU}</p>
              </div>
            ) : (
              ""
            )}
            <div className="pay_via">
              <p
                className="save_text individual_save_text individual_pay_text"
                style={{ marginLeft: "-0.952vw", marginTop: "1.025vw" }}
              >
                Pay via:
              </p>
              {!this.props.footerLoading && (
                <div className="logo2pay">
                  <img
                    src={
                      siteUrl +
                      this.state.footerDetails.Footer
                        .AcceptedPaymentMethodsImage.image
                    }
                    alt="Reload"
                  />
                </div>
              )}
            </div>
            {!this.props.featuresLoading &&
            this.props.allFeatures.Features &&
            this.props.allFeatures.Features.SectionStatus ? (
              <div className="Free_box w-100 m-0">
                {this.props.allFeatures.Features.Features.filter((feature) => {
                  if (
                    feature.Icon != "" &&
                    feature.SubTitle != "" &&
                    feature.Title != ""
                  )
                    return true;
                  return false;
                }).map((feature, key) => {
                  return (
                    <div className="Free_Shipping" key={key}>
                      <i className={feature.Icon}></i>
                      <div className="shipping_text">
                        <p className="shipping_text1">{feature.Title}</p>
                        <p className="shipping_text2">{feature.SubTitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    footerData: state.getFooter.footerData,
    footerLoading: state.getFooter.loading,
    featuresLoading: state.getFeatures.loading,
    allFeatures: state.getFeatures.features,
    cart: state.userCart.cart,
    compareProducts: state.compareProducts.products,
    user: state.getUser.user
  };
};
export default connect(mapStateToProps, { addToCart, modifyCompare })(
  withRouter(IndividualProductDetails)
);
