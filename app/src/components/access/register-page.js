import React from "react";
import { withRouter } from "react-router-dom";

import "../../styles/register-page.scss";
import "../../styles/access-form.scss";
import loginImage from "../../images/logo.JPG";

import ImageCarousel from "./image-carousel";

class RegisterPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      iconClass: "fa fa-eye-slash",
      inputType: "password",
      showPassword: false
    }
  }

  showPassword = () =>{
    if(!this.state.showPassword){
      this.setState({iconClass: "fa fa-eye", inputType: "text", showPassword: true});
    }
    else{
      this.setState({iconClass: "fa fa-eye-slash", inputType: "password", showPassword: false});
    }
  }

  render() {
    return (
      <div id="register-form-container">
        <div className="access-form">
          <div className="main-access-box form-box">
            <img src={loginImage} alt="unavailable" />
            <p>
              Create an account to start to chat with your friends
            </p>
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
            <div id="separator">
              <hr />
              <p>Or</p>
              <hr />
            </div>
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Complete name" />
            <input type="text" placeholder="Username" />
            <div id="password-show">
              <input type={this.state.inputType} placeholder="Password" />
              <i className={this.state.iconClass} onClick={this.showPassword}></i>
            </div>
            <button type="button" className="btn btn-primary">
              Sign up
            </button>
          </div>

          <div className="secondary-access-box form-box">
            <p>Do you have an account?</p>
            <a href="/">Log in</a>
          </div>
        </div>
        <ImageCarousel />
      </div>
    );
  }
}

export default withRouter(RegisterPage);
