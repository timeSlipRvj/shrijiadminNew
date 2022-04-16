import "./Header2.css";
import { MdLocalPhone, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../../Loader/Loader";
import Dropdown from "react-multilevel-dropdown";
import { IoIosArrowForward } from "react-icons/io";
import { siteUrl} from '../../../Utils/util'
import {Helmet} from "react-helmet";

class Header02 extends Component {
  state = {
    menus: [],
  };
  setMenuLink = (item) => {
    if (item.type == "URL") {
      return item.url;
    } else if (item.type == "Page") {
      return "/page/" + item.page.url;
    } else if (item.type == "Category") {
      let url =
        "/categories/" +
        item.category.name +
        "/" +
        item.category.url +
        "/" +
        item.category._id;
      return url;
    }
  };
  componentDidMount() {
    const { menus } = this.state;
    const setCategories = (root, key) => {
      if (root.childrenMenu.length == 0) {
        return (
          <Dropdown.Item key={root._id}>
            <Link
              style={{
                background: "transparent",
                color: "#1D1D1D",
                display: "flex",
                justifyContent: "space-between",
              }}
              className={"dropdown-item"}
              to={this.setMenuLink(root)}
            >
              {root.name}
            </Link>
          </Dropdown.Item>
        );
      } else
        return (
          <div key={root._id} className="d-flex ">
            <Link
              style={{
                background: "transparent",
                color: "#1D1D1D",
                display: "flex",
                justifyContent: "space-between",
              }}
              className={"dropdown-item"}
              to={this.setMenuLink(root)}
            >
              {root.name}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Link>


            <Dropdown.Item  >
          <IoIosArrowForward className="ForwardArrow" />

            {root.childrenMenu.length > 0 ? (
              <Dropdown.Submenu position={"right"}>
                {root.childrenMenu.map((child, key) => {
                  return setCategories(child)
                })}
             </Dropdown.Submenu>
            ) : (
              ""
            )}
          </Dropdown.Item>

          </div>
        );
    };
    !this.props.menuLoading && this.props.menus.PrimaryMenu.menuItems.forEach((menu, key) => {
      let tempData = { };
      if (menu.childrenMenu.length > 0) {
        tempData.content = []
        tempData.title = (
          <React.Fragment>
            <Link
              style={{
                background: "transparent",
                margin: "0.5em",
                color: "#1D1D1D",
              }}
              className="nav-link menu-link"
              to={this.setMenuLink(menu)}
            >
              {menu.name}
            </Link>

          </React.Fragment>
        );
        
        menu.childrenMenu.forEach((menuItem, key) => {
          tempData.content.push(setCategories(menuItem, key));
        });
      } else {
        tempData.title = (
          <Link
            style={{
              background: "transparent",
              color: "#1D1D1D",
              display: "flex",
              justifyContent: "space-between",
              margin: "0.5em"
            }}
            className="nav-link menu-link"
            to={this.setMenuLink(menu)}
          >
            {menu.name}
          </Link>
        );
      }
      // tempData.content = setCategories(menu);
      menus.push(tempData);
    });
    this.setState({ menus });
  }
  render() {
    if(this.props.menuLoading || this.props.settingsLoading){
      return <div></div>
    }
      return (
        <nav className="navbar navbar-expand-lg navbar-light  ">
           <Helmet>
           <link rel="icon" href={!this.props.logoLoading && this.props.logos && this.props.logos.Logo
                      ? siteUrl +
                        this.props.logos.Logo.Favicon.image :""} />
                            <link rel="apple-touch-icon" href={!this.props.logoLoading && this.props.logos && this.props.logos.Logo
                      ? siteUrl +
                        this.props.logos.Logo.Favicon.image :""}  />


                </Helmet>
          <div className="container-fluid">
            <a className="navbar-brand mx-3" href="/">
              <div className="logo">
                <img
                  src={
                    !this.props.logoLoading && this.props.logos && this.props.logos.Logo
                      ? siteUrl +
                        this.props.logos.Logo.HeaderLogo.image
                      : ""
                  }
                  height="40"
                  alt="Reload"
                />
              </div>
            </a>
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-content"
            >
              <div className="hamburger-toggle">
                <div className="hamburger">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </button>
            <div className="collapse navbar-collapse " id="navbar-content">
              <ul className="navbar-nav mr-auto mb-2 mb-lg-0 m-auto header2">
                {/* <li className="nav-item">
                  <Link to="/" className="nav-link ">
                    Home
                  </Link>
                </li> */}
                {this.state.menus.map((menu, key) => {
                  return (
                      <li className="nav-item dropdown d-flex align-items-center" key={key}>
                        {menu.title}
                        {menu.content && 
                        <Dropdown className=" category-dropdownbutton browseCat" position="right" title="&#8595;" >
                          {menu.content}
                        </Dropdown>}
                      </li>
                  );
                })}
                {/* <li className="nav-item">
                  <Link to="/sendquery" className="nav-link">
                    Send query
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Complaint
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/blogs" className="nav-link">
                    Blogs
                  </Link>
                </li> */}
              </ul>

              <div className="mx-3">
                <div className="mobile_part d-flex ">
                  <MdLocalPhone id="phone" className="m-1"/>
                  <p className="mb-1">{this.props.settings?.Store?.StorePhone}</p>
                </div>
                <div className="email_part d-flex ">
                  <MdEmail id="mail" className="m-1"/>
                  <p className="mb-1">{this.props.settings?.Store?.StoreEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      );
  }
}
const mapStateToProps = (state) => {
  return {
    menus: state.getMenus.menus,
    menuLoading: state.getMenus.loading,
    logos: state.getLogos.logos,
    logoLoading: state.getLogos.loading,
    settings: state.getSettings.settings,
    settingsLoading: state.getSettings.loading,
  };
};
export default connect(mapStateToProps)(Header02);
