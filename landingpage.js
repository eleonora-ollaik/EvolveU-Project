var NewComponent = React.createClass({
    render: function() {
      return (
        <div>
          {/* Hello world */}
          <div className="awesome" style={{border: '1px solid red'}}>
            <label htmlFor="name">Enter your name: </label>
            <input type="text" id="name" />
          </div>
          <p>Enter your HTML here</p>
          <link rel="stylesheet" href="landingpage.css" />
          <style dangerouslySetInnerHTML={{__html: "\n/*assign full width inputs*/ \ninput[type=text], \n    input[type=password] { \n        width: 100%; \n        padding: 12px 20px; \n        margin: 8px 0; \n        display: inline-block; \n        border: 1px solid #ccc; \n        box-sizing: border-box; \n    } \n    \n    /*set a style for the buttons*/ \n    button { \n        background-color: #4CAF50; \n        color: white; \n        padding: 14px 20px; \n        margin: 8px 0; \n        border: none; \n        cursor: pointer; \n        width: 100%; \n    } \n    \n    /* set a hover effect for the button*/ \n    button:hover { \n        opacity: 0.8; \n    } \n    \n    /*set extra style for the cancel button*/ \n    .cancelbtn { \n        width: auto; \n        padding: 10px 18px; \n        background-color: #f44336; \n    } \n    \n    /*centre the display image inside the container*/ \n    .imgcontainer { \n        text-align: center; \n        margin: 24px 0 12px 0; \n        position: relative; \n    } \n    \n    /*set image properties*/ \n    img.avatar { \n        width: 40%; \n        border-radius: 50%; \n    } \n    \n    /*set padding to the container*/ \n    .container { \n        padding: 16px; \n    } \n      \n    /*set the forgot password text*/ \n    span.psw { \n        float: right; \n        padding-top: 16px; \n    } \n    \n    /*set the Modal background*/ \n    .modal { \n        display: none; \n        position: fixed; \n        z-index: 1; \n        left: 0; \n        top: 0; \n        width: 100%; \n        height: 100%; \n        overflow: auto; \n        background-color: rgb(0, 0, 0); \n        background-color: rgba(0, 0, 0, 0.4); \n        padding-top: 60px; \n    } \n    \n    /*style the model content box*/ \n    .modal-content { \n        background-color: #fefefe; \n        margin: 5% auto 15% auto; \n        border: 1px solid #888; \n        width: 80%; \n    } \n    \n    /*style the close button*/ \n    .close { \n        position: absolute; \n        right: 25px; \n        top: 0; \n        color: #000; \n        font-size: 35px; \n        font-weight: bold; \n    } \n      \n    .close:hover, \n    .close:focus { \n        color: red; \n        cursor: pointer; \n    } \n    \n    /* add zoom animation*/ \n    .animate { \n        -webkit-animation: animatezoom 0.6s; \n        animation: animatezoom 0.6s \n    } \n      \n    @-webkit-keyframes animatezoom { \n        from { \n            -webkit-transform: scale(0) \n        } \n        to { \n            -webkit-transform: scale(1) \n        } \n    } \n      \n    @keyframes animatezoom { \n        from { \n            transform: scale(0) \n        } \n        to { \n            transform: scale(1) \n        } \n    } \n      \n    @media screen and (max-width: 300px) { \n        span.psw { \n            display: block; \n            float: none; \n        } \n        .cancelbtn { \n            width: 100%; \n        } \n    } \n    " }} />
          <img src="https://bit.ly/39l0xpu" alt="quizeralogo" width={800} height={500} />
          <img src="https://bit.ly/3hpsxv0" alt="beckdlogo" style={{width: '150px', height: '150px'}} />
          {/*Step 1 : Adding HTML*/}
          <button onclick="document.getElementById('id01').style.display='block'" style={{width: 'auto'}}>Login</button>
          <div id="id01" className="modal">
            <form className="modal-content animate" action="/action_page.php">
              <div className="imgcontainer">
                <span onclick="document.getElementById('id01').style.display='none'" className="close" title="Close Modal">×</span>
                <img src="https://bit.ly/39l0xpu" alt="Avatar" className="avatar" />
              </div>
              <div className="container">
                <label><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required />
                <label><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required />
                <button type="submit">Login</button>
                <input type="checkbox" defaultChecked="checked" /> Remember me
              </div>
              <div className="container" style={{backgroundColor: '#f1f1f1'}}>
                <button type="button" onclick="document.getElementById('id01').style.display='none'" className="cancelbtn">Cancel</button>
                <span className="psw">Forgot <a href="#">password?</a></span>
              </div>
            </form>
          </div>
        </div>
      );
    }
  });
