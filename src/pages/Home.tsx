import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove the authentication flag from localStorage
    history.push("/login"); // Redirect to the login page
  };

  return (
    <div className="login-main">
      <h1>Home page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
