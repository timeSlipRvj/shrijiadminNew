import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { siteUrl} from '../../../Utils/util'
class TwoColBanner extends Component {

    render() {
        return (
            <div className="image_about d-flex two-col-banner">
                {!this.props.bannersLoading && this.props.banners.Banners? 
                this.props.banners.Banners[2].SectionStatus?this.props.banners.Banners[2].Banners.map((banner,key)=>{
                    return  <Link className="two-banner" to={banner.CalltoActionURL} key={key} target={banner.OpenInNewWindow?"_blank":"_self"}>
                     <img className="big_banner" src={banner.Image.image?siteUrl+banner.Image.image: "https://via.placeholder.com/150"} alt="Reload" />
                     </Link>
                }) :""
                :""}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      bannersLoading: state.getBanners.loading,
      banners: state.getBanners.banners
    };
  };
  export default connect(mapStateToProps)(TwoColBanner);