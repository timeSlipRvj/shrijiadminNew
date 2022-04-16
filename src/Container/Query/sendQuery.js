import React, { Component } from "react";
import Footer from "../Component/Footer/Footer";
import Header from "../Component/Header/Header";
import Header01 from "../Component/Header/Header01";
import "./sendQuery.css";
import "../../Apis/api";
import Validate from "../../Utils/Validation";
import { toast } from "react-toastify";
import api from "../../Apis/api";
import { Redirect } from "react-router-dom";

class sendQuery extends Component {
  state = {
    data: {
      Body: "",
      Subject: "",
      Country: "",
      Phone: "",
      Email: "",
      FullName: "",
    },
    errors: [],
    redirect: false
  };
  setData = (key, val) => {
    const { data } = this.state;
    data[key] = val;
    this.setState({ data });
  };
  handleSubmit = () => {
    const {data, errors} = this.state
    let required = ["FullName", "Email", "Country", "Phone", "Subject", "Body"]
    required.forEach(req=>{
      if (!errors.includes(req) && !Validate.validateNotEmpty(data[req])) {
        errors.push(req);
        this.setState({ errors });
      } else if (
        errors.includes(req) &&
        Validate.validateNotEmpty(data[req])
      ) {
        errors.splice(errors.indexOf(req), 1);
        this.setState({ errors });
      }
    })
    if(!Validate.validateNotEmpty(errors)){
      if (!Validate.validateEmail(data["Email"])) {
        toast.error(
          `Please Eenter a valid email`,
          {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      } 
      else if (!Validate.validatePhoneNumber(data["Phone"])) {
        toast.error(
          `Please Eenter a valid Phone Number`,
          {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
      else{
        api.post("/query", {data}).then(res=>{
          toast.success(`Your query has been sent.`, {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          this.setState({redirect: true})
        }).catch(err=>{
          toast.error(
            `${
              err.response?.data?.message
                ? err.response.data.message
                : "Something went wrong."
            }`,
            {
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        })
      } 
    }else{
      toast.error(
        `Please fill all the fields.`,
        {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };
  render() {
    if(this.state.redirect){
      return <Redirect to="/" />
    }
    return (
      <div>
        <Header01></Header01>
        <Header></Header>
        <div className="Heading_about">
          <p>ASK HERE</p>
          <hr />
        </div>
        <div className="sendquerybox">
          <p className="sendtext">
            Loving our products or have a question to ask , write to us and we
            will revert in less than 24 hours. We accept all kinds of questions
            and customer reviews.You can also write a mail to the given email
            addresses separately.
          </p>
          <form className="formval">
            <p className="sendtext1">Fill in the details</p>
            <input
              type="text"
              className="sendinput"
              name="FullName"
              placeholder="Full Name"
              value={this.state.data.FullName}
              onChange={(e) => {
                this.setData(e.target.name, e.target.value);
              }}
            ></input>
            <input
              type="text"
              className="sendinput"
              placeholder="Email"
              name="Email"
              value={this.state.data.Email}
              onChange={(e) => {
                this.setData(e.target.name, e.target.value);
              }}
            ></input>
            <input
              type="text"
              className="sendinput"
              placeholder="Country"
              name="Country"
              value={this.state.data.Country}
              onChange={(e) => {
                this.setData(e.target.name, e.target.value);
              }}
            ></input>
             <input
              type="number"
              className="sendinput"
              placeholder="Phone"
              name="Phone"
              value={this.state.data.Phone}
              onChange={(e) => {
                this.setData(e.target.name, e.target.value);
              }}
            ></input>
            <input
              type="text"
              className="sendinput"
              placeholder="Subject"
              name="Subject"
              value={this.state.data.Subject}
              onChange={(e) => {
                this.setData(e.target.name, e.target.value);
              }}
            ></input>
            <textarea
              className="textarea"
              maxLength="200"
              rows="10"
              name="Body"
              value={this.state.data.Body}
              onChange={(e) => {
                this.setData(e.target.name, e.target.value);
              }}
              placeholder="Write your query here"
            ></textarea>
            <button
              className="sendquery"
              onClick={(e) => {
                e.preventDefault();
                this.handleSubmit()
              }}
            >
              Send
            </button>
          </form>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default sendQuery;
