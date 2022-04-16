import Footer from "../Component/Footer/Footer";
import Header from "../Component/Header/Header";
import Header01 from "../Component/Header/Header01";
import Product from "../Component/Product";
import "./Section.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getSectionProducts } from "../../Redux/Actions/CategoryActions";
import Loader from "../Loader/Loader";

class Section extends Component {
  state = {
    categoryProducts: [],
    submitting: false,
    filter: "-createdAt",
    skip: 0,
    limit: 10,
    filterArr: [],
    brand: {
      name: "",
      value: [],
    },
    allCategories: [],
    priceH: this.props.location.priceH && this.props.location.priceH != "" ? this.props.location.priceH : null,
    priceL: 1
  };
  componentDidMount() {
    const { filterArr } = this.state;
    if (this.props.location.pathname != "/shop") {
      let tmp = {
        name: this.props.match.params.fieldname,
        value: [this.props.match.params.id],
      };
      filterArr.push(tmp);
    }
    this.getAllCategories()
    if(this.props.location.brand){
      let tmp = {
        name: "brand",
        value: [this.props.brand]
      }
      filterArr.push(tmp);
    }
    this.setState({ filterArr, submitting: true }, () => {
      this.getProducts();
    });

  }
  getCategoryHelper = (cat, allCategories)=>{
    allCategories.push(cat)
    if(cat.childrenCategory.length == 0){
      return;
    }else{
      cat.childrenCategory.forEach(child=>{
        this.getCategoryHelper(child,allCategories)
      })
    }
  }
  getAllCategories = () =>{
    const {allCategories} = this.state

    this.props.categories.forEach((category)=>{
      this.getCategoryHelper(category,allCategories)
    })
    this.setState({allCategories})
  }
  getProducts = async () => {
    await this.props.getSectionProducts(
      this.state.filter,
      this.state.skip,
      this.state.limit,
      this.state.filterArr,
      this.props.location.searchWord ? this.props.location.searchWord : "",
      this.state.priceL,
      parseInt(this.state.priceH)
    );
    const { categoryProducts } = this.state;
    this.props.categoryProducts.forEach((product) => {
      categoryProducts.push(product);
    });
    // let temp = categoryProducts.map(JSON.stringify)
    // let unique = new Set(temp)
    // let newArr = Array.from(unique).map(JSON.parse)
    this.setState({
      categoryProducts,
      skip: this.state.skip + this.state.limit,
      submitting: false
    });
  };
  render() {
    return (
      <div>
        <Header01 />
        <Header />
        <div className="sectionBox">
          <div className="filterbox">
            <p className="filtersHeading">Filters</p>
            <p className="parafilter">
              Filter your preference and dig deep to buy what you want
            </p>
            {/* <div className="filterCategories">
              {this.props.tags.length > 0
                ? this.props.tags.map((tag, key) => {
                    return <p key={key}>{tag.name}</p>;
                  })
                : ""}
            </div> */}
            <div className="filter">
              <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                  <h2 className="accordion-header" id="headingzero">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsezero"
                      aria-expanded="false"
                      aria-controls="collapsezero"
                    >
                      Filter by Tags
                    </button>
                  </h2>
                  <div
                    id="collapsezero"
                    className="accordion-collapse collapse "
                    aria-labelledby="headingzero"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="suboptions">
                        {this.props.tags.length > 0
                          ? this.props.tags.map((tag, key) => {
                              return (
                                <div className="form-check" key={key}>
                                  <input
                                    className="form-check-input colorcheck"
                                    type="checkbox"
                                    value={tag._id}
                                    id={tag.name+key}
                                    onChange={(e)=>{
                                      const {filterArr} = this.state
                                      let ind = filterArr.findIndex(x => x.name == "tags")
                                      if(ind != -1){
                                        if(filterArr[ind].value.includes(e.target.value)){
                                          filterArr[ind].value.splice(filterArr[ind].value.indexOf(e.target.value, 1))
                                          if(filterArr[ind].value.length == 0){
                                            filterArr.splice(ind,1)
                                          }
                                        }else
                                          filterArr[ind].value.push(e.target.value)
                                      }else{
                                        
                                        filterArr.push({
                                          name: "tags",
                                          value: [e.target.value]
                                        })
                                      }
                                      this.setState({ filterArr, skip: 0,submitting:true, categoryProducts: []},()=>{this.getProducts()})
                                    }}
                                  />
                                  <label
                                    className="form-check-label checkfont"
                                    htmlFor={tag.name+key}
                                  >
                                    {tag.name}
                                  </label>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Filter by brand
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="suboptions">
                        {this.props.brands.length > 0
                          ? this.props.brands.map((brand, key) => {
                              return (
                                <div className="form-check" key={key}>
                                  <input
                                    className="form-check-input colorcheck"
                                    type="checkbox"
                                    value={brand._id}
                                    id={brand.name+key}
                                    onChange={(e)=>{
                                      const {filterArr} = this.state
                                      let ind = filterArr.findIndex(x => x.name == "brand")
                                      if(ind != -1){
                                        if(filterArr[ind].value.includes(e.target.value)){
                                          filterArr[ind].value.splice(filterArr[ind].value.indexOf(e.target.value, 1))
                                          if(filterArr[ind].value.length == 0){
                                            filterArr.splice(ind,1)
                                          }
                                        }else
                                          filterArr[ind].value.push(e.target.value)
                                      }else{
                                        
                                        filterArr.push({
                                          name: "brand",
                                          value: [e.target.value]
                                        })
                                      }
                                      this.setState({ filterArr, skip: 0,submitting:true, categoryProducts: []},()=>{this.getProducts()})
                                    }}
                                  />
                                  <label
                                    className="form-check-label checkfont"
                                    htmlFor={brand.name+key}
                                  >
                                    {brand.name}
                                  </label>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Find by category
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="suboptions">
                        {this.state.allCategories.map((category,key)=>{
                          if(category._id != this.props.match.params.id)
                          return (
                            <div className="form-check" key={key}>
                            <input
                              className="form-check-input colorcheck"
                              type="checkbox"
                              value={category._id}
                              id={category.name+key}
                              onChange={(e)=>{
                                const {filterArr} = this.state
                                let ind = filterArr.findIndex(x => x.name == "categories")
                                if(ind != -1){
                                  if(filterArr[ind].value.includes(e.target.value)){
                                    filterArr[ind].value.splice(filterArr[ind].value.indexOf(e.target.value, 1))
                                    if(filterArr[ind].value.length == 0){
                                      filterArr.splice(ind,1)
                                    }
                                  }else
                                    filterArr[ind].value.push(e.target.value)
                                }else{
                                  
                                  filterArr.push({
                                    name: "categories",
                                    value: [e.target.value]
                                  })
                                }
                                console.log(filterArr)
                                this.setState({ filterArr, skip: 0, submitting: true, categoryProducts: []},()=>{this.getProducts()})
                              }}
                            />
                            <label
                              className="form-check-label checkfont "
                              htmlFor={category.name+key}
                            >
                              {category.name}
                            </label>
                          </div>
                          )
                        })}
                       
                  
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      filter by price
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="d-flex justify-content-between">
                        <p className="checkfont">0</p>
                        <p className="checkfont">{this.state.priceH != null && this.state.priceH < 10000? this.state.priceH : "10,000+"}</p>
                      </div>
                    <input type="range" min="0" max="10001" className="price-slider"  id="myRange" name="myRange" value={this.state.priceH||""} onChange={(e)=>{
                      this.setState({priceH:e.target.value})
                    }}/>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ParticularSection">
            <div className="headParticular">
              <p>
                {this.props.match.params.title
                  ? this.props.match.params.title
                  : "All products"}
              </p>
              <hr />
            </div>
            <div className="dropSort">
              <p>Sort by :</p>
              <select
                className="sortIndividual"
                value={this.state.filter}
                onChange={(e) => {
                  this.setState(
                    { filter: e.target.value, submitting: true, skip: 0, categoryProducts: [] },
                    () => {
                      this.getProducts();
                    }
                  );
                }}
              >
                <option value="-createdAt">Newest</option>
                <option value="-specialPrice">Price highest to lowest</option>
                <option value="specialPrice">Price lowest to highest</option>
                <option value="">Discount</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
            {this.state.submitting? <div>loading</div>:
            <div className="individualcategorybox">
              {!this.props.loading &&
              this.state.categoryProducts.length == 0 ? (
                <div>No products found.</div>
              ) : (
                this.state.categoryProducts.map((product, key) => {
                  return (
                    <Product product={product} key={key} category={true} />
                  );
                })
              )}
            </div>
  }
            {this.state.categoryProducts.length != 0 ? (
              <button
                className="load_more_blogs"
                style={{ marginLeft: "30.015vw" }}
                id="load-more"
                onClick={(e) => {
                  this.setState({submitting: true})
                  this.getProducts();
                }}
              >
                Load more
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categoryProducts: state.getSectionProducts.categoryProducts,
    categories: state.getCategories.categories,
    loading: state.getSectionProducts.loading,
    tags: state.getTags.tags,
    brands: state.getBrands.brands,
  };
};
export default connect(mapStateToProps, { getSectionProducts })(Section);
