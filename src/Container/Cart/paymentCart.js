import React, { Component } from "react";
import Footer from "../Component/Footer/Footer";
import Header from "../Component/Header/Header";
import Header01 from "../Component/Header/Header01";
import "./paymentCart.css";
import "./PaymentNet.css";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import CreditCard from "./CreditCard";
import DebitCard from "./DebitCard";
import NetBank from "./NetBank";
import Wallet from "./Wallet";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import { getFeatures } from "../../Redux/Actions/StorefrontActions";
import { saveOrderDetails } from "../../Redux/Actions/OrderActions";
import {emptyCart} from '../../Redux/Actions/CartActions'
import Razorpay from "../../Utils/Razorpay";
import api from "../../Apis/api";
import { toast } from "react-toastify";
import { BiWindows } from "react-icons/bi";

class paymentCart extends Component {
  state = {
    paymentMethods: {
      CashonDelivery: {},
    },
    order: {
      data: {},
      ItemsOrdered: [],
      totalOrderAmount: "",
    },
    totalAmount: "",
  };
  componentDidMount() {
    this.props.getFeatures();
    this.setState({
      paymentMethods: this.props.settings.PaymentMethods,
      order: this.props.savedOrder,
    });
  }
  RazorpayCheckout = async () => {
    const res = await Razorpay.loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");

      return;
    }
    const user_id = "";
    const { totalOrderPrice } = this.state;
    const product_order_id = "";
    const result = await api.post("/payment/order", {
      user_id,
      product_order_id,
      amount: totalOrderPrice * 100,
      currency: "INR",
      receipt: `txn_order_${product_order_id}`,
    });

    if (!result) {
      alert("Server error. Are you online?");

      return;
    }

    const { amount, orderId: order_id, currency } = result.data;
    // console.log(order_id);
    const options = {
      key: "rzp_test_6qcb5x2Yt2yOUO", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Dandi March 2021",
      description: "Total checkout amount",
      order_id,
      handler: async (response) => {
        const data = {
          orderCreationId: order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
        if (
          typeof response.razorpay_payment_id == "undefined" ||
          response.razorpay_payment_id < 1
        ) {
          alert("payment failed");
        }

        console.log(response, "response");
        console.log(data, "");
        const result = await api.post(`/payment/update/${order_id}`, data);
        console.log(result);
        if (result.data.paymentStatus) {
          api
            .post(`/orders/${product_order_id}`, this.state.payload)
            .then(() => {
              console.log("here");
              alert("payment successful");
            })
            .catch((err) => {
              alert("payment unsuccessful");
            });
        } else {
          alert("payment unsuccessful");
        }
      },
      prefill: {
        name: this.state.name,
        email: this.state.email,
        contact: this.state.phone,
      },
      notes: {
        address: "Dandi March office",
      },
      theme: {
        color: "#cc6703",
      },
      modal: {
        ondismiss: () => {
          this.setState({ redirect: "/shop/cart" });
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  CODCheckout = () => {
    api
      .post("/order", {
        data: { ...this.state.order.data, PaymentMethod: "Cash on Delivery" },
        ItemsOrdered: this.state.order.ItemsOrdered,
      })
      .then((res) => {
        //console.log(res.data.data);
        toast.success(`Order Placed successfully!.`, {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        this.props.emptyCart()
        window.location.href = "/profile"
      })
      .catch((err) => {
        toast.error(
          `${
            err.response?.data?.message
              ? err.response.data.message
              : "Something went wrong."
          }`,
          {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      });
  };
  render() {
    if (this.props.featuresLoading || this.props.settingsLoading) {
      return <Loader />;
    } else
      return (
        <div>
          <Header01 />
          <Header />
          <div className="Heading_about">
            <p>PAYMENT</p>
            <hr />
          </div>
          <Link to="/cart">
            <div className="goblog">
              <IoIosArrowBack id="blog_icon" />
              <p>Back to cart</p>
            </div>
          </Link>
          <div className="outerpaymentbox">
            <div className="firstpaybox">
              <div className="total_head_no">
                <p>03.</p>
                <p>PAYMENT METHOD</p>
              </div>
              <div className="insidepay">
                <div
                  className="d-flex align-items-start"
                  style={{ width: "100%" }}
                >
                  <div
                    className="nav flex-column nav-pills me-3 nav1new"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                      {/* <button
                        className="nav-link active payment_css"
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-home"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                      >
                        CREDIT CARD
                      </button> */}
                    {/* <button
                      className="nav-link payment_css"
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      DEBIT CARD
                    </button> */}
                    {/* <button
                      className="nav-link payment_css"
                      id="v-pills-messages-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-messages"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-messages"
                      aria-selected="false"
                    >
                      NET BANKING
                    </button> */}
                    <button
                      className="nav-link payment_css"
                      id="v-pills-settings-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-settings"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-settings"
                      aria-selected="false"
                    >
                      WALLET/UPI
                    </button>
                    {this.state.paymentMethods.CashonDelivery.Status && (
                      <button
                        className="nav-link payment_css"
                        id="v-pills-cash-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-cash"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-cash"
                        aria-selected="false"
                      >
                        {this.state.paymentMethods.CashonDelivery.Label}
                      </button>
                    )}
                  </div>
                  <div className="tab-content" id="v-pills-tabContent">
                    <div
                      className="tab-pane fade "
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                    >
                      <CreditCard />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="v-pills-profile"
                      role="tabpanel"
                      aria-labelledby="v-pills-profile-tab"
                    >
                      <DebitCard />
                    </div>
                    <div
                      style={{ width: "34vw" }}
                      className="tab-pane fade"
                      id="v-pills-messages"
                      role="tabpanel"
                      aria-labelledby="v-pills-messages-tab"
                    >
                      <NetBank />
                    </div>
                    <div
                      style={{ width: "34vw" }}
                      className="tab-pane fade show active"
                      id="v-pills-settings"
                      role="tabpanel"
                      aria-labelledby="v-pills-settings-tab"
                    >
                      <Wallet />
                    </div>
                    {this.state.paymentMethods.CashonDelivery.Status && (
                      <div
                        style={{ width: "34vw" }}
                        className="tab-pane fade"
                        id="v-pills-cash"
                        role="tabpanel"
                        aria-labelledby="v-pills-cash-tab"
                      >
                        <div className="boxdetail">
                          <div className="netboxmain">
                            <p className="netbanking text-center py-2">
                              {
                                this.state.paymentMethods.CashonDelivery
                                  .Description
                              }
                            </p>
                          </div>
                          <button
                            className="paynow"
                            onClick={(e) => {
                              e.preventDefault();
                              this.CODCheckout();
                            }}
                          >
                            BUY NOW
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="secondpaybox">
              <div className="secondpay_1box">
                <p className="para1_pay">
                  Order for: {this.state.order.data? this.state.order.data.Receiver:""}
                </p>
                <span className="small_screen_text payline">|</span>
                <hr id="payline large_screen_text" />
                <div className="paymntbox_card">
                  <p>PAYMENT OF</p>
                  <p>
                    <b>Rs. {this.state.order.totalOrderAmount}</b>
                  </p>
                </div>
              </div>
              {this.props.allFeatures.Features &&
              this.props.allFeatures.Features.SectionStatus ? (
                <div className="Free_box d-block m-0 w-100">
                  {this.props.allFeatures.Features.Features.filter(
                    (feature) => {
                      if (
                        feature.Icon != "" &&
                        feature.SubTitle != "" &&
                        feature.Title != ""
                      )
                        return true;
                      return false;
                    }
                  ).map((feature, key) => {
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

          <Footer />
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    featuresLoading: state.getFeatures.loading,
    allFeatures: state.getFeatures.features,
    settings: state.getSettings.settings,
    settingsLoading: state.getSettings.loading,
    savedOrder: state.saveOrder.orderDetails,
  };
};
export default connect(mapStateToProps, { getFeatures, saveOrderDetails, emptyCart })(
  paymentCart
);
