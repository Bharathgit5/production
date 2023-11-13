import React,{useState} from 'react';
import { updateUserDocument2} from "./appwritetest";

const Showprice = (props) => {
  const [showTable, setShowTable] = useState(false);
let numpages=  props.count
let numcopies=  props.copies
let r1= props.selectedValue
let r2=props.selectedValue2
let price = (r1 === "black and white" && r2=== "front side only") ? 15 : (r1 === "black and white" && r2=== "both sides") ? 15 : (r1 === "color" && r2=== "front side only") ? 15 : (r1 === "color" && r2=== "both sides") ? 15:15
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


  return (
    <>
    <div className="card text-center " id='card3'>
    <b className="card-head" >Make Your Payment</b> 
   
 
   
  <div className="card-body3">
    <button type="button" className="btn btn-dark" id='showpricebtn' onClick={() => setShowTable(!showTable)}>
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
          <tr onChange={handleUpdateUser()}>
            <td>{numpages}</td>
            <td> {numcopies}</td>
            <td>{price}</td>
            <td>{totalprice }</td>
               </tr>
          </tbody>
        </table>
       <button type="button" className="btn btn-dark" id='paybtn'><a href="upi://pay?pa=8639954433335@paytm&pn=PaytmUser&mc=0000&mode=02&purpose=00&orgid=159761&cust=14713099886">Pay Now</a></button>
         </>
      )}

  </div>
 
  </div>
  </>
  );
}
export default  Showprice