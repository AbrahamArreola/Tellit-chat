import React, {useState, createRef} from "react";
import { withRouter } from "react-router-dom";

import "../../styles/register-page.scss";
import "../../styles/access-form.scss";
import loginImage from "../../images/logo.JPG";

import ImageCarousel from "./image-carousel";

function RegisterPage() {

  const [state, setState] = useState({
    iconClass: "fa fa-eye-slash",
    inputType: "password",
    showPassword: false
  });

  const inputs = {
    email: createRef(),
    name: createRef(),
    username: createRef(),
    password: createRef()
  }

  const showPassword = () => {
    if(!state.showPassword){
      setState({iconClass: "fa fa-eye", inputType: "text", showPassword: true});
    }
    else{
      setState({iconClass: "fa fa-eye-slash", inputType: "password", showPassword: false});
    }
  }

  const SubmitData = () => {

  }

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
          <input type="email" placeholder="Email" ref={inputs.email}/>
          <input type="text" placeholder="Complete name" ref={inputs.name}/>
          <input type="text" placeholder="Username" ref={inputs.username}/>
          <div id="password-show">
            <input type={state.inputType} placeholder="Password" ref={inputs.password}/>
            <i className={state.iconClass} onClick={showPassword}></i>
          </div>
          <button type="button" className="btn btn-primary" onClick={SubmitData}>
            Sign up
          </button>
        </div>

        <div className="secondary-access-box form-box">
          <p>Do you have an account?</p>
          <a href="/">Log in</a>
        </div>
      </div>
      <ImageCarousel />
      <footer>Abraham Arreola - {new Date().getFullYear()}</footer>
    </div>
  );
}

export default withRouter(RegisterPage);
