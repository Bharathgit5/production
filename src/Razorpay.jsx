import React, { useEffect } from 'react';


const Razorpay = () => {
  
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
        script.async = true;
        script.dataset.payment_button_id = 'pl_NQBEiBjbunQ8BJ'; // Replace with your actual ID
      
        const form = document.querySelector('form');
        form.appendChild(script);
      }, []);
  return (
    <div>
       
        <h1>helloSS</h1>
   <div id="razorpay-button-container"></div>
 
    
    </div>
  )
}

export default Razorpay
