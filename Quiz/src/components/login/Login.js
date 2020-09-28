import React, { useState } from "react";
import "./Login.css";
import { Auth } from "aws-amplify";

export default function Login(props) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return emailOrUsername.length > 0 && password.length > 0 ;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const user = await Auth.signIn(emailOrUsername, password);
      props.auth.setUser(user)
      props.auth.handleLoggedIn();
    } catch (e) {
      console.log("Catch", event)
      alert(e.message);
    }
  }

  return (
      <div>
        <form className="login-form" id="login">
            <h1>Login</h1>
             <div>
                 <label htmlFor="login">Username or email</label> 
                 <input 
                    type="text" name="username" placeholder="Username or Email" 
                    autoFocus
                    value={emailOrUsername}
                    onChange={e => setEmailOrUsername(e.target.value)} 
                />
            </div>  

            <div>
                <input 
                    type="password" name='password' placeholder="Password" required 
                    value={password}
            
                    onChange={e => setPassword(e.target.value)}
                /> 
            </div>
            <div>
                <button type="submit" disabled={!validateForm()} onClick={(e) => handleSubmit(e)}>Continue</button>

            </div>
            <div>
              <button className='btnForgot'>Forgot password?</button>
            </div>       
        </form>
      </div>
  );
}