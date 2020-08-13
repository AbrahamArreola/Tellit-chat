import React, {useState} from "react";
import { withRouter } from "react-router-dom";

import "../../styles/login-page.scss";
import "../../styles/access-form.scss";
import loginImage from "../../images/logo.JPG";

import ImageCarousel from "./image-carousel";

function LoginPage(props){

  const [state, setState] = useState({
    iconClass: "fa fa-eye-slash",
    inputType: "password",
    showPassword: false
  });

  const showPassword = () => {
    if(!state.showPassword){
      setState({iconClass: "fa fa-eye", inputType: "text", showPassword: true});
    }
    else{
      setState({iconClass: "fa fa-eye-slash", inputType: "password", showPassword: false});
    }
  }

  const submitLogin = () =>{
    props.history.push("/chat-page");
  }

  return (
    <div id="login-form-container">
      <ImageCarousel />
      <div className="access-form">
        <div className="main-access-box form-box">
          <img src={loginImage} alt="unavailable" />
          <input type="email" placeholder="Email" />
          <div id="password-show">
            <input type={state.inputType} placeholder="Password" />
            <i className={state.iconClass} onClick={showPassword}></i>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={submitLogin}
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

export default withRouter(LoginPage);
