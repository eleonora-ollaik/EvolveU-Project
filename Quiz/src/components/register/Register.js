import React, { useState } from "react";
import "../login/Login.css";
import { Auth } from "aws-amplify";
// import net from "../../business/netcomm"
// import net from "../../fetch-data.util.js"

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  // {
  //   "cognito_id": "123-45a",
  //   "user_email": "value2@gmail.com",
  //   "username": "blablabla"
  // }
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

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
      
      // let responseData;
      // let url ='https://0y0lbvfarc.execute-api.ca-central-1.amazonaws.com/dev/user'
      // let user = await Auth.currentUserInfo()
      // let webdata = {
      //   "cognito_id": user.attributes.sub,
      //   "user_email": email,
      //   "username": username
      // }

      // console.log('this is user webdata', webdata);

      // responseData = await net.postData(url, webdata);

      // if (responseData.status >= 500) {
      //   throw (new Error(`${responseData.status} ${responseData.message}`))
      // }
      // else {
      //   console.log('User saved')
      // }
      // setConfirmEmail(email);
      console.log("newUser from Register", newUser)
    } catch (e) {
      alert("Failed", e)
    }
  }
  // async function handleConfirmCode(event) {
  //   event.preventDefault();
  
  //   try {

  //     // console.log('this is before')
  //     await Auth.confirmSignUp(email);
  //     // console.log(username, confirmationCode)
  //     // await Auth.signIn(username, password);
  //     alert("Your registration has been successfully confirmed!")
  //   } catch (e) {
  //     alert("Registration failed! ", e);
  //   }
  // }

  return (
      <div>
        <form className="login-form" >
            <h1>Register</h1>
            <div>
                <input 
                    autoComplete="new-password"
                    type="text" name="login" placeholder="Email" required
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />
            </div>
            <div>
                <input 
                    autoComplete="new-password"
                    type="text" name="username" placeholder="Username" required
                    value={username}
                    onChange={e => setUsername(e.target.value)} 
                />
            </div>
            <div>
                <input 
                    autoComplete="new-password"
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