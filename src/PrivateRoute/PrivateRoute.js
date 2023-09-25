import React from "react";
import { Route, useNavigate } from "react-router-dom";

const auth = localStorage.getItem("accessToken");

const PrivateRoute = ({ element: Component, ...rest }) => (
  
  <Route
    
    rest
    render={(props) =>
      auth ? (
        <Component {...props} {...rest}></Component>
      ) : (
        <useNavigate to="/login"></useNavigate>
        
      )
    }
  ></Route>
);

export default PrivateRoute;
