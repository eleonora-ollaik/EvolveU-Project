import React, { useState } from "react";
import "../login/Login.css";
import { Auth } from "aws-amplify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmEmail, setConfirmEmail] = useState(false);
  // const [confirmationCode, setConfirmationCode] = useState(null);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  // function validateCode() {
  //   return confirmationCode > 0;
  // }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Works", email, username, password)
    try {
      const newUser = await Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email

        }
      });
      alert("Your confirmation email is on the way!")
      // setConfirmEmail(email);
      console.log("newUser from Register", newUser)
    } catch (e) {
      alert("Failed", e)
    }
  }
  async function handleConfirmCode(event) {
    event.preventDefault();
  
    try {

      // console.log('this is before')
      await Auth.confirmSignUp(email);
      // console.log(username, confirmationCode)
      // await Auth.signIn(username, password);
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
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
            </div>
            <div>
                <input 
                    type="text" name="username" placeholder="Username" required
                    value={username}
                    onChange={e => setUsername(e.target.value)} 
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
        </form>
        <div>
          
        </div>
      </div>
  );
}