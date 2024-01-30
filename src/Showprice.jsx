
import React, { useState, useEffect } from 'react';
import { updateUserDocument2 } from "./appwritetest";


const Showprice = (props) => {

  let numpages = props.count;
  let numcopies = props.copies;
  let r1 = props.selectedValue;
  let r2 = props.selectedValue2;
  let price = (r1 === "black and white" && r2 === "front side only") ? 10 : (r1 === "black and white" && r2 === "both sides") ? 10 : (r1 === "color" && r2 === "front side only") ? 10 : (r1 === "color" && r2 === "both sides") ? 10 : 10;
  let totalprice = numpages * numcopies * price;

  console.log(props.selectedValue);
  console.log(props.selectedValue2);

  const handleUpdateUser = async () => {
    try {
      const response = await updateUserDocument2({ numpages, numcopies, price, totalprice });
      console.log(response);
      // add any additional success handling here
    } catch (error) {
      console.log(error);
      // add any error handling here (e.g., display an error message to the user)
    }
  };

  const [showContent, setShowContent] = useState(false);

 

  useEffect(() => {
    const rzpPaymentForm = document.getElementById("rzp_payment_form");

    if (rzpPaymentForm && !rzpPaymentForm.hasChildNodes() && showContent) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.async = true;
      script.dataset.payment_button_id = "pl_NQZG4VkVzAzCYS";
      rzpPaymentForm.appendChild(script);
    }
  }, [showContent]);

  return (
    <>
      <div className="card text-center " id='card3'>
        <b className="card-head" >Make Your Payment</b>
        <div className="card-body3">
          <button type="button" className="btn btn-dark" id='showpricebtn' onClick={() => setShowContent(true)}>
            Check Price ₹
          </button>
          {showContent && (
            <>
              <table>
                <tbody>
                  <tr>
                    <th>No. of Pages</th>
                    <th>No. of Copies</th>
                    <th>Price</th>
                    <th>Total Price</th>
                  </tr>
                </tbody>
                <tbody>
                  <tr onChange={handleUpdateUser()}>
                    <td>{numpages}</td>
                    <td>{numcopies}</td>
                    <td>{price}</td>
                    <td>{totalprice}</td>
                  </tr>
                </tbody>
              </table>
              <form id="rzp_payment_form"></form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Showprice;