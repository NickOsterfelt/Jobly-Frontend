
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from "./NavBar"
import Routes from "./Routes"
import React, { useEffect, useState } from 'react';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("_token")) {
      setLoggedIn(true);
    }
    else {
      setLoggedIn(false)
    }
  }, [loggedIn, setLoggedIn]);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem("_token", "");
    
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar loggedIn={loggedIn} />
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-10 mt-5">
              <Routes loggedIn={loggedIn} handleLogout={handleLogout} handleLogin={setLoggedIn.bind(true)} />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
