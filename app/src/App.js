import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./components/access/login-page";
import RegisterPage from "./components/access/register-page";
import ChatPage from "./components/chat_page/chat-page";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LoginPage} />
      <Route path="/login-page" component={LoginPage}/>
      <Route path="/chat-page" component={ChatPage} />
      <Route path="/register" component={RegisterPage} />
    </BrowserRouter>
  );
}

export default App;
