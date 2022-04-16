import Footer from '../Component/Footer/Footer'
import Header from '../Component/Header/Header'
import './Page.css'
import Header01 from '../Component/Header/Header01';
import React, { Component } from 'react'
import { connect } from "react-redux";
import {getPage} from '../../Redux/Actions/PageActions'
import Loader from '../Loader/Loader';
import {Helmet} from "react-helmet";

class Page extends Component {
    componentDidMount() {
        this.props.getPage(this.props.match.params.url)
    }
    render() {
        if(this.props.loading){
            return <Loader />
        }else
        return (
            <React.Fragment>
                <Helmet>
                    <title>{this.props.page.metaTitle}</title>
                    <meta name="description" content={this.props.page.metaDescription}/>
                </Helmet>
                <Header01 />
                <Header />
                <div className="Heading_about">
                    <p>{this.props.page.name}</p>
                    <hr />
                </div>
                <div className="mission_about p-5" dangerouslySetInnerHTML={{__html: this.props.page.body}}>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      page: state.getPage.page,
      loading: state.getPage.loading
    };
  };
export default connect(mapStateToProps, {getPage})(Page)

