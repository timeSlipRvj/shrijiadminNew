import React, { Component } from "react";
import "./Compare.css";
import { Link, Redirect } from "react-router-dom";
import Header from "../Component/Header/Header";
import { BiCart } from "react-icons/bi";
import Footer from "../Component/Footer/Footer";
import FindByCategory from "../Component/Boxes/FindByCategory";
import Product from "../Component/Product";
import Header01 from "../Component/Header/Header01";
import PopularBox from "../Component/Boxes/PopularBox";
import api from "../../Apis/api";
import Loader from "../Loader/Loader";
import { modifyCompare } from "../../Redux/Actions/ProductActions";
import { connect } from "react-redux";
class Compare extends Component {
  state = {
    products: [],
    loading: true,
    redirect: false,
    url: "",
    attributes: [],
    values: {},
  };
  componentDidMount() {
    const { products, attributes, values } = this.state;
    if (this.props.match.params.products != "empty") {
      this.props.match.params.products.split("%2C").forEach((id) => {
        api
          .get("/product/get/" + id)
          .then((res) => {
            products.push(res.data.data);
            values[res.data.data._id] = {};
            res.data.data.attributes.forEach((attr) => {
              if (!attributes.includes(attr.attribute.name))
                attributes.push(attr.attribute.name);
              values[res.data.data._id][attr.attribute.name] = attr.value;
            });
            this.setState({ loading: false });
          })
          .catch((err) => {
            console.log(err);
            this.setState({ loading: false });
          });
      });
    } else {
      this.setState({ loading: false });
    }
    this.setState({ products, attributes, values });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.url} />;
    }
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <div>
        <Header01 />
        <Header />
        <div className="Heading_about compare">
          <p>COMPARE</p>
          <hr />
        </div>
        {this.props.match.params.products == "empty" ? (
          <div
            className="compare_container text-center justify-content-center p-4"
            style={{ fontSize: "24px" }}
          >
            <i>Add products to compare</i>
          </div>
        ) : (
          <div className="compare_container">
      
            <div className="top_compare">
              <div className="product_display_comparing">
                <div className="compare_box">
                  <div className="product">
                  <Product hidetop={true} visibility="hidden" />
                    {/* <div className="text">
                      <p className="contact_details_compare">
                        Connect to shop: <br /> +91-9809890982
                      </p>
                    </div> */}
                    {/* <Product hidetop={true} product={product}/> */}
                    <div className="specification_box_one">
                      <p className="p-2">Specifications</p>
                      <ul>
                        {this.state.attributes.map((attr, key) => {
                          return <li key={key}>{attr}</li>;
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {!this.state.loading &&
                this.state.products.map((product, key) => {
                  return (
                    <div className="product_display_comparing" key={key}>
                      <div className="compare_box">
                        <div className="product">
                          <Product hidetop={true} product={product} />
                          <div className="specification_box_one">
                          <p className="p-2">Specifications</p>
                            <ul>
                              {this.state.attributes.map((attr, key) => {
                                return (
                                  <li>
                                    {this.state.values[product._id][attr] !=
                                    undefined
                                      ? this.state.values[product._id][attr]
                                      : "--"}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="button_box">
                            <Link
                              to={"/product/" + product.url + "/" + product._id}
                            >
                              <button className="add_to_cart_compare">
                                <p>VIEW PRODUCT</p>
                                <BiCart
                                  style={{
                                    color: "white",
                                    marginLeft: "0.439vw",
                                    marginTop: "0.366vw",
                                  }}
                                />
                              </button>
                            </Link>
                            <button
                              id="remove_button"
                              onClick={(e) => {
                                let arr = this.props.compareProducts;
                                arr.splice(arr.indexOf(product._id), 1);
                                this.props.modifyCompare(arr);
                                let url;
                                if (arr.length > 0) {
                                  url = "/compare/" + arr.join("%2C");
                                } else {
                                  url = "/compare/empty";
                                }
                                this.setState({ url: url, redirect: true });
                              }}
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        <FindByCategory />
        <PopularBox />
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    compareProducts: state.compareProducts.products,
  };
};
export default connect(mapStateToProps, { modifyCompare })(Compare);
