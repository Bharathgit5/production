import React  from 'react'
import {Workapi} from "./API/Workapi";
const Howitwork = () => {
  const data = Workapi.map(Work=>
<div className='col-12 col-lg-4 text-center work-container-subdiv'>
<i className={`fontawesome-style ${Work.logo}`} ></i>
            <h2 className='sub-heading'>{Work.title}</h2>
               <p className='main-hero-para w-100'>{Work.info}</p>
               </div>    
               
  );
  return(
  <div>
        <div className='work-container container'>
            <h1 className='main-heading text-center' id='C2'>How does it Work</h1>
            <div className='row'>
              
     
   {data}

   </div>
   </div>
   </div>
  );
}

export default Howitwork