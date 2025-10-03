import React, { useState } from 'react'
import {Form, Input, Button} from'antd'

const Signup = ({setShowLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault();
      
      if (email && password) {
          alert("Signup successful! Please login")
          setShowLogin(true)
      }
  };

  return (
    <div className="login">
      <div className="form-wrapper">
        <Form layout="vertical">
          <Form.Item label={"Enter Email"}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label={"Enter Password"}>
            <Input type="password" />
                  </Form.Item>
                  <Button type="primary">Signup</Button>
              </Form>
                  <p>
        Already have an account?{" "}
        <Button onClick={() => setShowLogin(true)}>Login here</Button>
      </p>
      </div>
    </div>
  );
}

export default Signup
