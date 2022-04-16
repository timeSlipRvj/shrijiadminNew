import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Dropdown from "react-multilevel-dropdown";
class FindByCategory extends React.Component {
  state = {
    categories2: [],
    redirect: false,
    selectedCategory: {
        url: "",
        id: "",
        name: ""
    }, 
    selectedBrand: {
      url: "",
      id: "",
      name: ""
    },
    priceH: ""
  };
  componentDidMount() {
    const {  categories2 } = this.state;

    const setCategories2 = (root, key) => {
      if (root.childrenCategory.length == 0) {
        return (
          <Dropdown.Item key={key+root._id}>
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
          <div className="d-flex" key={key+root._id}>
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
                  return setCategories2(child, key)
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
    this.props.categories.forEach((category,key) => {
      let tempData2 = {};
      tempData2.content = setCategories2(category, key);
      categories2.push(tempData2);
    });
    this.setState({  categories2 });
  }
  render() {
    if(this.state.selectedCategory.id == "" && this.state.redirect){
      return <Redirect to={{
        pathname: "/shop",
        brand: this.state.selectedBrand.id != ""?this.state.selectedBrand.id:undefined,
        priceH: this.state.priceH
      }} />
    } else if(this.state.selectedCategory.id != "" && this.state.redirect){
      return <Redirect to={{ 
        pathname: "/categories/"+this.state.selectedCategory.name + "/"+ this.state.selectedCategory.url+"/"+this.state.selectedCategory.id,
        brand: this.state.selectedBrand.id != ""?this.state.selectedBrand.id:undefined,
        priceH: this.state.priceH
      }}/>
    }
    return (
      <div>
        <div className="find_by_category_box">
          <p className="most_viewd_text">Find by category</p>
          <hr id="line_category"></hr>
        </div>
        <div className="category_box">
          <p className="offers">
            Open category and sort according to your preferences. Unveil offers.
          </p>
          <div className="category_names">
          {this.props.categories.map((category,key)=>{
            return <p className="particular_cat" key={key} onClick={(e)=>{
              const {selectedCategory} = this.state
              selectedCategory.id = category._id
              selectedCategory.name = category.name
              selectedCategory.url = category.url
              this.setState({selectedCategory})
            }}>{category.name}</p>
          })}
            
            
          </div>
          <p className="or">OR</p>
          <div className="category_Search">
            <div className="centre_first_part1">
            <Dropdown style={{height: "97%"}} className="dropdown-toggle search-dropdownbutton "  position="right" title={this.state.selectedCategory.name == ""?"Categories":this.state.selectedCategory.name.substr(0,9)}>
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
            <div className="centre_first_part1">
              
              {/* <div className="dropdown" style={{width:'auto'}}> */}
                {/* <button
                 className="btn  dropdown-toggle"
                 type="button"
                 id="dropdownButton2"
                 data-bs-toggle="dropdown"
                 aria-expanded="false"
                >
                  {this.state.selectedBrand.name == ""? "Brands": this.state.selectedBrand.name.substring(0,6)}
                </button> */}
                {/* <ul className="dropdown-menu" aria-labelledby="dropdownButton2"> */}
                <Dropdown style={{height: "97%"}} className="dropdown-toggle search-dropdownbutton "  position="right" title={this.state.selectedBrand.name == ""?"Brands":this.state.selectedBrand.name.substr(0,7)}>

                {!this.props.brandLoading && this.props.brands.map((brand, key)=>{
                    return <Dropdown.Item key={key}><div className="dropdown-item" key={key} onClick={(e)=>{
                      const {selectedBrand} = this.state
                      selectedBrand.id = brand._id
                      selectedBrand.name = brand.name
                      selectedBrand.url = brand.url
                      this.setState({selectedBrand})
                    }}>{brand.name}</div></Dropdown.Item>
                  })} 
                {/* </ul> */}
</Dropdown>
              {/* </div> */}
              
            </div>
            <div className="centre_second_part2">
              <div className="budgetbox">
              <input type="number" placeholder="Budget (approximate)" value={this.state.priceH} step={1000} onChange={(e)=>this.setState({priceH: e.target.value})}/>
              </div>
             
            </div>
            <div className="find_icon" onClick={(e)=>{this.setState({redirect: true})}}>
              <p className="large_screen_text m-0">Find</p>
              <FiSearch id="search" className="my-0" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.getCategories.categories.filter(category=>category.status&&category.searchable),
    brands: state.getBrands.brands,
    brandLoading: state.getBrands.loading
  };
};
export default connect(mapStateToProps)(FindByCategory);
