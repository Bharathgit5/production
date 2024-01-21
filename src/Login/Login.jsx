import {  useState } from "react";
import { useNavigate,Link } from "react-router-dom"
import { login } from "../appwritetest";
import mylogo from '../images/mylogo.png';
import Alert from '../Alert';
import InputControls from "../InputControls/InputControls";
import styles from "./Login.module.css";
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
    }, 1000);
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
          navigate('/');
        }, 1000)
     
      })
      .catch(() => {
        showalert('Enter valid email or password','danger')
        setTimeout(() => {
          window.location.reload();
        }, 1000)
     
       
        setLoginSuccess(false);
      });
  }
      
  

  return (
   <>

   <div className={styles.loginbox}> 
  
    <div className={styles.userbox}>

    <img src={mylogo} alt="something" className={styles.logo} width={170} height={170}></img>
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
  
        <p>
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
    </div>
    </div>

    </>
  )
}