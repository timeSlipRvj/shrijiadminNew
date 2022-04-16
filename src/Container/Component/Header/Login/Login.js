import React, { Component } from "react";
import { connect } from "react-redux";
import "./Login.css";
import { loginUser, registerUser } from "../../../../Redux/Actions/UserActions";
import { CgProfile } from "react-icons/cg";
import {siteUrl} from '../../../../Utils/util'
class Login extends Component {
  state = {
    data: {
      Email: "",
      Password: "",
    },
    user: {
      "First Name": "",
      "Last Name": "",
      "Email": "",
      "Password": "",
      "Confirm": "",
      Roles: [],
      Permissions: [],
    },
    signin: true
  };
  setData = (key, val) => {
    const { data } = this.state;
    data[key] = val;
    this.setState({ data });
  };
  setUser = (key, val) => {
    const { user } = this.state;
    user[key] = val;
    this.setState({ user });
  };
  signIn = async() => {
    await this.props.loginUser(this.state.data.Email, this.state.data.Password);
    
      document.querySelector("#staticBackdrop").click();
  };
  signUp = () => {
    this.props.registerUser(this.state.user);
    document.querySelector("#staticBackdrop").click();
  }
  googleLogin = () => {
    window.location.href= siteUrl + "/auth/google"
  }
  render() {
    return (
      <React.Fragment>
      <div>
        <div
          className="imagevl mt-0"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          id="pfp"
        >
          <span className="large_screen_text"><CgProfile id="profile_icon" style={{fontSize: "2.5em"}}/></span>
          <span className="small_screen_text"><CgProfile id="profile_icon" /></span>
        </div>
      </div>
          <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-keyboard="false"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog login">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title logoval" id="staticBackdropLabel">
                  Lokostop
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <p className="promiseword">
                We promise products from best brands with assurance.
              </p>
              <div className="modal-body modalPadding">

                <ul
                  className="nav nav-pills mb-3 signval"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item " role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                      style={{fontWeight: this.state.signin?"600":"400"}}
                      onClick={(e) => {
                        this.setState({signin:true})
                      }}
                    >
                      Sign In
                    </button>
                  </li>
                  <li className="nav-item " role="presentation">
                    <button
                      className="nav-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                      style={{fontWeight: this.state.signin?"400":"600"}}
                      onClick={(e) => {
                        this.setState({signin:false})
                      }}
                    >
                      Sign Up
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="modal_signin_input text-center">
                      <input
                        className="signinput"
                        name="Email"
                        type="text"
                        placeholder="Email-address"
                        value={this.state.data.Email}
                        onChange={(e) =>
                          this.setData(e.target.name, e.target.value)
                        }
                      />
                      <input
                        className="signinput"
                        name="Password"
                        type="password"
                        placeholder="Password"
                        value={this.state.data.Password}
                        onChange={(e) =>
                          this.setData(e.target.name, e.target.value)
                        }
                      />
                      <button className="forgotbutton" style={{visibility: "hidden"}}>forgot password?</button>
                      <button
                        className="signButton"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          this.signIn();
                        }}
                      >
                        SIGN - IN
                      </button>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <div style={{textAlign: "center"}}>
                      <div className="signup_signinput_box">
                        <input
                          className="signinput signup_signinput"
                          type="text"
                          name="First Name"
                          placeholder="First Name"
                          value={this.state.user["First Name"]}
                          onChange={(e) => {
                            this.setUser(e.target.name, e.target.value)
                          }}
                        />
                        <input
                          className="signinput signup_signinput"
                          type="text"
                          name="Last Name"
                          placeholder="Last Name"
                          value={this.state.user["Last Name"]}
                          onChange={(e) => {
                            this.setUser(e.target.name, e.target.value)
                          }}
                        />
                      </div>
                      <input
                        className="signinput"
                        type="email"
                        placeholder="Email-address"
                        name="Email"
                        value={this.state.user.Email}
                        onChange={(e) => {
                          this.setUser(e.target.name, e.target.value)
                        }}
                      />
                      <div className="signup_signinput_box">
                        <input
                          className="signinput signup_signinput"
                          type="password"
                          name="Password"
                          placeholder="Enter Password"
                          value={this.state.user.Password}
                          onChange={(e) => {
                            this.setUser(e.target.name, e.target.value)
                          }}
                        />
                        <input
                          className="signinput signup_signinput"
                          type="password"
                          name="Confirm"
                          value={this.state.user.Confirm}
                          placeholder="Re-enter password"
                          onChange={(e) => {
                            this.setUser(e.target.name, e.target.value)
                          }}
                        />
                      </div>
                      <button className="signButton" onClick={(e) => {
                        e.preventDefault();
                        this.signUp();
                      }}>SIGN - UP</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer googleface">
                <p className="orWord">OR</p>
                <div className="social_signin">
                <button type="button" className="btn signgoogle" onClick={(e) => {e.preventDefault(); this.googleLogin();}}>
                <span className="large_screen_text_425">
                  Sign in with google
                  </span>
                  <span className="small_screen_text_425">
                  Google
                  </span>
                </button>
                {/* <button type="button" className="btn signface">
                <span className="large_screen_text_425">
                  Sign in with Facebook
                  </span>
                  <span className="small_screen_text_425">
                  Facebook
                  </span>
                </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.loginUser.user,
    error: state.loginUser.error
  };
};
export default connect(mapStateToProps, { loginUser, registerUser })(Login);
