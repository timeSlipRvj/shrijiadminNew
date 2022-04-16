import React, { Component } from "react";
import "./PersonalInfo.css";
import { connect } from "react-redux";
import { editUser} from '../../Redux/Actions/UserActions'
import Loader from '../Loader/Loader'
class PersonalInfo extends Component {
  state = {
    disabled: true,
    data: {
      "First Name": "",
      "Last Name": "",
      Email: ""
    }
  };

  handleGameClik() {
    this.setState({ disabled: !this.state.disabled });
  }
  componentDidMount() {
    this.setState({ data: this.props.user })
  }
  setData = (key,value) =>{
    const { data } = this.state
    data[key] = value;
    this.setState({ data: data})
  }
  render() {
    if(this.props.userLoading){
      return <Loader />
  }
    return (
      <React.Fragment>
          {/* <Loader /> */}
        <div className="headingPersonalEdit">
          <p className="headPersonal">Personal Information</p>
          <p className="headedit" onClick={this.handleGameClik.bind(this)}>
            Edit
          </p>
        </div>
        <div className="personalbox">
          <div className="profilepersonalImg">
            <img
              src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Reload"
            />
          </div>
          <div className="inputboxpersonal">
            <div className="namefulllast">
              <input
                type="text"
                name="First Name"
                id="FirstName"
                value={this.state.data["First Name"]}
                className="personalInput my-1"
                disabled={this.state.disabled ? "disabled" : ""}
                onChange={(e) =>{
                  this.setData(e.target.name, e.target.value)
                }}
              />
              <input
                type="text"
                name="Last Name"
                id="LastName"
                value={this.state.data["Last Name"]}
                className="personalInput my-1"
                disabled={this.state.disabled ? "disabled" : ""}
                onChange={(e) =>{
                  this.setData(e.target.name, e.target.value)
                }}
              />
            </div>
            <div className="namefulllast">

            <input
              type="email"
              name="Email"
              id="email"
              className="personalInput email_personalInput my-1"
              value={this.state.data["Email"]}
              disabled={this.state.disabled ? "disabled" : ""}
              onChange={(e) =>{
                this.setData(e.target.name, e.target.value)
              }}
            />
            </div>
{/* 
            <div className="namefulllast">
              <input
                type="text"
                name="countryCode"
                id="countryCode"
                placeholder="+91"
                className="personalInput"
                disabled={this.state.disabled ? "disabled" : ""}
              />
              <input
                type="text"
                name="phoneNo"
                id="phoneNo"
                placeholder="0123456789"
                className="personalInput"
                disabled={this.state.disabled ? "disabled" : ""}
              />
            </div> */}
            {!this.state.disabled &&
              <div className="button_box_1new" >
                <button id="continue_shopping" className="w-100" onClick={(e)=>{
                  e.preventDefault()
                  this.props.editUser(this.state.data)
                }}>Submit</button>
              </div>}
          </div>
        </div>
        <p className="lastLinepersonal">
          ** All this information will not be shared with anyone. We believe in
          privacy and it shall be given to all our customers.**
        </p>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.getUser.user,
    editingUser: state.editUser.updating,
    userLoading: state.getUser.loading,
  };
};
export default connect(mapStateToProps, {editUser})(PersonalInfo);
