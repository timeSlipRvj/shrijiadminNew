import React, { Component } from "react";
import { connect } from "react-redux";
import { siteUrl } from "../../../Utils/util";

class ClientImage extends Component {

  render() {
    return !this.props.clientReviewLoading &&
      this.props.clientReviews.sectionstatus ? (
      <div className="images_box">
        <div className="image_1_container">
          <div className="image_1_upper">
            <p className="image1_para1" style={{ marginTop: "3.880vw" }}>
              {this.props.clientReviews?.banners[0]?.title.split(",")[0]}
            </p>
            <p className="image1_para2">
              {this.props.clientReviews?.banners[0]?.title.split(",")[1]}
            </p>
            <div className="image_1_client_image">
              <img
                src={this.props.clientReviews?.banners[0].smallimg?siteUrl+this.props.clientReviews?.banners[0].smallimg?.image: "https://via.placeholder.com/100"}
                alt="RELOAD"
              />
            </div>
            <p className="image_1_para3">
            <q>{this.props.clientReviews?.banners[0]?.body}</q>
            </p>
          </div>
          <img
            src={this.props.clientReviews?.banners[0].img?siteUrl+this.props.clientReviews?.banners[0].img?.image: "https://via.placeholder.com/100"}
            alt="RELOAD"
          />
        </div>
        <div className="image_3_outer_box">
          <div className="images_3">
            <div className="hover_item">
              <p
                className="image1_para1"
                style={{ marginTop: "0.293vw", color: "white" }}
              >
              {this.props.clientReviews?.banners[1]?.title.split(",")[0]}
              </p>
              <p
                className="image1_para2"
                style={{ marginTop: "0", color: "white" }}
              >
              {this.props.clientReviews?.banners[1]?.title.split(",")[1]}
              </p>
            </div>
            <img
            src={this.props.clientReviews?.banners[1].img?siteUrl+this.props.clientReviews?.banners[1].img?.image: "https://via.placeholder.com/100"}
            alt="RELOAD"
            />
          </div>
          <div className="images_3">
            <div className="hover_item">
              <p
                className="image1_para1"
                style={{ marginTop: "0.293vw", color: "white" }}
              >
              {this.props.clientReviews?.banners[2]?.title.split(",")[0]}
              </p>
              <p
                className="image1_para2"
                style={{ marginTop: "0", color: "white" }}
              >
              {this.props.clientReviews?.banners[2]?.title.split(",")[1]}
              </p>
            </div>
            <img
            src={this.props.clientReviews?.banners[2].img?siteUrl+this.props.clientReviews?.banners[2].img?.image: "https://via.placeholder.com/100"}
            alt="RELOAD"
            />
          </div>
          <div className="images_3">
            <div className="hover_item">
              <p
                className="image1_para1"
                style={{ marginTop: "0.293vw", color: "white" }}
              >
              {this.props.clientReviews?.banners[3]?.title.split(",")[0]}
              </p>
              <p
                className="image1_para2"
                style={{ marginTop: "0", color: "white" }}
              >
              {this.props.clientReviews?.banners[3]?.title.split(",")[1]}
              </p>
            </div>
            <img
            src={this.props.clientReviews?.banners[3].img?siteUrl+this.props.clientReviews?.banners[3].img?.image: "https://via.placeholder.com/100"}
            alt="RELOAD"
            />
          </div>
        </div>
        <div className="image_2">
        
          <div className="image_2_1">
          <div className="hover_item2">
              <p
                className="image1_para1"
                style={{ marginTop: "0.293vw", color: "white" }}
              >
              {this.props.clientReviews?.banners[4]?.title.split(",")[0]}
              </p>
              <p
                className="image1_para2"
                style={{ marginTop: "0", color: "white" }}
              >
              {this.props.clientReviews?.banners[4]?.title.split(",")[1]}
              </p>
            </div>
            <img
            src={this.props.clientReviews?.banners[4].img?siteUrl+this.props.clientReviews?.banners[4].img?.image: "https://via.placeholder.com/100"}
            alt="RELOAD"
            />
          </div>
          <div className="image_2_1">
          <div className="hover_item2">
              <p
                className="image1_para1"
                style={{ marginTop: "0.293vw", color: "white" }}
              >
              {this.props.clientReviews?.banners[5]?.title.split(",")[0]}
              </p>
              <p
                className="image1_para2"
                style={{ marginTop: "0", color: "white" }}
              >
              {this.props.clientReviews?.banners[5]?.title.split(",")[1]}
              </p>
            </div>
            <img
            src={this.props.clientReviews?.banners[5].img?siteUrl+this.props.clientReviews?.banners[5].img?.image: "https://via.placeholder.com/100"}
            alt="RELOAD"
            />
          </div>
        </div>
      </div>
    ) : (
      <React.Fragment></React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    clientReviewLoading: state.getClientReviews.loading,
    clientReviews: state.getClientReviews.reviews,
  };
};
export default connect(mapStateToProps)(ClientImage);
