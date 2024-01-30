
import React, { useState } from 'react'
import Navbar from './Navbar/Navbar';
import Carousel from './Carousel/Carousel';
import Uploadcomp from './Uploadcomp/Uploadcomp';
import Select from './Select';
import Showprice from './Showprice';
import Howitwork from './Howitwork';
import Contact from './Contact';
import CopiesContext from './CopiesContext';


function Home(props) {
  const [count, setCount] = useState(0);
  const [copies, setCopies] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");

  const handleCount = (count) => {
    setCount(count);
  }

  return (
    <>
     <Navbar/>
    <Carousel/>
    <CopiesContext.Provider value={{ copies, setCopies}}>
    <Uploadcomp  passCount={handleCount} />
    <Select setSelectedValue={setSelectedValue} setSelectedValue2={setSelectedValue2}/>
    <Showprice selectedValue={selectedValue} selectedValue2={selectedValue2} count={count} copies={copies}/>
    </CopiesContext.Provider>
    <Howitwork/>
   <Contact/>

   </>
   
  );
}

export default Home;