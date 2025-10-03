import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { login } from "../../services/auth.js";
import "./Login.css";

const Login = ({ setIsLoggedIn, setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email }); // send { email } to backend
      // save token to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
      setIsLoggedIn(true);
    } catch (err) {
      setError("Login failed. Check your email.");
      console.error(err);
    }
  };

  return (
    <div className="login">
      <div className="form-wrapper">
        <Form layout="vertical" onSubmitCapture={handleSubmit}>
          <Form.Item label={"Enter Email"}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          Don’t have an account?{" "}
          <Button type="link" onClick={() => setShowLogin(false)}>
            Signup here
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Login;
