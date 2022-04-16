import Footer from "../Component/Footer/Footer";
import Header from "../Component/Header/Header";
import "./IndividualProduct.css";
import FindByCategory from "../Component/Boxes/FindByCategory";
import Product from "../Component/Product";
import IndividualProductDetails from "./IndividualProductDetails";
import Header01 from "../Component/Header/Header01";
import React, { Component } from "react";
import PopularBox from "../Component/Boxes/PopularBox";
import ShowReview from "./ShowReview";
import { IoIosArrowBack, IoIosArrowForward, IoIosAttach } from "react-icons/io";
import { connect } from "react-redux";
import Loader from "../Loader/Loader";
import api from "../../Apis/api";
import { Helmet } from "react-helmet";

class IndividualProduct extends Component {
  state = {
    productDetails: {
      name: "--",
      price: "--",
      additionalImages: [],
      baseImage: {
        image: "",
      },
      categories: [
        {
          name: "--",
          _d: "--",
        },
      ],
      attributes: [],
      options: [],
      metaTitle: "Product",
      metaDescription: "Product",
      upSells: [],
      crossSells: [],
      relatedProducts: []
    },
    review: {
      rating: 0,
      reviewerName: this.props.user._id
        ? this.props.user["First Name"] + " " + this.props.user["Last Name"]
        : "",
      comment: "",
      status: false,
    },
    productReviews: [],
  };
  componentDidMount() {
    let url = "/product/get/" + this.props.match.params.id;
    api
      .get(url)
      .then((res) => {
        this.setState({ productDetails: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
    this.getReviews();
  }
  getReviews = () => {
    let url = "/review/get/product/" + this.props.match.params.id;
    api
      .get(url)
      .then((res) => {
        this.setState({ productReviews: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  postReview = (review, productId) => {
    api
      .post("/review", {
        data: review,
        productId,
        requiredPermission: "Create Review",
      })
      .then((res) => {
        alert("review submitted for approval");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    if (this.props.productLoading) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>{this.state.productDetails.metaTitle}</title>
          <meta
            name="description"
            content={this.state.productDetails.metaDescription}
          />
        </Helmet>
        <Header01 />
        <Header />

        <IndividualProductDetails
          productDetails={this.state.productDetails}
          reviews={this.state.productReviews}
        />
        <div className="review_main_with_specification">
          <ul className="nav nav-tabs " id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                style={{
                  color: " #9d9d9d",
                  font: " normal normal normal 1vw/2vw Poppins",
                  padding: "1em",
                }}
                className="nav-link active individual_product_nav_item"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Description
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                style={{
                  color: " #9d9d9d",
                  font: " normal normal normal 1vw/2vw Poppins",
                  padding: "1em",
                }}
                className="nav-link individual_product_nav_item"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Specifications
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                style={{
                  color: " #9d9d9d",
                  font: " normal normal normal 1vw/2.3vw Poppins",
                  padding: "1em",
                }}
                className="nav-link individual_product_nav_item"
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Reviews
              </button>
            </li>
          </ul>
          <div className="tab-content p-3" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div
                className="desciptionbox"
                dangerouslySetInnerHTML={{
                  __html: this.state.productDetails.description,
                }}
              ></div>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="specification_outer_box">
                {this.state.productDetails.attributes.map((attribute, key) => {
                  return (
                    <div className="particularSpecification" key={key}>
                      <h6>{attribute.attribute.name}</h6>
                      <p>{attribute.value.join(", ")} </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <div className="review_outer_box">
                <p className="read_review" style={{ marginTop: "1.171vw" }}>
                  Read reviews here
                </p>
                {this.props.user._id && (
                  <React.Fragment>
                    <div className="review_star">
                      <i
                        className={
                          this.state.review.rating > 0
                            ? "fas fa-star"
                            : "far fa-star"
                        }
                        style={{ color: "yellow", cursor: "pointer" }}
                        onClick={(e) => {
                          const { review } = this.state;
                          review.rating = 1;
                          this.setState({ review });
                        }}
                      ></i>
                      <i
                        className={
                          this.state.review.rating > 1
                            ? "fas fa-star"
                            : "far fa-star"
                        }
                        style={{ color: "yellow", cursor: "pointer" }}
                        onClick={(e) => {
                          const { review } = this.state;
                          review.rating = 2;
                          this.setState({ review });
                        }}
                      ></i>
                      <i
                        className={
                          this.state.review.rating > 2
                            ? "fas fa-star"
                            : "far fa-star"
                        }
                        style={{ color: "yellow", cursor: "pointer" }}
                        onClick={(e) => {
                          const { review } = this.state;
                          review.rating = 3;
                          this.setState({ review });
                        }}
                      ></i>
                      <i
                        className={
                          this.state.review.rating > 3
                            ? "fas fa-star"
                            : "far fa-star"
                        }
                        style={{ color: "yellow", cursor: "pointer" }}
                        onClick={(e) => {
                          const { review } = this.state;
                          review.rating = 4;
                          this.setState({ review });
                        }}
                      ></i>
                      <i
                        className={
                          this.state.review.rating > 4
                            ? "fas fa-star"
                            : "far fa-star"
                        }
                        style={{ color: "yellow", cursor: "pointer" }}
                        onClick={(e) => {
                          const { review } = this.state;
                          review.rating = 5;
                          this.setState({ review });
                        }}
                      ></i>
                    </div>
                    <div className="write_review">
                      <div className="customer_review">
                        <textarea
                          className="commentBox"
                          maxLength="200"
                          placeholder="Choose a rating and start writing a review..."
                          value={this.state.review.comment}
                          onChange={(e) => {
                            const { review } = this.state;
                            review.comment = e.target.value.substring(0, 200);
                            this.setState({ review });
                          }}
                        ></textarea>
                        <div className="count_attach">
                          {/* <IoIosAttach className="attach" /> */}
                          <p className="no_count">
                            {this.state.review.comment.length}/200
                          </p>
                        </div>
                      </div>
                      <button
                        className="review_button"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          this.postReview(
                            this.state.review,
                            this.props.match.params.id
                          );
                        }}
                      >
                        Post Review
                      </button>
                    </div>
                  </React.Fragment>
                )}
                {this.state.productReviews.length > 0 ? (
                  this.state.productReviews.map((review, key) => {
                    return (
                      review.status && <ShowReview key={key} review={review} />
                    );
                  })
                ) : (
                  <div className="text-center">
                    Be the first one to review this product!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.productDetails.relatedProducts.length > 0 && (
          <React.Fragment>
            <div className="most_view_box">
              <p className="most_viewd_text">RELATED PRODCUTS</p>
              <hr id="line_view"></hr>
            </div>

            <div className="new_arrival_box">
              {this.state.productDetails.relatedProducts.map((product,key)=>{
                return <Product  key={key} product={product} category={false}/>
              })}
            </div>
          </React.Fragment>
        )}
        {this.state.productDetails.upSells.length > 0 && (
          <React.Fragment>
            <div className="most_view_box">
              <p className="most_viewd_text">YOU MIGHT ALSO LIKE</p>
              <hr id="line_view"></hr>
            </div>

            <div className="new_arrival_box">
              {this.state.productDetails.upSells.map((product,key)=>{
                return <Product  key={key} product={product} category={false}/>
              })}
            </div>
          </React.Fragment>
        )}
        {this.state.productDetails.crossSells.length > 0 && (
          <React.Fragment>
            <div className="most_view_box">
              <p className="most_viewd_text">PEOPLE ALSO BUY</p>
              <hr id="line_view"></hr>
            </div>

            <div className="new_arrival_box">
            {this.state.productDetails.crossSells.map((product,key)=>{
                return <Product  key={key} product={product} category={false}/>
              })}
            </div>
          </React.Fragment>
        )}

        <FindByCategory />
        <PopularBox />
        <Footer />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.getUser.user,
  };
};
export default connect(mapStateToProps)(IndividualProduct);
