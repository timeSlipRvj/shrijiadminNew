import "./Billinginfo.css";
import StateDropdown from "./StateDropdown";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { saveOrderDetails } from "../../Redux/Actions/OrderActions";
import api from "../../Apis/api";
import Loader from "../Loader/Loader";
import Validate from '../../Utils/Validation'
class Billinginfo extends Component {
  state = {
    data: {
      Address: [
        {
          AddressLine1: "",
          AddressLine2: "",
          Country: "",
          State: "",
          City: "",
          Pin: "",
        },
      ],
    },
    sendData: {
      Phone: "",
      Email: "",
      Receiver: "",
      Status: "Pending Payment",
      Address: {
        BillingAddress: {},
        ShippingAddress: {},
      },
      ShippingMethod: "",
      ShippingPrice: 0,
      Discount: 0,
    },
    selected: -1,
    selectedAddress: {
      Name: "",
      AddressLine1: "",
      AddressLine2: "",
      Country: "",
      State: "",
      City: "",
      Pin: "",
    },
    coupon: "",
    shippingMethods: {
      FreeShipping:{},
      LocalPickup:{},
      FlatRate:{}
    },
    redirect: false,
    errors:[]
  };
  componentDidMount() {
    let address = this.props.user.Address ? this.props.user.Address : [];
    if (address.length == 0) {
      address = this.state.data.Address;
    }
    if(this.props.savedOrder.data){
      this.setState({sendData: this.props.savedOrder.data, selectedAddress: this.props.savedOrder.data.Address.ShippingAddress})
    }
    this.setState({ data: { ...this.props.user, Address: address }, shippingMethods: this.props.settings.ShippingMethods },()=>{

      this.getShipping()
    });
  }
  getSubtotal = () => {
    let sum = 0;
    this.props.cart.forEach((item) => {
      sum += item.totalPrice;
    });
    // this.setState({subtotal: sum })
    return sum;
  };
  getSavings = () =>{
    let total = 0;
    this.props.cart.forEach((item)=>{
      total+=item.product.price*item.qty
    })
    return total
  }
  getShipping = () =>{
    if(this.state.shippingMethods.FreeShipping.Status && (this.getSubtotal() > this.state.shippingMethods.FreeShipping.MinimumAmount)){
      this.setData("ShippingPrice", 0)
      this.setData("ShippingMethod", "Free Shipping")
    } 
    else if(this.state.shippingMethods.LocalPickup.Status){
      this.setData("ShippingPrice", this.state.shippingMethods.LocalPickup.Cost)
      this.setData("ShippingMethod", "Local Pickup")
    }
    else if(this.state.shippingMethods.FlatRate.Status){
      this.setData("ShippingPrice", this.state.shippingMethods.FlatRate.Cost)
      this.setData("ShippingMethod", "Flat Rate")
    }
  }
  setAddress = (key, value) => {
    const { selectedAddress } = this.state;
    selectedAddress[key] = value;
    this.setState({ selectedAddress, selected: -2 });
  };
  setData = (key, value) => {
    const { sendData } = this.state;
    sendData[key] = value;
    this.setState({ sendData });
  };
  checkCouponSingle = (code, productId) => {
    api
      .post("/coupon/valid", { code, productId })
      .then((res) => {
        // console.log(res.data.data);
        return res.data.data
      })
      .catch((err) => {
        console.log(err);
        return "invalid"
      });
  };
  checkCouponAll = () => {
    this.props.cart.forEach((item) => {
      let coupon =  this.checkCouponSingle(this.state.coupon, item.product._id);
      console.log(coupon);
      if(coupon != "invalid"){
        console.log("valid!")
      }
    });
  };
  temporaryOrderSave = () => {
    const { sendData } = this.state;
    sendData.Address.BillingAddress = this.state.selectedAddress;
    sendData.Address.BillingAddress.Name = this.state.sendData.Receiver
    sendData.Address.ShippingAddress = this.state.selectedAddress;
    sendData.Address.ShippingAddress.Name = this.state.sendData.Receiver

    this.setState({ sendData }, () => {
      this.props.saveOrderDetails({ ...this.props.savedOrder, data: sendData });
    });
  };
  render() {
    if(this.state.redirect){
      return <Redirect to="/payment"/>
    }
    return (
      <React.Fragment>
        <div className="billinginfobox">
          <div className="total_head_no">
            <p>02.</p>
            <p>BILLING INFORMATION</p>
          </div>
          <div className="details_billing">
            <div className="detail_add_billing">
              <div className="first_bill_box">
                <p className="head_bill_reciever">Receiver details</p>
                <input
                  className="input_box"
                  type="text"
                  placeholder="Full Name"
                  name="Receiver"
                  value={this.state.sendData.Receiver}
                  onChange={(e) => {
                    this.setData(e.target.name, e.target.value);
                  }}
                />
                <input
                  className="input_box"
                  type="text"
                  placeholder="Phone Number"
                  name="Phone"
                  value={this.state.sendData.Phone}
                  onChange={(e) => {
                    this.setData(e.target.name, e.target.value);
                  }}
                />
                <input
                  className="input_box"
                  type="text"
                  placeholder="Email Address"
                  name="Email"
                  value={this.state.sendData.Email}
                  onChange={(e) => {
                    this.setData(e.target.name, e.target.value);
                  }}
                />
                <p className="check_box" style={{visibility: "hidden"}}>
                  <label className="containerCheck">
                    I want to get offers in my mail
                    <input type="checkbox"></input>
                    <span className="checkMark"></span>
                  </label>
                </p>
                <p className="check_box" style={{visibility: "hidden"}}>
                  <label className="containerCheck">
                    Save this information for future
                    <input type="checkbox"></input>
                    <span className="checkMark"></span>
                  </label>
                </p>
              </div>
              <div className="second_bill_box">
                <p className="head_bill_reciever">Receiver address</p>
                <div className="insidebox_secondbill">
                  <input
                    className="second_input_box"
                    type="text"
                    name="AddressLine1"
                    placeholder="Address (First Line)"
                    value={this.state.selectedAddress.AddressLine1}
                    onChange={(e) => {
                      this.setAddress(e.target.name, e.target.value);
                    }}
                  />
                  <input
                    className="second_input_box"
                    type="text"
                    placeholder="Address (SecondLine)"
                    name="AddressLine2"
                    value={this.state.selectedAddress.AddressLine2}
                    onChange={(e) => {
                      this.setAddress(e.target.name, e.target.value);
                    }}
                  />
                </div>
                <div className="insidebox_secondbill">
                  <input
                    className="second_input_box"
                    type="text"
                    name="City"
                    placeholder="City"
                    value={this.state.selectedAddress.City}
                    onChange={(e) => {
                      this.setAddress(e.target.name, e.target.value);
                    }}
                  />
                  <input
                    className="second_input_box"
                    type="text"
                    placeholder="state"
                    name="State"
                    value={this.state.selectedAddress.State}
                    onChange={(e) => {
                      this.setAddress(e.target.name, e.target.value);
                    }}
                  />
                  {/* <StateDropdown /> */}
                </div>
                <div className="insidebox_secondbill">
                  <input
                    className="second_input_box"
                    type="text"
                    name="Country"
                    placeholder="Country"
                    value={this.state.selectedAddress.Country}
                    onChange={(e) => {
                      this.setAddress(e.target.name, e.target.value);
                    }}
                  />
                  <input
                    className="second_input_box"
                    type="text"
                    placeholder="Pin"
                    name="Pin"
                    value={this.state.selectedAddress.Pin}
                    onChange={(e) => {
                      this.setAddress(e.target.name, e.target.value);
                    }}
                  />
                </div>
                {/* <p className="check_box">
                                <label className="containerCheck">
                                Set this as my default address
                                <input type="checkbox"></input>
                                <span className="checkMark"></span>
                                </label>
                            </p> */}
                <hr id="bill_line" className="w-100 mt-1" />
                <p className="head_bill_reciever">Or choose one from below</p>
                {this.state.data.Address.map((address, key) => {
                  return (
                    <div className="form-check " style={{paddingLeft: "2.5em"}} key={key}>
                      <input
                        className="form-check-input colorradio"
                        type="radio"
                        name="flexRadioDefault"
                        id={"flexRadioDefault1" + key}
                        checked={this.state.selected == key ? true : false}
                        onChange={(e) => {
                          this.setState({
                            selectedAddress: address,
                            selected: key,
                          });
                        }}
                      />
                      <label
                        className="form-check-label fontP"
                        htmlFor={"flexRadioDefault1" + key}
                      >
                        {address.AddressLine1 +
                          ", " +
                          address.AddressLine2 +
                          ", " +
                          address.City +
                          ", " +
                          address.State +
                          ", " +
                          address.Country +
                          "- " +
                          address.Pin}
                      </label>
                    </div>
                  );
                })}
                <div className="finaladdress mt-3">
                  {this.state.selected == -1 && !this.props.savedOrder.data? (
                    <p>Your address will be shown here..</p>
                  ) : (
                    
                    <React.Fragment>
                      <p>{this.state.selectedAddress.AddressLine1}</p>
                      <p>{this.state.selectedAddress.AddressLine2}</p>
                      <p>
                        {this.state.selectedAddress.City}{this.state.selectedAddress.City && ", "}
                        {this.state.selectedAddress.State}{this.state.selectedAddress.State && ", "}
                        {this.state.selectedAddress.Country}
                      </p>
                      <p>{this.state.selectedAddress.Pin}</p>
                    </React.Fragment>
                  )}
                </div>
                <button
                  className="save_cont_billing"
                  onClick={(e) => {
                    this.temporaryOrderSave();
                  }}
                >
                  Save
                </button>
              </div>
              <div className="third_bill_box">
                <div className="cart_thirdbox_end">
                  <div className="billing_third">
                    <div className="inside_box_third">
                      <p className="para1_insidethird">Subtotal</p>
                      <p className="para2_insidethird">
                        Rs. {this.getSubtotal()}
                      </p>
                    </div>
                    <div className="inside_box_third">
                      <p className="para1_insidethird">Shipping Cost</p>
                      <p className="para2_insidethird">
                        Rs. {this.state.sendData.ShippingPrice}
                      </p>
                    </div>
                    {/* <div className="inside_box_third">
                      <p className="para1_insidethird">Transportation Cost</p>
                      <p className="para2_insidethird">
                        Rs. {this.state.sendData}
                      </p>
                    </div> */}
                    <div className="inside_box_third">
                      <p className="para1_insidethird">Your Savings</p>
                      <p
                        className="para2_insidethird"
                        style={{ color: "#08E5A9" }}
                      >
                        Rs. {this.getSavings()-this.getSubtotal()}
                      </p>
                    </div>
                  </div>
                  <div className="billing_third">
                    <div className="discountbox">
                      <input
                        type="text"
                        className="discountcode"
                        placeholder="Discount Code"
                        value={this.state.coupon}
                        onChange={(e) => {
                          this.setState({ coupon: e.target.value });
                        }}
                      />
                      <p
                        className="applycode"
                        onClick={(e) => {
                          this.checkCouponAll();
                        }}
                      >
                        Apply
                      </p>
                    </div>
                    <div className="inside_box_third">
                      <p className="para1_insidethird">Discount</p>
                      <p className="para2_insidethird">Rs. 0</p>
                    </div>
                  </div>
                </div>
                <hr id="bill_line" />
                <div className="inside_box_third">
                  <p
                    className="para1_insidethird"
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    GRAND TOTAL
                  </p>
                  <p
                    className="para2_insidethird"
                    style={{ fontWeight: "bold" }}
                  >
                    Rs. {this.getSubtotal()+ this.state.sendData.ShippingPrice-this.state.sendData.Discount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="buttons_cart_continue">
          <button className="button_blog_one"><Link to="/shop" style={{color: "#08e5a9"}}> Continue Shopping</Link></button>
          {/* <Link to="/payment"> */}
            <button
              className="button_blog_two"
              onClick={(e) => {
                e.preventDefault()
                this.temporaryOrderSave();
                let items = []
                this.props.cart.forEach(item=>{
                  let tmp = {}
                  tmp.ProductId = item.product._id
                  tmp.Quantity = item.qty
                  tmp.StockId = item.stock && item.stock._id?item.stock._id:null
                  items.push(tmp)
                })
                const {errors, sendData} = this.state
                let required = ["Phone", "Email", "Receiver"]
                required.forEach(val=>{
                  if (!errors.includes(val) && !Validate.validateNotEmpty(sendData[val])) {
                    errors.push(val);
                    this.setState({ errors });
                  } else if (
                    errors.includes(val) &&
                    Validate.validateNotEmpty(sendData[val])
                  ) {
                    errors.splice(errors.indexOf(val), 1);
                    this.setState({ errors });
                  }
                })
                let addressreq = ["AddressLine1", "AddressLine2", "Country", "State", "City", "Pin"]
                addressreq.forEach(val=>{
                  if (!errors.includes(val) && !Validate.validateNotEmpty(sendData.Address.BillingAddress[val])) {
                    errors.push(val);
                    this.setState({ errors });
                  } else if (
                    errors.includes(val) &&
                    Validate.validateNotEmpty(sendData.Address.BillingAddress[val])
                  ) {
                    errors.splice(errors.indexOf(val), 1);
                    this.setState({ errors });
                  }
                })
                if(errors.length == 0){
                  this.props.saveOrderDetails({ ...this.props.savedOrder, ItemsOrdered: items,totalOrderAmount: this.getSubtotal()+ this.state.sendData.ShippingPrice-this.state.sendData.Discount });
                  if(this.props.cart.length>0)
                  { 
                  this.setState({redirect: true})
                  }
                }
                
              }}
            >
              Proceed to Payment
            </button>
          {/* </Link> */}
        </div>
        {this.state.errors.length > 0 && <div className="alert alert-danger text-center m-3">Please fill the following: {this.state.errors.join(", ")}</div>}
      </React.Fragment>
    );
  } 
}

const mapStateToProps = (state) => {
  return {
    user: state.getUser.user,
    userLoading: state.getUser.loading,
    savedOrder: state.saveOrder.orderDetails,
    cart: state.userCart.cart,
    settings: state.getSettings.settings,
  };
};
export default connect(mapStateToProps, { saveOrderDetails })(Billinginfo);
