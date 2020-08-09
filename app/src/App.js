import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import loginPage from "./components/access/login-page";
import chatPage from "./components/chat_page/chat-page";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={loginPage} />
      <Route path="/chat-page" component={chatPage} />
    </BrowserRouter>
  );
}

export default App;
