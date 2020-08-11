import React, { useState } from "react";
import "./Login.css";
import { Auth } from "aws-amplify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Before try", event)
    try {
      console.log("Within try", event)
      await Auth.signIn(email, password);
      alert("Logged in");
    } catch (e) {
      console.log("Catch", event)
      alert(e.message);
    }
  }

  return (
      <div>
        <form class="login-form">
            <h1>Login</h1>
            <div>
                <label for="login">Username or email</label>
                <input 
                    type="text" controlId="email" name="login" placeholder="Username or email" required
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
            </div>
            <div>
                <label for="password">Password</label>
                <input 
                    type="password" controlId="password" name='password' placeholder="Password" required 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                /> 
            </div>
            <div>
                <button type="submit" disabled={!validateForm()} onClick={(e) => handleSubmit(e)}>Continue</button>
            </div>       
        </form>
      </div>
  );
}