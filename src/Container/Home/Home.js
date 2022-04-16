import Header from "../Component/Header/Header";
import "./Home.css";
import Footer from "../Component/Footer/Footer";
import FindByCategory from "../Component/Boxes/FindByCategory";
import Header01 from "../Component/Header/Header01";
import React, { Component } from "react";
import Search from "../Component/Header/Search";
import ProductRowBox from "../Component/Boxes/ProductRowBox";
import SixImageSlider from "../Component/Slider/SixImageSlider";
import ClientImage from "../Component/Slider/ClientImage";
import Slider from "../Component/Slider/Slider";
import CategoryBox from "../Component/Boxes/CategoryBox";
import MostViewedBox from "../Component/Boxes/MostViewedBox";
import TopClients from "../Component/Boxes/TopClients";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import { getFeatures, getBanners } from "../../Redux/Actions/StorefrontActions";
import TwoColBanner from "../Component/Slider/TwoColBanner";
import ThreeColBanner from "../Component/Slider/ThreeColBanner";
import OneColBanner from "../Component/Slider/OneColBanner";
import { Helmet } from "react-helmet";
import CategoryRowBox from "../Component/Boxes/CategoryRowBox";
import PopularBox from "../Component/Boxes/PopularBox";

class Home extends Component {
  componentDidMount() {
    this.props.getBanners();
  }
  render() {
    if (this.props.bannersLoading) {
      return <Loader />;
    } else
      return (
        <React.Fragment>
          <Helmet>
            <title>{this.props.store.WelcomeText}</title>
          </Helmet>
          <Header01 />
          <Header />
          <Search home={true} />
          {this.props.store.Slider && (
            <Slider
              slides={this.props.store.Slider.Slides}
              settings={this.props.store.Slider.Settings}
            />
          )}
          {!this.props.featuresLoading &&
          this.props.allFeatures.Features &&
          this.props.allFeatures.Features.SectionStatus ? (
            <div className="Free_box">
              {this.props.allFeatures.Features.Features.filter((feature) => {
                if (
                  feature.Icon != "" &&
                  feature.SubTitle != "" &&
                  feature.Title != ""
                )
                  return true;
                return false;
              }).map((feature, key) => {
                return (
                  <div className="Free_Shipping" key={key}>
                    <i className={feature.Icon}></i>
                    <div className="shipping_text">
                      <p className="shipping_text1">{feature.Title}</p>
                      <p className="shipping_text2">{feature.SubTitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
          {!this.props.allProductRowsLoading && (
            <CategoryRowBox products={this.props.allProductRows[1]} />
          )}
          {!this.props.allProductRowsLoading &&  (
            <ProductRowBox tab={this.props.allProductRows[0].Tabs[0]} />
          )}
          <ThreeColBanner />
          {!this.props.allProductRowsLoading && this.props.allProductRows[3].SectionStatus &&(
          <MostViewedBox row={this.props.allProductRows[3]}/>
          )}
          <FindByCategory />
          {!this.props.allProductRowsLoading && (
            <ProductRowBox tab={this.props.allProductRows[0].Tabs[1]} />
          )}
          <TopClients />
          <ClientImage />
          {this.props.store.Slider && (
            <Slider
              slides={this.props.store.Slider.Slides}
              settings={this.props.store.Slider.Settings}
            />
          )}
          <TwoColBanner />
          {!this.props.featcatloading && <CategoryBox tab={this.props.featcatrow}/>}
          {!this.props.allProductRowsLoading && (
            <ProductRowBox tab={this.props.allProductRows[0].Tabs[2]} />
          )}
          <OneColBanner />
          {!this.props.allProductRowsLoading && (
            <ProductRowBox tab={this.props.allProductRows[0].Tabs[3]} />
          )}
          <PopularBox />
          <SixImageSlider />
          <Footer />
        </React.Fragment>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    allProductRows: state.getProductTabs.allTabs,
    allProductRowsLoading: state.getProductTabs.loading,
    featcatrow: state.getFeaturedCategoriesTabs.featuredCategories,
    featcatloading: state.getFeaturedCategoriesTabs.loading,
    featuresLoading: state.getFeatures.loading,
    allFeatures: state.getFeatures.features,
    bannersLoading: state.getBanners.loading,
    store: state.getStore.store,
  };
};
export default connect(mapStateToProps, { getFeatures, getBanners })(Home);
