import React, { useState } from "react";
import "./Login.css";
import { Auth } from "aws-amplify";

export default function Login(props) {
  // const [user, setUser] = useState(
  //   {email: "",
  //   username: "",
  //   password: ""}
  // )
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0 ;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(event.target.value)
    try {
      await Auth.signIn(username, password);
      props.handleLoggedIn();
      // alert("Logged in");
    } catch (e) {
      console.log("Catch", event)
      alert(e.message);
    }
  }

  return (
      <div>
        <form className="login-form">
            <h1>Login</h1>
            {/* <div> */}
                {/* <label htmlFor="login">Username or email</label> */}
                {/* <input 
                    type="text" name="login" placeholder="Email or username" 
                    autoFocus
                    // value={user.email}
                    value={email}
                    // onChange={e => setUser({[e.target.id]:e.target.value})} 
                    onChange={e => setEmail(e.target.value)} 
                />
            </div> */}
             <div>
                 <label htmlFor="login">Username or email</label> 
                 <input 
                    type="text" name="username" placeholder="Username" 
                    autoFocus
                    value={username}
                    onChange={e => setUsername(e.target.value)} 
                />
            </div>  

            <div>
                {/* <label htmlFor="password">Password</label> */}
                <input 
                    type="password" name='password' placeholder="Password" required 
                    value={password}
            
                    onChange={e => setPassword(e.target.value)}
                /> 
            </div>
            <div>
                <button type="submit" disabled={!validateForm()} onClick={(e) => handleSubmit(e)}>Continue</button>
                {/* <button type="submit" onClick={(e) => handleSubmit(e)}>Continue</button> */}

            </div>       
        </form>
      </div>
  );
}