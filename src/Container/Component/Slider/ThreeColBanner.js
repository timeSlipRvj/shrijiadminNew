import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { siteUrl} from '../../../Utils/util'

class ThreeColBanner extends Component {

    render() {
        return (
            <div className="two-col-banner image_about d-flex " style={{width: "100%"}}>
                {!this.props.bannersLoading && this.props.banners.Banners? 
                this.props.banners.Banners[3].SectionStatus?this.props.banners.Banners[3].Banners.map((banner,key)=>{
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
  export default connect(mapStateToProps)(ThreeColBanner);