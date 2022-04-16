import React, { Component } from "react";
import { siteUrl } from "../../Utils/util";
import { Link } from "react-router-dom";
class PopularCategories extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    const { categories } = this.state;
    this.addCategories = (cat) => {
      categories.push(cat);
      if (cat.childrenCategory.length > 0) {
        cat.childrenCategory.forEach((category) => {
          this.addCategories(category);
        });
      } else {
        return;
      }
    };
    this.props.category.childrenCategory.forEach((category) => {
      this.addCategories(category);
    });
    this.setState({ categories });
  }
  render() {
    return (
      <div className="particular_popular_categories">
        <p className="image_popular">
          <img
            src={
              this.props.category?.logo?.image
                ? siteUrl + this.props.category?.logo?.image
                : "https://via.placeholder.com/150"
            }
            alt="RELOAD"
          />
        </p>
        <p className="name_popular_cat">{this.props.category?.name}</p>
        {this.state.categories.map((cat, key) => {
          return (
            <Link key={key} to={"/categories/" + cat.name + "/" + cat.url + "/" + cat._id}>
              <p className="cat_details_pop my-2">{cat?.name}</p>
            </Link>
          );
        })}

        <Link to={"/categories/" + this.props.category?.name +"/" + this.props.category?.url + "/" + this.props.category?._id}>
          <p className="view_all">View all</p>
        </Link>
      </div>
    );
  }
}

export default PopularCategories;
