import React, { Component } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getTopBrands } from "../../../Redux/Actions/StorefrontActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { siteUrl} from '../../../Utils/util'

class TopClients extends Component {

  componentDidMount() {
    this.props.getTopBrands();
  }
  render() {
      if(this.props.topBrandsLoading)
        return <React.Fragment></React.Fragment>
      else if(!this.props.topBrands.TopBrands.SectionStatus)
        return <React.Fragment></React.Fragment>
      return (
        <div>   
          <div className="find_by_category_box">
            <p className="most_viewd_text">Our Top Brands</p>
            <hr id="line_category"></hr>
          </div>
          <div className="clients_name">
            {this.props.topBrands.TopBrands.TopBrands.map((brand, key) => {
              return (
                <img
                  key={key}
                  className="client_icon"
                  src={brand.logo && brand.logo.image?siteUrl+brand.logo.image: "https://via.placeholder.com/100"}
                  alt="RELOAD"
                ></img>
              );
            })}
          </div>
          <p className="para_client">
            We provide our clients with bulk buying for their desired amount.
            See what our biggest clients have to say about us below.
          </p>
          <Link to="/shop">
          <button className="start_buying">
            Start bulk buying
            <IoIosArrowForward id="Arrow_buying" />
          </button>
          </Link>
        </div>
      );
  }
}
const mapStateToProps = (state) => {
  return {
    topBrandsLoading: state.getTopBrands.loading,
    topBrands: state.getTopBrands.topBrands,
  };
};
export default connect(mapStateToProps, { getTopBrands })(TopClients);
