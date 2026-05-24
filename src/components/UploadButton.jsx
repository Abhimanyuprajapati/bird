
import React, { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBase64, imageRecognition } from "../services/ApiServiceProvider";
import { GlobalContext } from "../services/GlobalContext";
import Toaster from "./Toaster";

export const UploadButton = ({ text, pageState }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const hiddenFileInput = useRef(null);
  const [isButtonDisable, setButtonDisable] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); 


  const [history, setHistory]= useState([]);



  useEffect(() => {
    const storedHistory = localStorage.getItem('history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
   
    // console.log("i am from get history item ")
  }, []);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
     dispatch({ type: "SET_LOCAL_HISTORY", payload: history });
  }, [history]);




  const uploadFile = async (file) => {
    // console.log("i am from file branch");
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    setButtonDisable(true);
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("token");
  
    try {
      const response = await imageRecognition(formData, token);
      setButtonDisable(false);
  
      if (response.data.isSuccess) {
        const base64Image = await getBase64(file);  
  
        const data = {
          detailData: response.data.data,
          file: URL.createObjectURL(file),
        };
  
        const historyData = {
          detailData: response.data.data,
          file: base64Image,
          time: formattedTime,
        };
  
        dispatch({ type: "SET_BIRDDETAIL", payload: data });
        setHistory([...history, historyData]);
{
  pageState && (
     navigate("/detailspage")
  ) 
}

       
      } else {
        dispatch({ type: "Upload_Response", payload: 429 });
      }
  
      if (response.status === 500) {
        dispatch({ type: "Upload_Response", payload: 500 });
      }
  
    } catch (error) {
      // console.log(error);
      setButtonDisable(false);
     
    }
  };



  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);

      // console.log("fileSizeInMB", fileSizeInMB);

      if (fileSizeInMB > 5) {
          // setError('Image size exceeds 5MB limit.');
          Toaster("Please upload the image size  less then 5MB.", false);
          event.target.value = null;
          setSelectedFile(null);
      } else {
        setSelectedFile(file);
        uploadFile(file);
      }
    }


  };

  const handleRetry = () => {
    if (selectedFile) {

      const fileSizeInMB = selectedFile.size / (1024 * 1024);

      // console.log("fileSizeInMB", fileSizeInMB);

      if (fileSizeInMB > 5) {
          Toaster("Please upload the image size  less then 5MB.", false);
          setSelectedFile(null);
      } else {
        dispatch({ type: "Upload_Response", payload: null });
        uploadFile(selectedFile);
      }

    }
  };

  // console.log("selectedFile", selectedFile);

  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        ref={hiddenFileInput}
        onChange={handleFileChange}
        accept="image/*"
      />

      {state.uploadResponse === 500 ? (
        <button
          className="btn btn-danger rounded-pill fs-4"
          onClick={handleRetry}
          disabled={isButtonDisable}
        >
          Try Again
        </button>
      ) : (
        <button
          className="btn btn-primary rounded-pill fs-4"
          onClick={() => hiddenFileInput.current.click()}
          disabled={isButtonDisable}
        >
          {text}
        </button>
      )}
    </>
  );
};
