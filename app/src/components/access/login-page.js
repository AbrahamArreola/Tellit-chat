import React from "react";
import { withRouter } from "react-router-dom";

import "../../styles/login-page.scss";
import "../../styles/access-form.scss";
import loginImage from "../../images/logo.JPG";

import ImageCarousel from "./image-carousel";

class LoginPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      iconClass: "fa fa-eye-slash",
      inputType: "password",
      showPassword: false
    }
  }

  showPassword = () => {
    if(!this.state.showPassword){
      this.setState({iconClass: "fa fa-eye", inputType: "text", showPassword: true});
    }
    else{
      this.setState({iconClass: "fa fa-eye-slash", inputType: "password", showPassword: false});
    }
  }

  submitLogin = () =>{
      this.props.history.push("/chat-page");
  }

  render() {
    return (
      <div id="login-form-container">
        <ImageCarousel />
        <div className="access-form">
          <div className="main-access-box form-box">
            <img src={loginImage} alt="unavailable" />
            <input type="email" placeholder="Email" />
            <div id="password-show">
              <input type={this.state.inputType} placeholder="Password" />
              <i className={this.state.iconClass} onClick={this.showPassword}></i>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.submitLogin}
            >
              Log in
            </button>

            <div id="separator">
              <hr />
              <p>Or</p>
              <hr />
            </div>
            <p>Login with Google</p>
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
          </div>

          <div className="secondary-access-box form-box">
            <p>You don't have an account?</p>
            <a href="/register">Sign up</a>
          </div>
        </div>

        <footer>Abraham Arreola - {new Date().getFullYear()}</footer>
      </div>
    );
  }
}

export default withRouter(LoginPage);
