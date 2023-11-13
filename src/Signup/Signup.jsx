import {  useState } from "react";
import { register, creatUserDocument } from "../appwritetest";
import {  useNavigate } from "react-router-dom";
import mylogo from '../images/mylogo.png';
import Alert from "../Alert";
import InputControls from "../InputControls/InputControls";
import styles from "./Signup.module.css";
export default function SignUp(props) {
  const navigate = useNavigate();
  const[username,setusername]=useState();
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [signupSuccess, setsignupSuccess] = useState(null);
  const[alert,setalert]=useState(null);
 
  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null)
    }, 1500);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("username: " + username);
    console.log("Email: " + email);
    if (!username) {
      showalert("Enter your details", "warning");
     
      return;
    }
    if (!email) {
      showalert("Enter email", "warning");
    
      return;
    }

    if (!password) {
      showalert("Enter a valid password", "warning");
    
      return;
    }

    if (password.length < 8) {
      showalert("Your password must be > 8 characters", "warning");
    
      return;
    }

    register(email, password)
      .then((account) => {
        console.log("account from sign up:");
        console.log(account);

        // this is where we create the user document
        creatUserDocument({ username, ...account});
        setsignupSuccess(true);
        showalert("signup successful", "success");

        setsignupSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })

      .catch((error) => {
        if (error.code === 409) {
          setsignupSuccess(false); // Email already registered error code
          showalert("Your email already exists. Please login", "danger");
          navigate("/login");
        }
      });
  };

  return (
    <div className={styles.loginbox}> 
    <div className={styles.userbox}>
       <Alert alert={alert}/>
       <img src={mylogo} alt="something" className={styles.logo} width={170} height={170}></img>
    
  <h2 id="signuplogin">SignUp</h2>
    <form className="form"  onSubmit={handleSubmit}>
    <label htmlFor="text">
        UserName
      </label>
    <InputControls
        id="text"
        type="text"
        onChange={(e) => setusername(e.target.value)}
      
      />
       
       <label htmlFor="email">
        Email
      </label>
    

      <InputControls
        id="email"
        type="email"
        onChange={(e) => setemail(e.target.value)}
       
      />
     

     <label htmlFor="password">
        Password
      </label>
      <i id={styles.passwordicon}
        className={`bi ${showPassword ? "bi bi-eye-slash" : "bi-eye"} password-icon`}
       onClick={() => setShowPassword(!showPassword)}></i>

      <InputControls
        id="password"
        type={showPassword ? "text" : "password"}
        onChange={(e) => setPassword(e.target.value)}
      />
      
    

<div className={styles.footer}>

<button disabled={signupSuccess === false} >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      SignUp
    </button>
</div>
    </form>
    </div>
    </div>
    
  )
}