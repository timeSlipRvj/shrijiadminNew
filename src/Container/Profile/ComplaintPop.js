import React, { Component } from "react";
import api from "../../Apis/api";

class ComplaintPop extends Component {
  state = {
    data: {
      Subject: "",
      Country: "",
      OrderId: "",
      Phone: "",
      Body: "",
      image: [],
    },
  };

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
                    {!this.props.view && 
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
                      readOnly={this.props.view}
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
                      readOnly={this.props.view}
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
                      readOnly={this.props.view}
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
                      placeholder="Phone Number"
                      readOnly={this.props.view}
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
                      readOnly={this.props.view}
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
    );
  }
}

export default ComplaintPop;
