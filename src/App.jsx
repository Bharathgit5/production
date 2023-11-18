import React from 'react'
import Home from './Home'
import {BrowserRouter , Routes, Route} from "react-router-dom";
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Termsandconditions from './Termsandconditions';
import PrivacyPolicy from './PrivacyPolicy';
import Refund from './Refund';
import Aboutus from './Aboutus';


function App() {
 
  return (
    <>
     
<BrowserRouter>
<Routes>
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/" element = {<Home/>}/>
<Route path='/termsandconditions' element={<Termsandconditions/>}/>
<Route path='/privacyPolicy' element={<PrivacyPolicy/>}/>
<Route path='/refund' element={<Refund/>}/>
<Route path='/aboutus' element={<Aboutus/>}/>
        </Routes>
        </BrowserRouter>
   </>
   
  );
}

export default App;