import React, { useState, useEffect,useRef } from "react";

import { updateUserDocument } from "./appwritetest";
import {TweenMax , Power3} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
const Select = (props) => {
  let anime = useRef(null);
const[color,setcolor]=useState('');
const[side,setside]=useState('');
const handleChange = (event) => {
  props.setSelectedValue(event.target.value);

};
const handleChange2 = (event) => {
  props.setSelectedValue2(event.target.value);

};
const handleUpdateUser = async (event) => {
 
  try {
    const response = await updateUserDocument({color, side});
    console.log(response);
  
    // add any additional success handling here
  } catch (error) {
    console.log(error);
    // add any error handling here (e.g., display an error message to the user)
  }
};
useEffect(() => {
  TweenMax.to(
    anime,
    .8,
    {
      opacity:1,
      y:-20,
      ease: Power3.easeOut,
      delay:0.6,
      color: 'red',
      
      scrollTrigger: {
        trigger: 'nav',
        scroller: 'body',
        start: 'bottom -30%',
        end: 'bottom -30%',
       
      },
    }
  )

})   

  
  return ( 
    <>
      <div className="card text-center" id='card2' ref={el => {anime =el}}>
      
      <b className="card-head" >Select Your Print Type</b> 
        <div className="card-body2">
      
        
        <form className="form" onSubmit={handleUpdateUser()}>
          <div className="form-check1">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="black and white" onChangeCapture={handleChange} onChange={(e) => setcolor(e.target.value)}/>
            <label className="form-check-label" htmlFor="flexRadioDefault2" id="select-txt">Black and White</label>
          </div>
         
          <div className="form-check2">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="color"  onChangeCapture={handleChange}  onChange={(e) => setcolor(e.target.value)}  />
            <label className="form-check-label" htmlFor="flexRadioDefault2" id="select-txt">Color</label>
          </div>
        
          <div className="form-check3">
            <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault3" value="front side only"  onChangeCapture={handleChange2} onChange={(e) => setside(e.target.value)} />
            <label className="form-check-label" htmlFor="flexRadioDefault2" id="select-txt">Front Side Only</label>
          </div>
          <div className="form-check4">
            <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault3" value="both sides"  onChangeCapture={handleChange2} onChange={(e) => setside(e.target.value)}/>
            <label className="form-check-label" htmlFor="flexRadioDefault2" id="select-txt">Both sides</label>
          </div>
         
          </form>
        </div>

      </div>
   
    </>
  )
}

export default Select;