import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const nums = [1, 2, 3, 4, 5];
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", {  email, password })
      .then((result) => {
        console.log(result);
        // Optionaly redirect or show success message here
        navigate('/home');
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

 

  return (
     <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
          <div className="p-4 rounded w-25 bg-black text-white">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label htmlFor="floatingEmail" className="form-label text-white">
                  Email
                </label>
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingEmail">Email address</label>
                </div>
              </div>
    
              
              <div className="mb-4">
                <label htmlFor="floatingPassword" className="form-label text-white">
                  Password
                </label>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
              </div>
    
             
              <div className="d-grid">
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
              </div>
              <div className="text-center mt-3">
                <p>Already have an account?</p>
                <Link to="/home" className="btn btn-success">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
  );
};

export default Login;
