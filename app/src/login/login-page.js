import React from "react";
import "../styles/login-page.scss";
import loginImage from "../images/logo.JPG";
import carImg1 from "../images/talk-img.JPG";
import carImg2 from "../images/share-img.png";
import carImg3 from "../images/group-img.JPG";

class Login extends React.Component {
  render() {
    return (
      <div id="container">
        <div id="img">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleCaptions"
                data-slide-to="0"
                className="active"
              ></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={carImg1} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Talk with your friends</h5>
                  <p>You can chat with your friends anywhere</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={carImg2} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Share documents</h5>
                  <p>
                    Share whatever you want like important documents, images or
                    music
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={carImg3} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Chat in group</h5>
                  <p>Create chat groups where you can chat with many friends</p>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleCaptions"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleCaptions"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div id="form">
          <div id="login" className="form-box">
            <img src={loginImage} alt="unavailable" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="button" className="btn btn-primary">
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

          <div id="register" className="form-box">
            <p>You don't have an account?</p>
            <a href="...">Sign up</a>
          </div>
        </div>

        <footer>Abraham Arreola - {new Date().getFullYear()}</footer>
      </div>
    );
  }
}

function App() {
  return <Login />;
}

export default App;
