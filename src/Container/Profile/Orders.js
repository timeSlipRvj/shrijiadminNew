import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { siteUrl } from "../../Utils/util";

class Orders extends Component {
  getdate = (time) => {
    var date = new Date(time);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };
  render() {
    return (
      <div className="tble_box1">
        <div className="scroll_x_box table-responsive">
          <table className="table table-borderless col_names1">
            <thead>
              <tr className="table_headingnew2">
              <th className="">
                  <span className="large_screen_text">ID</span>
                  <span className="small_screen_text">ID</span>
                </th>
                <th className="">
                  <span className="large_screen_text">PRODUCTS</span>
                  <span className="small_screen_text">PRODUCTS</span>
                </th>
                <th className="">
                  <span className="large_screen_text">ORDERED ON</span>
                  <span className="small_screen_text">ORDERED ON</span>
                </th>
                <th className="">
                  <span className="large_screen_text">STATUS</span>
                  <span className="small_screen_text">STATUS</span>
                </th>
                <th className="">
                  <span className="large_screen_text">PAYMENT METHOD</span>
                  <span className="small_screen_text">PAYMENT</span>
                </th>
                <th className="">
                  <span className="large_screen_text">TOTAL</span>
                  <span className="small_screen_text">TOTAL</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.orders.map((order, key) => {
                return (
                  <tr className="" key={key}>
                    <td className="product_price1new">{order._id}</td>
                    <td className="product_price1new">
                      <table>
                        <tbody>
                          {order.ItemsOrdered.map((item,key)=>{
                            return <tr key={key}>
                              <td>
                                {item.Product.name}
                              </td>
                            </tr>
                          })}
                       
                        </tbody>
                      </table>
                    </td>
                    <td className="product_price1new">
                      {this.getdate(order.createdAt)}
                    </td>
                    <td className="product_price1new">{order.Status}</td>
                    <td className="product_price1new">{order.PaymentMethod}</td>
                    <td className="product_price1new">{order.Total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Link to="/shop">
          <div className="button_box_1new">
            <button id="continue_shopping"> Continue Shopping</button>
          </div>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.userOrders.orders,
  };
};
export default connect(mapStateToProps)(Orders);
