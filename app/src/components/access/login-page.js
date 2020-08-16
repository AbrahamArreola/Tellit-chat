import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import "../../styles/login-page.scss";
import "../../styles/access-form.scss";
import loginImage from "../../images/logo.JPG";

import ImageCarousel from "./image-carousel";

const VALID_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function LoginPage(props) {
  const [state, setState] = useState({
    iconClass: "fa fa-eye-slash",
    inputType: "password",
    showPassword: false,
  });

  const [inputs, setInputs] = useState({
    email: { value: "", color: null },
    password: { value: "", color: null },
  });

  let auxDict = Object.assign({}, inputs);

  const [displayError, setDisplayError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const showPassword = () => {
    if (!state.showPassword) {
      setState({
        iconClass: "fa fa-eye",
        inputType: "text",
        showPassword: true,
      });
    } else {
      setState({
        iconClass: "fa fa-eye-slash",
        inputType: "password",
        showPassword: false,
      });
    }
  };

  const handleInputChange = (e) => {
    auxDict[e.target.name].value = e.target.value;
    auxDict[e.target.name].color = null;

    setInputs(auxDict);
  };

  const RenderError = () => {
    if (displayError) {
      return (
        <div
          className="alert alert-danger"
          role="alert"
          style={{ width: "80%", padding: "4px", textAlign: "center" }}
        >
          {errorMsg}
        </div>
      );
    }

    return null;
  };

  const loginUser = async () => {
    const user = {
      email: inputs.email.value,
      password: inputs.password.value
    };

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    try{
      let response = await fetch('http://localhost:9000/login-user', config);
      let data = await response.json();

      if(!data.ok){
        if(data.field){
          switch(data.field){
            case "email":
              auxDict.email.color = "red";
              setErrorMsg(data.message);
            break;

            case "password":
              auxDict.password.color = "red";
              setErrorMsg(data.message);
            break;

            default: break;
          }
          setDisplayError(true);
        }
      }
      else{
        localStorage.setItem('token', data.token);
        props.history.push('/chat-page');
      }
    } catch(err){
      console.log(err);
    }
  }

  const submitLogin = () => {
    let filledFields = true;
    let errorExists = true;

    for (var key in inputs) {
      if (inputs[key].value === "") {
        auxDict[key].color = "red";
        filledFields = false;
      }
    }

    if(!filledFields){
      setErrorMsg("One or more fields are required");
    }
    else if(!inputs.email.value.match(VALID_EMAIL)){
      auxDict.email.color = "red";
      setErrorMsg("Invalid email");
    }
    else{
      errorExists = false;
      loginUser();
    }

    setDisplayError(errorExists);
  };

  return (
    <div id="login-form-container">
      <ImageCarousel />
      <div className="access-form">
        <div className="main-access-box form-box">
          <img src={loginImage} alt="unavailable" />
          <RenderError />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
            style={{ borderColor: inputs.email.color }}
          />
          <div
            id="password-show"
            onChange={handleInputChange}
            style={{ borderColor: inputs.password.color }}
          >
            <input
              type={state.inputType}
              placeholder="Password"
              name="password"
            />
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
