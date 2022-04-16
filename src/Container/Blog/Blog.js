import React, { Component } from "react";
import Footer from "../Component/Footer/Footer";
import Header from "../Component/Header/Header";
import "./Blog.css";
import { Link } from "react-router-dom";
import AddBlog from "./AddBlog";
import Header01 from "../Component/Header/Header01";
import SingleBlog from "./SingleBlog";
import { getBlogs } from "../../Redux/Actions/BlogActions";
import { connect } from "react-redux";

class Blog extends Component {
  state = {
    blogs: [],
    skip: 0,
    limit: 10,
    loading: false
  };
  componentDidMount(){
      this.getAllBlogs()
  }
  getAllBlogs = async () => {
      this.setState({loading: true});
    await this.props.getBlogs("-createdAt", this.state.skip, this.state.limit);
    const { blogs } = this.state;
    this.props.blogs.forEach((blog) => {
      blogs.push(blog);
    });

    this.setState({ blogs, skip: this.state.skip + this.state.limit, loading: false });
  };
  render() {
    return (
      <div>
        <Header01 />
        <Header />
        <div className="Heading_about">
          <p>BLOGS</p>
          <hr />
        </div>
        {this.props.user._id && 
        <AddBlog />
  }
        <div className="blog_main">
            {this.state.loading? <div>Loading..</div>:
            this.state.blogs.map((blog,key)=>{
                return <Link style={{ textDecoration: "none" }} to={"/blog/123/"+blog._id} key={key}>
                <SingleBlog blog={blog}/>
              </Link>
            })
            }
        </div>
        <button className="load_more_blogs blog_load_more_blogs" onClick={(e)=>{
            this.getAllBlogs()
        }}>
          Load more
        </button>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.getBlogs.loading,
    blogs: state.getBlogs.blogs,
    user: state.getUser.user
  };
};
export default connect(mapStateToProps, { getBlogs })(Blog);
