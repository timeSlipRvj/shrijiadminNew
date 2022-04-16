import "./Header01.css";
import { IoIosArrowForward, IoIosHeart, IoMdGitCompare } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import "./Header03.css";
import { connect } from "react-redux";
import Login from "./Login/Login";
import Search from "./Search";
import Dropdown from "react-multilevel-dropdown";
import { MdPerson,MdMenu } from "react-icons/md";

class Header01 extends Component {
  state = {
    categories: [],
  };
  componentDidMount() {
    const { categories, categories2 } = this.state;
    const setCategories = (root) => {
      if (root.childrenCategory.length == 0) {
        return (
          <Dropdown.Item key={root._id}>
            <Link
              style={{ background: "transparent", color: "#1D1D1D" }}
              to={"/categories/" + root.name + "/" + root.url + "/" + root._id}
            >
              {root.name}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {root.childrenCategory.length > 0 ? (
                <IoIosArrowForward className="ForwardArrow" />
              ) : (
                ""
              )}
            </Link>
          </Dropdown.Item>
        );
      } else {
        return (
          <div className="d-flex" key={root._id}>
            <Link
              style={{ width: "80%" }}
              className={"dropdown-item"}
              to={"/categories/" + root.name + "/" + root.url + "/" + root._id}
            >
              {root.name}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Link>
            <Dropdown.Item>
              <IoIosArrowForward className="ForwardArrow" />

              {root.childrenCategory.length > 0 ? (
                <Dropdown.Submenu position={"right"}>
                  {root.childrenCategory.map((child, key) => {
                    return setCategories(child);
                  })}
                </Dropdown.Submenu>
              ) : (
                ""
              )}
            </Dropdown.Item>
          </div>
        );
      }
    };

    this.props.categories.forEach((category) => {
      let tempData = {};
      tempData.content = setCategories(category);
      categories.push(tempData);
    });
    this.setState({ categories });
  
  }

  render() {
    return (
      <div className="Header_one">
        <div className="Header_one_left d-flex align-items-center">
        <MdMenu color="#08E5A9"  style={{width: "2em", height: "2em"}}/>
          <Dropdown
            className=" category-dropdownbutton browseCat"
            position="right"
            title="Browse Categories &#8595;"
            onMouseOver={()=>{
              if(window.screen.width > 768 && !document.querySelector('[class*="Dropdown_menu__"]') )
              document.querySelector(".Dropdown_dropdown__14f0x button").click()
              }}

          >
            {this.state.categories.map((category, key) => {
              return category.content;
            })}
          </Dropdown>
        </div>

        <Search />
        <div className="Header_one_right">
          
          {this.props.user._id && (
            <React.Fragment>
              {this.props.compareProducts.length > 0 && 
          <Link to={"/compare/"+this.props.compareProducts.join("%2C")}>
          <div style={{ color: "#1D1D1D" }} className="cart">
          <IoMdGitCompare id="Heart" style={{ color: "#000"}} />
            <span id="count">{this.props.compareProducts.length}</span>
            <p>
              <span className="large_screen_text">&nbsp; Compare</span>
            </p>
          </div>
        </Link>
          }
              <Link to={{ pathname: "/profile", wishlistActive: true }}>
                <div style={{ color: "#1D1D1D" }} className="cart">
                <IoIosHeart id="Heart" />
                  <span id="count">{this.props.wishlist.length}</span>
                  <p>
                    <span className="large_screen_text">&nbsp; Wishlist</span>
                  </p>
                </div>
              </Link>
              <Link to="/cart">
                <div style={{ color: "#1D1D1D" }} className="cart">
                  <FiShoppingCart id="Cart" />
                  <span id="count">{this.props.cart.length}</span>
                  <p>
                    <span className="large_screen_text">&nbsp; Cart</span>
                  </p>
                </div>
              </Link>
            </React.Fragment>
          )}

          {this.props.user._id ? (
            <Link to="/profile">
              {/* <div className="image_user">
                <img
                  alt="Reload"
                  className="image_userimage"
                  src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                ></img>
              </div> */}
              <div className="imagevl mt-0">
                <span className="large_screen_text">
                  <MdPerson id="profile_icon" style={{ fontSize: "2.5em" }} />
                </span>
                <span className="small_screen_text">
                  <MdPerson id="profile_icon" />
                </span>
              </div>
            </Link>
          ) : (
            <Login />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.getCategories.categories,
    user: state.getUser.user,
    wishlist: state.userWishlist.wishlist,
    cart: state.userCart.cart,
    compareProducts: state.compareProducts.products
  };
};
export default connect(mapStateToProps)(Header01);
