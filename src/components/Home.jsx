import React, { useContext, useState } from "react";
import bird from "../assets/bird.png";
import bird1 from "../assets/bird1.jpg";
import bird2 from "../assets/bird2.jpg";
import imagegroup from "../assets/imagegroup.jpg";
import birdview from "../assets/birdview.jpg";
import mask from "../assets/Mask.png";
import maskbird from "../assets/maskbird.png";
import { UploadButton } from "./UploadButton";
import { Header } from "./Header";
import { GlobalContext } from "../services/GlobalContext";
import { ImgSample } from "./sampleTry/ImgSample";

export const Home = () => {
  const { state } = useContext(GlobalContext);
  const [showSample, setShowSample] = useState(false);

  const handleSample = () => {
    setShowSample(true);
  };

  const handleclosedbutton = () => {
    setShowSample(false);
  };

  return (
    <>
      <div className="container">
        <Header isLoggedIn={state.isLoggedIn} />

        <div className="row mt-5">
          <div className="col-6 d-flex flex-wrap">
            <div className="row justify-content-start gap-4">
              <div className="col-5 d-flex align-content-between flex-wrap">
                <div className="w-100">
                  <img src={bird} className="img-fluid" alt="bird" />
                </div>
                <div className="d-flex align-self-center">
                  <div className="d-flex align-items-end">
                    <span className="crossname fs-3">Discover Birds</span>
                  </div>
                  <div className=" d-flex align-items-center flex-wrap gap-4">
                    <div>
                      <img
                        src={bird1}
                        className="rounded-2 img-fluid"
                        alt="bird"
                      />
                    </div>
                    <div>
                      <img
                        src={bird2}
                        className="rounded-2 img-fluid"
                        alt="bird"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <p className="text-center fs-2">Just Click and Upload....</p>
                </div>
                <div className="row">
                  <img src={imagegroup} className="bird img-fluid" alt="bird" />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col d-flex justify-content-center align-content-center">
                <button
                  className="btn btn-primary rounded-pill fs-4"
                  onClick={handleSample}
                >
                  Click here for the sample
                </button>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="position-relative">
              <img src={birdview} alt="bird" className="img-fluid rounded-5" />
              <div className="position-absolute top-50 start-50 translate-middle p-4 transparentbackground rounded-5">
                <div className="container d-flex align-items-center gap-4">
                  <span className="maskdiv">
                    <img
                      src={mask}
                      className="img-fluid"
                      alt="mask"
                      width={75}
                      height={75}
                    />{" "}
                  </span>{" "}
                  <h1 className="fs-2">Learn about Animal Species</h1>
                </div>
                <div className="w-100 pt-4">
                  <p className="fs-4 p-1">
                    Upload the bird Image and let us help you find out what kind
                    of bird you just saw..!
                  </p>
                </div>
                <div className="d-flex flex-column align-items-end mt-5">
                  <UploadButton text="Upload Image" pageState={true} />
                </div>
                <img
                  src={maskbird}
                  alt="maskbird"
                  width={210}
                  height={210}
                  className="position-absolute top-50 start-5 img-fluid pt-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSample && (
        <div className="otp-modal-overlay">
          <div className="position-absolute top-50 start-50 translate-middle termsandcondition p-4 rounded-4 container w-50 ">
            <div className="row justify-content-end px-2">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleclosedbutton}
              ></button>
            </div>

            <ImgSample pageState={true} />
          </div>
        </div>
      )}
    </>
  );
};

// {
//   showSample && (
//     <div className="otp-modal-overlay">
//     <div className="position-absolute top-50 start-50 translate-middle termsandcondition p-4 rounded-4 container w-50 ">
//         <div className="row justify-content-end px-2">
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="modal"
//             aria-label="Close"
//             onClick={handleclosedbutton}
//           ></button>
//         </div>
//     <div className="bg-white shadow-lg w-full max-w-md rounded-3 p-3 ">
//     <ImgSample />
//     </div>
//     </div>
//     </div>
//   )
// }

{
  /* {
        showSample && (
          <div className="otp-modal-overlay">
          <div className="position-absolute top-50 start-50 translate-middle container w-50">
          <div className="bg-white shadow-lg w-full max-w-md rounded-3 p-3 ">
          <ImgSample />
          </div>
          </div>
          </div>
        )
      } */
}
