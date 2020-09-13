import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import "../../styles/register-page.scss";
import "../../styles/access-form.scss";
import loginImage from "../../images/logo.JPG";

import ImageCarousel from "./image-carousel";

const APIRequests = require('../../utilities/api-requests');

const STRONG_PASSWORD = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";
const VALID_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function RegisterPage(props) {
  const [state, setState] = useState({
    iconClass: "fa fa-eye-slash",
    inputType: "password",
    showPassword: false,
  });

  const [inputs, setInputs] = useState({
    email: { value: "", color: null },
    name: { value: "", color: null },
    username: { value: "", color: null },
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

  const registerUser = async () => {
    const user = {
      name: inputs.name.value,
      username: inputs.username.value,
      email: inputs.email.value,
      password: inputs.password.value,
    };

    try{
      let data = await APIRequests.postRequest('http://localhost:9000/register-user', user);

      if(!data.ok){
        auxDict.email.color = "red";
        setErrorMsg(`${user.email} has already an account`);
        setDisplayError(true);
      }
      else{
        //localStorage.setItem('token', data.token);
        props.history.push({
          pathname: '/chat-page',
          state: {userID: data.newUser._id, displayProfile: true}
        });
      }
    } catch(err){
      alert(err);
    }
  };

  const SubmitData = () => {
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
    else if(!inputs.password.value.match(STRONG_PASSWORD)){
      auxDict.password.color = "red";
      setErrorMsg(
        "Password must contains at least one uppercase, lowercase, number and special character"
      );
    }
    else{
      errorExists = false;
      registerUser();
    }

    setDisplayError(errorExists);
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

  return (
    <div id="register-form-container">
      <div className="access-form">
        <div className="main-access-box form-box">
          <img src={loginImage} alt="unavailable" />
          <p>Create an account to start to chat with your friends</p>
          <div className="g-signin2" data-onsuccess="onSignIn"></div>
          <div id="separator">
            <hr />
            <p>Or</p>
            <hr />
          </div>
          <RenderError />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
            style={{ borderColor: inputs.email.color }}
          />
          <input
            type="text"
            placeholder="Complete name"
            name="name"
            onChange={handleInputChange}
            style={{ borderColor: inputs.name.color }}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
            style={{ borderColor: inputs.username.color }}
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
            onClick={SubmitData}
          >
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
