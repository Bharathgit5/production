import React, {useContext,useState, useEffect } from 'react'
import { Client, Storage,ID,Account } from "appwrite";
import CopiesContext from '../CopiesContext'
import { updateUserDocument1} from "../appwritetest";
import styles from "./Uploadcomp.module.css";
import Alert from '../Alert';

const Uploadcomp = ({ passCount,props }) => {

  const {setCopies} = useContext(CopiesContext)
  const [docname, setdocname] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[alert,setalert]=useState(null);
  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setInterval(() => {
      setalert(null)
    }, 15000);
  } 
  useEffect(() => {
    // Initialize the Appwrite SDK
    const client = new Client()
    const account = new Account(client)
    client.setEndpoint('https://api.printfc.in/v1') // Your API Endpoint
    .setProject('6554dca1a0a5a138e6c6');
    // Check if the user is logged in
    const checkLoginStatus = async () => {
      try {
        await account.get(); // Verify user session
        setIsLoggedIn(true);
        console.log('true')
      } catch (error) {
        setIsLoggedIn(false);
        console.log('false')
      }
    };
    checkLoginStatus();
  }, []);
/*
  const   Handlefile = ()=>{
    
    const client = new Client()
    client.setEndpoint('https://api.printfc.in/v1') // Your API Endpoint
    .setProject('6554dca1a0a5a138e6c6');
    const storage = new Storage(client);
    const promise = storage.createFile(
      '6554dd6172242c32901a',
      ID.unique(),
      document.getElementById('upload-file').files[0]
    );
    promise.then(function (response) {
      console.log(response); // Success
    }, function (error) {
      console.log(error); // Failure
    });
    let x = document.getElementById('upload-file');
    let txt='';
    let file = x.files[0];
    if('name' in file){
      txt += 'fileName : ' + file.name;
    }
   
    if('size' in file){
      let kb = Math.round(file.size/1000);
      let mb = Math.round(kb/1000);
     if(kb<=1000){
      txt += ' |  Size :' + kb +'KB';
     }
     else if (mb<=1000){
      txt +='  |  Size :' + mb +'MB';
     }
    }

   
   setdocname(txt);
    
   }
  */
   const Handlefile = () => {
    const client = new Client();
    client
      .setEndpoint('https://api.printfc.in/v1') // Your API Endpoint
      .setProject('6554dca1a0a5a138e6c6');
    const storage = new Storage(client);

    const files = document.getElementById('upload-file').files;
    let totalPages = 0; 
    Array.from(files).forEach((file) => {
      const promise = storage.createFile('6554dd6172242c32901a', ID.unique(), file);
      promise.then(
        function (response) {
          console.log(response); // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      );

      let txt = '';
      if ('name' in file) {
        txt += 'fileName : ' + file.name;
      }

      if ('size' in file) {
        let kb = Math.round(file.size / 1000);
        let mb = Math.round(kb / 1000);
        if (kb <= 1000) {
          txt += ' |  Size :' + kb + 'KB';
        } else if (mb <= 1000) {
          txt += '  |  Size :' + mb + 'MB';
        }
      }

      setdocname((prevDocName) => prevDocName + ' ' + txt);
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onloadend = () => {
        let matches = reader.result.match(/\/Type[\s]*\/Page[^s]/g);
        let count = matches ? matches.length : 1;
        totalPages += count;
        passCount(totalPages); // Update total pages
        const infoElement = document.getElementById('info');
        if (infoElement) {
          infoElement.textContent = totalPages.toString();
        }
      };
    
    });
  };

   const handleUpdateUser = async () => {
    try {
      const response = await updateUserDocument1({docname});
      console.log(response);
  console.log(docname)
      // add any additional success handling here
    } catch (error) {
      console.log(error);
      // add any error handling here (e.g., display an error message to the user)
    }
  };
 
  const pdffunc = (event) =>{
    const client = new Client();
    client
      .setEndpoint('https://api.printfc.in/v1') // Your API Endpoint
      .setProject('6554dca1a0a5a138e6c6');
    const storage = new Storage(client);

    const files = document.getElementById('upload-file').files;
    let totalPages = 0; 
    Array.from(files).forEach((file) => {
      const promise = storage.createFile('6554dd6172242c32901a', ID.unique(), file);
      promise.then(
        function (response) {
          console.log(response); // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      );

      let txt = '';
      if ('name' in file) {
        txt += 'fileName : ' + file.name;
      }

      if ('size' in file) {
        let kb = Math.round(file.size / 1000);
        let mb = Math.round(kb / 1000);
        if (kb <= 1000) {
          txt += ' |  Size :' + kb + 'KB';
        } else if (mb <= 1000) {
          txt += '  |  Size :' + mb + 'MB';
        }
      }

      setdocname((prevDocName) => prevDocName + ' ' + txt);
    const reader = new FileReader();
    const fileInfo = event.target.files[0];
    if (fileInfo) {
         reader.readAsBinaryString(event.target.files[0]);
         reader.onloadend = () => {
          let matches = reader.result.match(/\/Type[\s]*\/Page[^s]/g);
          let count = matches ? matches.length : 1;
          let element = document.getElementById('info');
          if(element){
            element.innerHTML = count;
        }
             console.log('Number of Pages:', count);    
             passCount(count); 
         }
         }
        }
    )};   

        const handleChange = (event) => {
          setCopies(event.target.value);
        }
    
        const handleUploadClick = () => {
          if (!isLoggedIn) {
            showalert('Please Login/Signup to enable upload button','warning')
          }
        };
     
      const handleFileChange = (event) => {
        const files = event.target.files;
    
        if (files.length > 0) {
          const firstFile = files[0];
    console.log('heoo')
    console.log(firstFile.type === 'application/pdf')
          if (firstFile.type === 'application/pdf') {
            // If it's a PDF file, call pdffunc
            pdffunc(event);
          } else {
            // Otherwise, call Handlefile
            Handlefile(event);
          }
        }
      };
  return (
    <>
   <Alert alert={alert}/> 
     <div className="card text-center" id={styles.card1}  >
     
    <p className={styles["card-head"]}>
    <i className="bi bi-cloud-arrow-up" id={styles.icon}  ></i>  Upload Your File
    </p>
    <div  className={styles["card-body1"]}>
 
    <div className='uploadmain'>
   <div className='upload'>
   <div   className={styles["main"]}  onClick={handleUploadClick} >
    <div className={styles["uploadimage"]}>
    <label className={styles['imglabel']} id={styles.icon} htmlFor='upload-file' ><b> Upload File</b></label> 
    </div>
      <input type="file" id='upload-file' className={styles['inputlabel']}    onChange={handleFileChange}  disabled={isLoggedIn === false} accept='*/*' multiple />
     
      </div>
      <p className={styles['docnamedisp']}  onChange={handleUpdateUser()}>{docname}</p>
    </div>
 
      <div className='upload2'>
      <i className="bi-bi-cloud-arrow-up2" style={{height:100}}></i>
      </div>
      <div className='container'>
      <div className='noofpages'>
     <b className={styles.numpages}>Number of Pages:</b><p className={styles.noofpagesbox} id='info'>1</p>
     </div>
   
     <div className='noofcopies'>
     <b className={styles.numcopies}>Number of copies:</b><input  className={styles.nocopiesbox} onChange={handleChange} ></input>
     </div> 
    
  </div>
  </div>
  </div>
  </div>
    </>      
    )
}
export default Uploadcomp