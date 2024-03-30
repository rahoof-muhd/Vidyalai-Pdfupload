import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('pdfFile', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log( response.data);
      alert(response.data)
      navigate("/view")

    } catch (error) {
      alert("Only pdf files are allowed")
      console.error('Error uploading file:', error);
    }
  };

  document.body.style.backgroundColor=" rgb(75, 75, 175)";

  return (
    <div className='grid m-auto place-content-center'>
    <form onSubmit={handleFormSubmit} className=' grid bg-slate-50 border-white rounded-md border-2 w-max sm:mt-28 lg:mt-40 xl:mt-60 2xl:mt-96 mt-24'>
      <input type="file" accept=".pdf" name='pdfFile' onChange={handleFileChange} className=' p-4' />
      <button type="submit" disabled={!file || loading} className=' bg-blue-700 text-white p-2 font-bold'>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
    </div>
  );
};

export default FileUploadForm;








