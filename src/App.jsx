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
<Route path="/Home" element = {<Home/>}/>
<Route path='/Termsandconditions' element={<Termsandconditions/>}/>
<Route path='/PrivacyPolicy' element={<PrivacyPolicy/>}/>
<Route path='/Refund' element={<Refund/>}/>
<Route path='/Aboutus' element={<Aboutus/>}/>
        </Routes>
        </BrowserRouter>
   </>
   
  );
}

export default App;