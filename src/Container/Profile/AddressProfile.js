import React, { Component } from "react";
import "./AddressProfile.css";
import { connect } from "react-redux";
import { editUser } from "../../Redux/Actions/UserActions";
import arrayMove from 'array-move'
import Loader from "../Loader/Loader";
class AddressProfile extends Component {
  state = {
    disabled: true,
    data: {
      Address: [
        // {
        //   AddressLine1: "",
        //   AddressLine2: "",
        //   Country: "",
        //   State: "",
        //   City: "",
        //   Pin: "",
        // },
      ],
    },
    selected: 0
  };
  handleEditClick() {
    this.setState({ disabled: !this.state.disabled });
  }
  componentDidMount() {
    let address = this.props.user.Address?this.props.user.Address:[]
    if(address.length == 0){
        address = this.state.data.Address
    }
    this.setState({ data: {...this.props.user, Address: address}});
  }

  addNewAddress = () =>{
      const {data} = this.state;
      data.Address.push({
        AddressLine1: "",
        AddressLine2: "",
        Country: "",
        State: "",
        City: "",
        Pin: "",
      })
      document.querySelector("#edit-add").click()
      this.setState({ data},()=>{this.setState({selected: data.Address.length-1})})
  }
  setDefault = () =>{
      const { data} = this.state
      data.Address = arrayMove(data.Address, this.state.selected, 0)
      this.setState({data, selected: 0})
  }
  setData = (key, value) =>{
      const { data } = this.state
      data.Address[this.state.selected][key] = value;
      this.setState({data})
  }
  render() {
    // if(this.props.userLoading){
    //   return <Loader />
    // }
    return (
      <div>
        <div className="headingPersonalEdit">
          <p className="headPersonal">My Address</p>
          <p className="headedit" id="edit-add" onClick={this.handleEditClick.bind(this)}>
            Edit
          </p>
        </div>
        <div className="inputboxpersonal address_inputboxpersonal">
          <div className="namefulllast my-lg-1 my-0">
            <input
              type="text"
              name="AddressLine1"
              id="firstLine"
              placeholder="First Line"
              value={this.state.data.Address[this.state.selected]?.AddressLine1}
              className="personalInput address_personalInput_line w-100"
              disabled={this.state.disabled ? "disabled" : ""}
              onChange={(e)=>{
                  this.setData(e.target.name, e.target.value);
              }}
            />
          </div>
          <div className="namefulllast small_screen_text my-lg-1 my-0">
            <input
              type="text"
              name="AddressLine2"
              id="SecondLine"
              placeholder="Second Line"
              className="personalInput address_personalInput_line w-100"
              value={this.state.data.Address[this.state.selected]?.AddressLine2}
              disabled={this.state.disabled ? "disabled" : ""}
              onChange={(e)=>{
                this.setData(e.target.name, e.target.value);
            }}
            />
          </div>
          <div className="namefulllast my-lg-1 my-0">
            <input
              type="text"
              name="City"
              id="City"
              placeholder="City"
              value={this.state.data.Address[this.state.selected]?.City}
              className="personalInput address_personalInput"
              disabled={this.state.disabled ? "disabled" : ""}
              onChange={(e)=>{
                this.setData(e.target.name, e.target.value);
            }}
            />
            <input
              type="text"
              name="State"
              id="State"
              placeholder="State"
              value={this.state.data.Address[this.state.selected]?.State}
              className="personalInput address_personalInput"
              disabled={this.state.disabled ? "disabled" : ""}
              onChange={(e)=>{
                this.setData(e.target.name, e.target.value);
            }}
            />
          </div>
          <div className="namefulllast my-lg-1 my-0">
            <input
              type="text"
              name="Country"
              id="Landmark"
              value={this.state.data.Address[this.state.selected]?.Country}
              placeholder="Country"
              className="personalInput address_personalInput"
              disabled={this.state.disabled ? "disabled" : ""}
              onChange={(e)=>{
                this.setData(e.target.name, e.target.value);
            }}
            />
            <input
              type="text"
              name="Pin"
              id="PinCode"
              placeholder="Pin Code"
              className="personalInput address_personalInput"
              value={this.state.data.Address[this.state.selected]?.Pin}
              disabled={this.state.disabled ? "disabled" : ""}
              onChange={(e)=>{
                this.setData(e.target.name, e.target.value);
            }}
            />
          </div>
        </div>
        {!this.state.disabled && 
        <p className="check_box" style={{ marginLeft: "3%" }} >
            
          <label className="containerCheck" htmlFor="default-check">
            Set this as my default address
            <input type="checkbox" id="default-check" onChange={(e)=>{
            e.preventDefault()
            this.setDefault()
        }} />
            <span className="checkMark"></span>
          </label>
        </p>}
        <div className="addressradio">
      
          {this.state.data.Address.map((address, key) => {
            return (
              <div className="form-check" key={key}>
                <input
                  className="form-check-input colorradio"
                  type="radio"
                  name="flexRadioDefault"
                  id={"flexRadioDefault1"+ key}
                  checked={this.state.selected == key? true: false}
                  onChange={(e) => {
                      this.setState({selected: key})
                      document.getElementById("default-check").checked = false
                  }}
                />
                <label
                  className="form-check-label fontP"
                  htmlFor={"flexRadioDefault1"+ key}
                >
                 {address.AddressLine1 + ", " + address.AddressLine2 +", "+ address.City +", "+ address.State +", "+ address.Country +"- "+ address.Pin}
                </label>
              </div>
            );
          })}
            <p className="headedit" onClick={this.addNewAddress.bind(this)}>
            Add new
          </p>
          {!this.state.disabled && (
            <div className="button_box_1new">
              <button
                id="continue_shopping"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.editUser(this.state.data);
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <p className="lastLinepersonal">
          ** All this information will not be shared with anyone. We believe in
          privacy and it shall be given to all our customers.**
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.getUser.user,
    userLoading: state.getUser.loading
  };
};
export default connect(mapStateToProps, { editUser })(AddressProfile);
