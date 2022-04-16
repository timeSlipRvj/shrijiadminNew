import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { siteUrl} from '../../../Utils/util'
class SixImageSlider extends Component {
    render() {
        return (
            !this.props.bannersLoading && this.props.banners?.Banners && this.props.banners?.Banners[5]?.SectionStatus ? 
            <div className="slide_box">
                    <div className="slider_box_one">
                        {this.props.banners?.Banners[5]?.Banners.slice(0,6).map((banner, key)=>{
                            return <Link  to={banner.CalltoActionURL} key={key} target={banner.OpenInNewWindow?"_blank":"_self"}>
                            <img  src={banner.Image.image?siteUrl+banner.Image.image: "https://via.placeholder.com/150"} alt="Reload" />
                            </Link>
                        })}
                    </div>
                    <div className="slider_box_two">
                    {this.props.banners?.Banners[5]?.Banners.slice(0,6).map((banner, key)=>{
                            return <Link  to={banner.CalltoActionURL} key={key} target={banner.OpenInNewWindow?"_blank":"_self"}>
                            <img  src={banner.Image.image?siteUrl+banner.Image.image: "https://via.placeholder.com/150"} alt="Reload" />
                            </Link>
                        })}
                    </div>
                </div>:<React.Fragment></React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      bannersLoading: state.getBanners.loading,
      banners: state.getBanners.banners
    };
  };
export default connect(mapStateToProps)(SixImageSlider);
