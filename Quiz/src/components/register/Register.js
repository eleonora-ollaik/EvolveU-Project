import React, { useState } from "react";
import "./Register.css";
import { Auth } from "aws-amplify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState(null);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function validateCode() {
    return confirmationCode > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Works", email, nickname, password)
    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password,
      });
      alert("Registered successfully!")
      setConfirmEmail(true);
    } catch (e) {
      alert("Failed", e)
    }
  }

  async function handleConfirmCode(event) {
    event.preventDefault();
  
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);
      alert("Your registration has been successfully confirmed!")
    } catch (e) {
      alert("Registration failed! ", e);
    }
  }

  return (
      <div>
        <form className="login-form">
            <h1>Register</h1>
            <div>
                <label htmlFor="login">Email</label>
                <input 
                    type="text" name="login" placeholder="Email" required
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
            </div>
            <div>
                <label htmlFor="nickname">Nickname</label>
                <input 
                    type="text" name="nickname" placeholder="Nickname" required
                    value={nickname}
                    onChange={e => setNickname(e.target.value)} 
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                    type="password" name='password' placeholder="Password" required 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                /> 
            </div>
            <div>
                <button type="submit" disabled={!validateForm()} onClick={(e) => handleSubmit(e)}>Continue</button>
            </div>       
        </form>
        <div>
          {confirmEmail? 
            <div>
                <div>Confirm Email</div>
                <label htmlFor="confirmEmail">Confirmation Code</label>
                <input 
                    type="number" name="confirmationCode" placeholder="Enter your confirmation code" required
                    autoFocus
                    value={confirmationCode}
                    onChange={e => setConfirmationCode(e.target.value)} 
                />
                <div>
                    <button type="submit" disabled={!validateCode()} onClick={(e) => handleConfirmCode(e)}>Continue</button>
                </div>       
            </div>
          : null}
        </div>
      </div>
  );
}