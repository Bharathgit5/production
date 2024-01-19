import React,{useState,useEffect,useRef} from 'react';
import { updateUserDocument2} from "./appwritetest";
import {TweenMax , Power3} from 'gsap';

import ScrollTrigger from 'gsap/ScrollTrigger';

const Showprice = (props) => {
  const [showTable, setShowTable] = useState(false);
  const [showForm, setShowForm] = useState(false);


  let anime = useRef(null);
let numpages=  props.count
let numcopies=  props.copies
let r1= props.selectedValue
let r2=props.selectedValue2
let price = (r1 === "black and white" && r2=== "front side only") ? 10 : (r1 === "black and white" && r2=== "both sides") ? 10 : (r1 === "color" && r2=== "front side only") ? 10 : (r1 === "color" && r2=== "both sides") ? 10:10
let totalprice = numpages * numcopies * price 
          
console.log(props.selectedValue)
console.log(props.selectedValue2)
const handleUpdateUser = async () => {
 
  try {
    const response = await updateUserDocument2({numpages,numcopies,price,totalprice});
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
      delay:0.9,
      color: 'red',
      
      scrollTrigger: {
        trigger: 'nav',
        scroller: 'body',
        start: 'bottom -40%',
        end: 'bottom -40%',
       
      },
    }
  )

})   
useEffect(() => {

  const rzpPaymentForm = document.getElementById("rzp_payment_form");

  if (rzpPaymentForm && !rzpPaymentForm.hasChildNodes()) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.dataset.payment_button_id = "pl_JzIFH7q1E6GjPF";
    rzpPaymentForm.appendChild(script);
  }


}, []);

const handleShowTable = () => {
  setShowTable(!showTable);
  setShowForm(true); // Set showForm to true when showing the table
};
  return (
    <>
  
   

    

    <div className="card text-center " id='card3' ref={el => {anime =el}}>
    <b className="card-head" >Make Your Payment</b> 
  <div className="card-body3">
    <button type="button" className="btn btn-dark" id='showpricebtn' onClick={handleShowTable}>
        Show Price ₹
      </button>
      {showTable && (
          <>
            <table>
              <tbody>
                <tr>
                  <th>No. of Pages</th >
                  <th>No. of Copies</th >
                  <th>Price</th >
                  <th>Total Price</th>
                </tr>
              </tbody>
              <tbody>
                <tr onChange={handleUpdateUser}>
                  <td>{numpages}</td>
                  <td>{numcopies}</td>
                  <td>{price}</td>
                  <td>{totalprice}</td>
                </tr>
              </tbody>
            </table>
          
          </>
        )}

{showForm && <form id="rzp_payment_form"></form>}
  </div>
 
  </div>
 
 
  </>
  );
}
export default  Showprice

