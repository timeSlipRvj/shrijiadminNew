import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import ScrollToTop from "./Container/Scrolltotop";
import Home from "./Container/Home/Home";
import Blog from "./Container/Blog/Blog";
import Compare from "./Container/Compare/Compare";
import BlogMain from "./Container/Blog/BlogMain";
import IndividualProduct from "./Container/ProductIndividual/IndividualProduct";
import AboutUs from "./Container/About/AboutUs";
import Section from "./Container/Section/Section";
import ComingSoon from "./Container/ComingSoon/ComingSoon";
import "semantic-ui-css/semantic.min.css";
import Cart from "./Container/Cart/Cart";
import paymentCart from "./Container/Cart/paymentCart";
import ProfileIndividual from "./Container/Profile/ProfileIndividual";
import sendQuery from "./Container/Query/sendQuery";
import Loader from "./Container/Loader/Loader";
import { getAllCategories } from "./Redux/Actions/CategoryActions";
import {
  getFooterDetails,
  getLogos,
  getGeneral,
  getBrands,
  getProductTabs,
  getFeatures,
  getFeaturedCategoriesTabs,
  getTopCategories,
  getClientReviews
} from "./Redux/Actions/StorefrontActions";
import { getMenus } from "./Redux/Actions/MenuActions";
import { getUser, getUserOrders } from "./Redux/Actions/UserActions";
import { getWishlist } from "./Redux/Actions/WishlistActions";
import { getCart } from "./Redux/Actions/CartActions";
import { getTags } from "./Redux/Actions/ProductActions";
import { getSettings } from "./Redux/Actions/SettingsActions";
import { getUser as getUserId, setUser, setAuthToken } from "./Utils/Local";
import { NotFound } from "./Utils/NotFound";
import Page from "./Container/Page/Page";

class App extends React.Component {
  requests = async () => {
    this.props.getGeneral();
    this.props.getAllCategories();
    this.props.getLogos();
    this.props.getMenus();
    if(window.location.search != ''){
      let token = window.location.search.split("=").join(",").split("&").join(",").split(",")[1]
      let id = window.location.search.split("=").join(",").split("&").join(",").split(",")[3]
      setAuthToken(token)
      setUser(id)
      window.location.href = '/'
    }
    if (window.location.search == '' && getUserId()) {
      this.props.getUser(getUserId());
      this.props.getWishlist();
      this.props.getCart();
      this.props.getUserOrders(getUserId());
    }
    this.props.getSettings();
    this.props.getFeatures();
    this.props.getFooterDetails();
    this.props.getProductTabs();
    this.props.getFeaturedCategoriesTabs()
    this.props.getBrands();
    this.props.getTopCategories()
    this.props.getTags();
    this.props.getClientReviews()
  };
  componentDidMount() {
    this.requests();
  }

  render() {
    if (
      this.props.categoriesloading ||
      this.props.userLoading ||
      this.props.storeLoading ||
      this.props.settingsLoading ||
      this.props.menuLoading
    ) {
      return <Loader />;
    }

    return (
      <div className="App">
        <Router >
          <ScrollToTop />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/blogs" component={Blog} />
            <Route path="/compare/:products" component={(props) => <Compare key={Date.now()} {...props} />} />
            <Route path="/blog/:url/:id" component={BlogMain} />
            <Route path="/product/:url/:id" component={IndividualProduct} />
            <Route path="/about" component={AboutUs} />
            <Route path="/ComingSoon" component={ComingSoon} />
            <PrivateRoute path="/cart" component={Cart} />
            <PrivateRoute path="/payment" component={paymentCart} />
            <PrivateRoute
              path="/profile"
              component={ProfileIndividual}
            ></PrivateRoute>
            <Route path="/sendquery" component={sendQuery} />
            <Route
              exact
              path="/page/:url"
              component={(props) => <Page key={Date.now()} {...props} />}
            />
            <Route
              exact
              path="/:fieldname/:title/:fieldurl/:id"
              render={(props) => <Section key={Date.now()} {...props} />}
            />
            <Route
              exact
              path="/shop"
              render={(props) => <Section key={Date.now()} {...props} />}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    footerLoading: state.getFooter.loading,
    categoriesloading: state.getCategories.loading,
    menuLoading: state.getMenus.loading,
    logoLoading: state.getLogos.loading,
    userLoading: state.getUser.loading,
    storeLoading: state.getStore.loading,
    settingsLoading: state.getSettings.loading,
  };
};
export default connect(mapStateToProps, {
  getUser,
  getGeneral,
  getFooterDetails,
  getAllCategories,
  getMenus,
  getLogos,
  getWishlist,
  getCart,
  getTags,
  getBrands,
  getProductTabs,
  getFeaturedCategoriesTabs,
  getFeatures,
  getSettings,
  getUserOrders,
  getTopCategories,
  getClientReviews
})(App);
