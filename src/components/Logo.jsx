import React from 'react'
import { useNavigate } from "react-router-dom";
import logo from "./../assets/logo.jpg";


export const Logo = () => {
    const navigate = useNavigate();
    const handleclick =()=>{
      navigate('/');
    }
  return (
    <>
        <div className="row">
            <div className="col align-self-start">
              <img
                src={logo}
                className="logo img-fluid "
                alt="Techlicious Design & Development"
                onClick={handleclick}
                style={{cursor:"pointer"}}
                width={100}
                height={100}
              />
            </div>
          </div>
    </>
  )
}
