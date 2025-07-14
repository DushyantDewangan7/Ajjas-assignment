import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log("User location:", latitude, longitude);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        console.log("Success:", result.data);
        // Optionally redirect or show success message here
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
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="floatingName" className="form-label text-white">
              Name
            </label>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="floatingName">Enter Name</label>
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Submit & Link */}
          <div className="d-grid">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
          <div className="text-center mt-3">
            <p>Already have an account?</p>
            <Link to="/login" className="btn btn-success">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
