import "./Header01.css";
import { IoIosArrowForward, IoIosHeart } from "react-icons/io";
import { FiMenu, FiSearch, FiShoppingCart } from "react-icons/fi";
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import "./Header03.css";
import { connect } from "react-redux";
import Dropdown from "react-multilevel-dropdown";

class Search extends Component {
  state = {
    categories2: [],
    selectedCategory: {
      url: "",
      id: "",
      name: "",
    },
    searchWord: "",
    searchRedirect: false,
    shop: false
  };
  componentDidMount() {
    const {  categories2 } = this.state;

    const setCategories2 = (root) => {
      if (root.childrenCategory.length == 0) {
        return (
          <Dropdown.Item key={root._id}>
          <div
            style={{
              background: "transparent",
              color: "#1D1D1D",
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
              padding: "0"
            }}
            className={"dropdown-item"}
            onClick={(e) => {
              const { selectedCategory } = this.state;
              selectedCategory.id = root._id;
              selectedCategory.name = root.name;
              selectedCategory.url = root.url;
              this.setState({ selectedCategory });
            }}
          >
            {root.name}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         
          </div>
          </Dropdown.Item>
        );
      } else
      {

        return (
          <div className="d-flex" key={root._id}>
             <div
              style={{
                background: "transparent",
                color: "#1D1D1D",
                display: "flex",
                justifyContent: "space-between",
                width: "80%"
              }}
              className={"dropdown-item"}
              onClick={(e) => {
                const { selectedCategory } = this.state;
                selectedCategory.id = root._id;
                selectedCategory.name = root.name;
                selectedCategory.url = root.url;
                this.setState({ selectedCategory });
              }}
            >
              {root.name}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          <Dropdown.Item  >
          <IoIosArrowForward className="ForwardArrow" />

            {root.childrenCategory.length > 0 ? (
              <Dropdown.Submenu position={"right"}>
                {root.childrenCategory.map((child, key) => {
                  return setCategories2(child)
                })}
             </Dropdown.Submenu>
            ) : (
              ""
            )}
          </Dropdown.Item>
          </div>
        );
            }
    };
    this.props.categories.forEach((category) => {
      let tempData2 = {};
      tempData2.content = setCategories2(category);
      categories2.push(tempData2);
    });
    this.setState({  categories2 });
  }

  render() {
    if(this.state.searchRedirect){
      return <Redirect to={{ 
        pathname: "/categories/"+this.state.selectedCategory.name + "/"+ this.state.selectedCategory.url+"/"+this.state.selectedCategory.id,
        searchWord: this.state.searchWord
      }}/>
    }
    if(this.state.shop){
      return <Redirect to={{ 
        pathname: "/shop",
        searchWord: this.state.searchWord
      }} />
    }
    return (
        <form className={this.props.home? "Header_one_centre search-sm": "Header_one_centre search-xl"}>
          <div className="centre_first_part">
   
               <Dropdown className=" search-dropdownbutton "  position="right" title={this.state.selectedCategory.name == ""?"Categories":this.state.selectedCategory.name}>
               <div
              style={{
                background: "transparent",
                color: "#1D1D1D",
                display: "flex",
                justifyContent: "space-between",
                width: "80%"
              }}
              className={"dropdown-item"}
              onClick={(e) => {
                const { selectedCategory } = this.state;
                selectedCategory.id = "";
                selectedCategory.name = "";
                selectedCategory.url = "";
                this.setState({ selectedCategory });
              }}
            >
              All Categories
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
              {this.state.categories2.map((category, key) => {
                return category.content
              })}
            {/* </Dropdown.Item> */}
          </Dropdown>
          </div>
          <div className="centre_second_part">
            <div className="inputstyle">
              <input type="text" placeholder="Search..." value={this.state.searchWord} onChange={(e)=>this.setState({searchWord: e.target.value})} />
            </div>
          </div>
          <button className="centre_third_part align-items-center justify-content-center" type="submit" onClick={(e)=>{
            e.preventDefault()
            if(this.state.selectedCategory.name == ""){
              this.setState({shop: true})
            }else
              this.setState({searchRedirect: true})
          }}>
            <p className="m-0"><span className="large_screen_text">Search</span></p>
            <FiSearch id="search" className="m-0"/>
          </button>
        </form>

        
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.getCategories.categories.filter(category=>category.status&&category.searchable),
  };
};
export default connect(mapStateToProps)(Search);
