import "./Footer.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { siteUrl} from '../../../Utils/util'

export class Footer extends Component {
  state = {
    footerDetails: {
      Footer: {
        FooterCopyrightText:
          'Copyright © <a href="https://lokostop.in">Lokostop</a> 2021. All rights reserved.',
        AcceptedPaymentMethodsImage: "",
      },
      Menus: {
      }
    },
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
    this.setState({
      footerDetails: this.props.footerData.Footer
        ? this.props.footerData
        : this.state.footerDetails,
    });
  }
  render() {
    if(this.props.footerLoading){
      return <div></div>
    }
    return (
      <footer className="footer">
        <div className="area_1">
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
                <p>We promise products from best brands with assurance.</p>
              </div>
          <a
            href="https://www.google.com/maps/place/Shop+No.+4669,+1,+Shingar+Cinema+Rd,+Baba+Than+Singh+Chowk,+Opposite+Kalra+Hospital,+Fatehganj,+Ludhiana,+Punjab+141008/@30.9141817,75.8644781,17z/data=!3m1!4b1!4m5!3m4!1s0x391a8312c81bf2c7:0x3d7ec9369a0e025b!8m2!3d30.9141817!4d75.8666668"
            target="#"
          >
            <img
              src="https://www.google.com/maps/vt/data=2StCVG_pvqmZ1rje37RZrKw4YWfMf4yq_wsA1c_J4dZTYphMkKI7wXDrIg1fH7e84tBBvSWc96etbq6X3KeHfc4bR42oZ5dSNREcu-7Cuf4PngXjgopEus1LRM7H3BYjUF3ksoC9f_9vMiZSFQvHJqL4S-hTJYtRvuqYLv8"
              alt="RELOAD"
            />
          </a>
            <p>Shop No. 4669/1 Shingar Cinema Rd, Near Shingar Cinema, New Shivaji Nagar, Samrala Chowk, Ludhiana, Punjab 141008</p>
        </div>
        <div className="area_2">
          <div className="outer_area_boxes">
            <div className="box_one_area_2">
              <p>INFORMATION</p>
              <ul>
                {/* <li>Delivery</li> */}
                <li><Link to="/about">About Us</Link></li>
                <li>Secure Payment</li>
                <li><Link to="/sendquery">Send Query</Link></li>
                {/* <li>Sitemap</li>
                            <li>Stores</li> */}
              </ul>
            </div>
            {this.state.footerDetails.Menus.FooterMenuOne && 
            <div className="box_one_area_2">
              <p>{this.state.footerDetails.Menus?.FooterMenuOneTitle}</p>
              <ul>
                {this.state.footerDetails.Menus.FooterMenuOne && this.state.footerDetails.Menus.FooterMenuOne.menuItems.map((item,key)=>{
                  return <li key={key} ><Link to={this.setMenuLink(item)}>{item.name}</Link></li>
                })}
              
              </ul>
            </div>}
            {this.state.footerDetails.Menus.FooterMenuTwo && 
            <div className="box_one_area_2">
              <p>{this.state.footerDetails.Menus?.FooterMenuTwoTitle}</p>
              <ul>
                {this.state.footerDetails.Menus.FooterMenuTwo && this.state.footerDetails.Menus.FooterMenuTwo.menuItems.map((item,key)=>{
                  return <li key={key} ><Link to={this.setMenuLink(item)}>{item.name}</Link></li>
                })}
              
              </ul>
            </div>}
            {/* <div className="box_one_area_2">
              <p>HELP DESK</p>
              <ul>
                <li>
                  {this.props.store && this.props.store.TermsConditionsPage ? (
                    <Link
                      to={"/page/" + this.props.store.TermsConditionsPage.url}
                    >
                      Terms of Use
                    </Link>
                  ) : (
                    ""
                  )}
                </li>
                <li>
                  {this.props.store && this.props.store.PrivacyPolicyPage ? (
                    <Link
                      to={"/page/" + this.props.store.PrivacyPolicyPage.url}
                    >
                      Priavcy Policy
                    </Link>
                  ) : (
                    ""
                  )}
                </li>
              
              </ul>
            </div> */}
          </div>
          <div className="second_box_profile">
            <p>PROFILE</p>
            <ul>
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to={{ pathname: "/profile", ordersActive: true }}>My Orders</Link></li>
              <li><Link to={{ pathname: "/profile", wishlistActive: true }}>My Favorites</Link></li>
            </ul>
          </div>
          <p
            className="copyright"
            dangerouslySetInnerHTML={{
              __html: this.state.footerDetails.Footer.FooterCopyrightText,
            }}
          ></p>
        </div>
        <div className="area_3">
        {this.state.footerDetails.Footer.AcceptedPaymentMethodsImage && this.state.footerDetails.Footer.AcceptedPaymentMethodsImage.image && 

          <div className="paymentmethod">
            <p>PAYMENT METHODS</p>
            <div className="logo2">
                    <img alt="Reload" src={this.state.footerDetails.Footer.AcceptedPaymentMethodsImage?siteUrl+this.state.footerDetails.Footer.AcceptedPaymentMethodsImage.image:""} />
            </div>
          </div>
  }
          <div className="followUs">
            <p>FOLLOW US ON</p>

            <div className="social">
              <ul>
                {this.props.footerData && this.props.footerData.SocialLinks && (
                  <React.Fragment>
                    <a
                      href={this.props.footerData.SocialLinks.Facebook}
                      target="#"
                    >
                      <li>
                        <i
                          className="fab fa-facebook fa-2x"
                          style={{ color: "#4267B2" }}
                        />
                      </li>
                    </a>
                    <a
                      href={this.props.footerData.SocialLinks.Twitter}
                      target="#"
                    >
                      <li>
                        <i
                          className="fab fa-twitter fa-2x"
                          style={{ color: "#00acee" }}
                        />
                      </li>
                    </a>
                    <a
                      href={this.props.footerData.SocialLinks.Instagram}
                      target="#"
                    >
                      <li>
                        <i
                          className="fab fa-instagram-square fa-2x"
                          style={{ color: "#cd486b" }}
                        />
                      </li>
                    </a>
                    <a
                      href={this.props.footerData.SocialLinks.Youtube}
                      target="#"
                    >
                      <li>
                        <i
                          className="fab fa-youtube fa-2x"
                          style={{ color: "#ff0000" }}
                        />
                      </li>
                    </a>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    footerData: state.getFooter.footerData,
    footerLoading: state.getFooter.loading,
    store: state.getStore.store,
    logos: state.getLogos.logos,
    logoLoading: state.getLogos.loading
  };
};
export default connect(mapStateToProps)(Footer);
