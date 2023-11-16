import {  useState } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../appwritetest";
//import mylog from '../images/images/mylog.png';
import Alert from '../Alert';
import InputControls from "../InputControls/InputControls";
import styles from "./Login.module.css";
import Home from "../Home";
export default function LogIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [loginSuccess, setLoginSuccess] = useState(null);
  const[alert,setalert]=useState(null);
  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null)
    }, 2000);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    
   
    if (!email) {
      showalert('Enter a valid email','warning')
     
      return;
    }
  
    if (!password) {
      showalert('Incorrect password','warning')
  
      return;
    }
  
    login(email, password)
      .then((account) => {
      showalert('Login successful','success')
      
        setLoginSuccess(true);
        setTimeout(() => {
          navigate('/Home');
        }, 2000)
     
      })
      .catch(() => {
        showalert('Enter valid email or password','danger')
        window.location.reload();
        setLoginSuccess(false);
      });
  }
      
  

  return (
   <>

   <div className={styles.loginbox}> 
  
    <div className={styles.userbox}>
    <Alert alert={alert}/> 
  
        <h3 id="signuplogin">Login</h3>
        <form className='form' onSubmit={handleSubmit}>
        <label htmlFor="email">
        Email
      </label>
        <InputControls
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
         <label htmlFor="password">Password</label>
         <i id={styles.passwordicon}className={`bi ${showPassword ? "bi bi-eye-slash" : "bi-eye"} password-icon`}
 onClick={() => setShowPassword(!showPassword)}></i>
      <InputControls
        id="password"
        type={showPassword ? "text" : "password"}
        onChange={(e) => setPassword(e.target.value)}
      />
<div className={styles.footer}>
 <button disabled={loginSuccess === false}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Login
    </button>
    </div>
    </form>
    </div>
    </div>

    </>
  )
}