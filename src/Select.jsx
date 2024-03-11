import React, { useState, useEffect } from "react";
import { updateUserDocument } from "./appwritetest";
import Alert from "./Alert"; // Import your alert component

const Select = (props) => {
  const [color, setColor] = useState('');
  const [side, setSide] = useState('');
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setInterval(() => {
      setAlert(null)
    }, 2000);
  } 
  useEffect(() => {
    if (color !== '' && side !== '') {
      handleUpdateUser();
    }
  }, [color, side]);

 

  const handleUpdateUser = async () => {
    try {
      await updateUserDocument({ color, side });
      console.log("Database updated successfully");
      showAlert('Preferences updated', 'success');
    } catch (error) {
      console.log(error);
      // Add error handling here if needed
      showAlert('Please select again', 'warning');
    }
  };

  const handleChange = (event) => {
    props.setSelectedValue(event.target.value);
    setColor(event.target.value);
  };

  const handleChange2 = (event) => {
    props.setSelectedValue2(event.target.value);
    setSide(event.target.value);
  };

  return (
    <>
      <Alert alert={alert} /> {/* Display the alert component */}
      <div className="card text-center" id='card2' >
        <b className="card-head">Select Your Print Type</b>
        <div className="card-body2">
          <form className="form">
            <div className="form-check1">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="black and white" onChangeCapture={handleChange} />
              <label className="form-check-label" htmlFor="flexRadioDefault2" id="select-txt">Black and White</label>
            </div>
            <div className="form-check2">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="color" onChangeCapture={handleChange} />
              <label className="form-check-label" htmlFor="flexRadioDefault2" id="select-txt">Color</label>
            </div>
            <div className="form-check3">
              <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault3" value="front side only" onChangeCapture={handleChange2} />
              <label className="form-check-label" htmlFor="flexRadioDefault2" id="select-txt">Front Side Only</label>
            </div>
            <div className="form-check4">
              <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault3" value="both sides" onChangeCapture={handleChange2} />
              <label className="form-check-label" htmlFor="flexRadioDefault2" id="select-txt">Both sides</label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Select;
