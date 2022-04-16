import React, { Component } from "react";
import ComplaintPop from "./ComplaintPop";
import api from '../../Apis/api'
import { connect } from "react-redux";

class Complaint extends Component {
  state = {
    view: false,
    complaints: [],
    selected: {},
    data: {
      Subject: "",
      Country: "",
      OrderId: "",
      Phone: "",
      Body: "",
      image: [],
    },
  };
  componentDidMount() {
    let url = "/complaint/getByUser/"+this.props.user._id
    api.get(url).then(res=>{
      console.log(res.data.data)
      this.setState({complaints: res.data.data});
    }).catch(err=>{
      console.log(err)
    })
  }
  setData = (key, val) => {
    const { data } = this.state;
    data[key] = val;
    this.setState({ data });
  };
  handleSubmit = () =>{
    const {data} = this.state;
    const formData = new FormData()
    // data.image.forEach(img=>{
      formData.append("image", data.image);
    // })
    
    formData.append("Country", data.Country)
    formData.append("OrderId", data.OrderId)
    formData.append("Phone", data.Phone)
    formData.append("Subject", data.Subject)
    formData.append("Body", data.Body)
    api.post("/complaint", formData).then(res=>{
        console.log(res.data.data)
        this.componentDidMount()
    }).catch(err=>{
        console.log(err)
    })
  }
  emptyData = () => {
    this.setState({data: {
        Subject: "",
        Country: "",
        OrderId: "",
        Phone: "",
        Body: "",
        image: [],
      }})
  }
  render() {
    return (
      <div>
        <p className="complaintshead" style={{ marginTop: "2%" }}>
          My Complaints
        </p>
        <div className="scroll_x_box table-responsive px-3">
          <table className="table table-borderless col_names1">
            <thead>
              <tr className="table_headingnew2">
              <th className="">
                  <span className="large_screen_text">SNO</span>
                  <span className="small_screen_text">SNO</span>
                </th>
                <th className="">
                  <span className="large_screen_text"> HEADING</span>
                  <span className="small_screen_text">HEADING</span>
                </th>
                <th className="">
                  <span className="large_screen_text">COMPLAINT ID</span>
                  <span className="small_screen_text">ID</span>
                </th>
                <th className="">
                  <span className="large_screen_text">STATUS</span>
                  <span className="small_screen_text">STATUS</span>
                </th>
                <th className="">
                  <span className="large_screen_text">REPLIED</span>
                  <span className="small_screen_text">REPLIED</span>
                </th>
                <th className="">
                  <span className="large_screen_text">VIEW</span>
                  <span className="small_screen_text">VIEW</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.complaints.map((complaint, key) => {
                return (
                  <tr className="" key={key}>
                    <td className="product_price1new">{complaint.ID}</td>
                    <td className="product_price1new">
                     {complaint.Subject}
                    </td>
                    <td className="product_price1new">
                    {complaint._id}
                    </td>
                    <td className="product_price1new">Sent</td>
                    <td className="product_price1new"><div >
                      <select className="dropdown_colors1" value={complaint.Read}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </div></td>
                    <td className="product_price1new">
                    <button
                      style={{ outline: "none" }}
                      type="button"
                      className="btn btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={(e) => this.setState({ view: true, data: {...complaint, OrderId: complaint.OrderId?._id} })}
                    >
                      View Details
                    </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      
       <button
          style={{ outline: "none" }}
          type="button"
          className="btn complaintbutton"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={(e) =>{ 
            if(this.state.view)
              this.emptyData()
            this.setState({ view: false })}}
        >
          WRITE COMPLAINT
        </button>

        {/* <ComplaintPop view={this.state.view} selected={this.state.selected}/> */}
        <div
          style={{ background: " rgb(0,0,0,0.7)" }}
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="complaint-modal modal-dialog">
            <div style={{ marginTop: "34%" }} className="modal-content">
              <div style={{ borderBottom: "none" }} className="modal-header">
                <h5 className="Heading_add_blog" id="exampleModalLabel">
                  COMPLAINT SECTION
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                    {!this.state.view && 
                  <div className="form-group d-flex m-auto justify-content-center">
                    <input className="form-control m-2" type="file" multiple onChange={(e)=>{
                        this.setData("image", Array.from(e.target.files))
                    }}/>
                  </div>
  }
                  <div className="form-group d-flex m-auto justify-content-center">
                    <input
                      type="text"
                      className="form-control m-2"
                      name="Subject"
                      readOnly={this.state.view}
                      placeholder="Complaint Heading"
                      value={this.state.data.Subject}
                      onChange={(e) => {
                        this.setData(e.target.name, e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      className="form-control m-2"
                      name="Country"
                      readOnly={this.state.view}
                      placeholder="Country"
                      value={this.state.data.Country}
                      onChange={(e) => {
                        this.setData(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group d-flex m-auto justify-content-center">
                    <input
                      type="text"
                      className="form-control m-2"
                      readOnly={this.state.view}
                      name="OrderId"
                      placeholder="Order ID"
                      value={this.state.data.OrderId}
                      onChange={(e) => {
                        this.setData(e.target.name, e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      className="form-control m-2"
                      name="Phone"
                      placeholder="Email"
                      readOnly={this.state.view}
                      value={this.state.data.Phone}
                      onChange={(e) => {
                        this.setData(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group d-flex m-auto justify-content-center"></div>
                  <div className="form-group d-flex m-auto justify-content-center">
                    <textarea
                      className="form-control m-2"
                      name="Body"
                      readOnly={this.state.view}
                      rows="7"
                      placeholder="Start typing"
                      value={this.state.data.Body}
                      onChange={(e) => {
                        this.setData(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                </form>
              </div>
              <div
                style={{
                  borderTop: "none",
                  paddingBottom: "1vw",
                  paddingLeft: "0",
                }}
                className="modal-footer justify-content-evenly"
              >
                <button
                  type="button"
                  className="btn cancelBlog"
                  data-bs-dismiss="modal"
                  onClick={(e) =>{
                      this.emptyData()
                  }}
                >
                  Cancel Complaint
                </button>
                <button type="button" className="btn shareblog" onClick={(e)=>{
                    e.preventDefault();
                    this.handleSubmit()
                }}>
                  Share Complaint
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="mailId">Write to us at lokostop1@gmail.com</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.getUser.user,
  };
};
export default connect(mapStateToProps)(Complaint);