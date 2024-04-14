import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Assuming you have the same CSS file for both Signup and Signin
import HeadingComp from "./HeadingComp";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const Signin = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1000/api/v1/signin", inputs)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const userData = response.data.user;
          if (userData && userData._id) {
            localStorage.setItem("user", JSON.stringify(userData));
            // Here you're saving the user data, but not the JWT token
            // You should save the token instead
            // Example assuming the token is returned in response.data.token:
            localStorage.setItem("token", response.data.token);
            sessionStorage.setItem("id", userData._id);
            dispatch(authActions.login());
          } else {
            console.log("No _id found in response data.user");
          }
          alert(response.data.message);
          navigate("/todo");
          setInputs({ email: "", password: "" });
        }
      })
      .catch((error) => {
        // Error handling code...
      });
  };

  return (
    <div className="signin">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter your Email"
                onChange={handleChange}
                value={inputs.email}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter your Password"
                onChange={handleChange}
                value={inputs.password}
              />
              <button className="btn p-2" onClick={handleSubmit}>
                SignIn
              </button>
            </div>
          </div>
          <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
            <HeadingComp first="Sign" second="In" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
