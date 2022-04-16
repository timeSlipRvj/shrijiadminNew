import PopularCategories from '../PopularCategories'
import React, { Component } from 'react'
import { connect } from "react-redux";
class PopularBox extends Component {

    render() {
        if(this.props.categoriesLoading){
            return <React.Fragment></React.Fragment>
        }else 
        return (
            this.props.categories.SectionStatus ?
            <React.Fragment>
                
             <div className="find_by_category_box">
                    <p className="most_viewd_text">Popular categories</p>
                    <hr id="line_category"></hr>
                </div>
                <div className="new_arrival_box">
                    {this.props.categories.TopCategories.map((cat,key)=>{
                        return <PopularCategories key={key} category={cat}/>
                    })}
                </div>
        </React.Fragment>:
        <React.Fragment></React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      categoriesLoading: state.getTopCategories.loading,
      categories: state.getTopCategories.TopCategories.TopCategories,
    };
  };
  export default connect(mapStateToProps)(PopularBox);
