
import React from "react";
import axios from "axios";
import FileUploadForm from "./fileupload";
import PDFViewer from "./pdfview";
import { BrowserRouter,Route,Routes } from "react-router-dom";

function App(){
  console.log(import.meta.env);
  axios.defaults.baseURL = location.origin;
  if(import.meta.env.MODE == "development") {
    axios.defaults.baseURL = "http://localhost:3000"
  }
  return(
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<FileUploadForm/>} />
     <Route path="/view" element={<PDFViewer/>}/> 
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;




// App.jsx

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useDropzone } from 'react-dropzone';

// function App() {
//   const [selectedPages, setSelectedPages] = useState([]);
//   const [newPdf, setNewPdf] = useState(null);

//   const onDrop = async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     const formData = new FormData();
//     formData.append('pdfFile', file);

//     try {
//       const response = await axios.post('http://localhost:5000/process-pdf', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setNewPdf(response.data);
//     } catch (error) {
//       console.error('Error processing PDF:', error);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const handlePageToggle = (pageNumber) => {
//     const index = selectedPages.indexOf(pageNumber);
//     if (index === -1) {
//       setSelectedPages([...selectedPages, pageNumber]);
//     } else {
//       setSelectedPages(selectedPages.filter((page) => page !== pageNumber));
//     }
//   };

//   return (
//     <div>
//       <h1>PDF Processor</h1>
//       <div {...getRootProps()} style={dropzoneStyles}>
//         <input {...getInputProps()} />
//         {
//           isDragActive ?
//             <p>Drop the PDF file here...</p> :
//             <p>Drag and drop a PDF file here, or click to select one</p>
//         }
//       </div>
//       <h2>Selected Pages:</h2>
//       <div>
//         {[...Array(10)].map((_, index) => (
//           <label key={index}>
//             <input
//               type="checkbox"
//               checked={selectedPages.includes(index + 1)}
//               onChange={() => handlePageToggle(index + 1)}
//             />
//             Page {index + 1}
//           </label>
//         ))}
//       </div>
//       {newPdf && (
//         <div>
//           <h2>New PDF:</h2>
//           <iframe src={URL.createObjectURL(new Blob([newPdf], { type: 'application/pdf' }))} width="100%" height="500px"></iframe>
//         </div>
//       )}
//     </div>
//   );
// }

// const dropzoneStyles = {
//   border: '2px dashed #cccccc',
//   borderRadius: '4px',
//   padding: '20px',
//   textAlign: 'center',
//   cursor: 'pointer',
//   marginTop: '20px'
// };

// export default App;
