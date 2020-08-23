import React, { useState } from "react";
import "../login/Login.css";
import { Auth } from "aws-amplify";

export default function Register() {
  const [emailR, setEmailR] = useState("");
  const [nicknameR, setNicknameR] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState(null);

  function validateForm() {
    return emailR.length > 0 && passwordR.length > 0;
  }

  function validateCode() {
    return confirmationCode > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Works", emailR, nicknameR, passwordR)
    try {
      const newUser = await Auth.signUp({
        username: emailR,
        nickname: nicknameR,
        password: passwordR,
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
      await Auth.confirmSignUp(emailR, confirmationCode);
      await Auth.signIn(emailR, passwordR);
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
                <input 
                    type="text" name="login" placeholder="Email" required
                    value={emailR}
                    onChange={e => setEmailR(e.target.value)} 
                />
            </div>
            <div>
                <input 
                    type="text" name="nickname" placeholder="Nickname" required
                    value={nicknameR}
                    onChange={e => setNicknameR(e.target.value)} 
                />
            </div>
            <div>
                <input 
                    type="password" name='password' placeholder="Password" required 
                    value={passwordR}
                    onChange={e => setPasswordR(e.target.value)}
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