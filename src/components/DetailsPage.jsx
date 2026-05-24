import React, { useContext, useEffect, useState } from "react";
import { UploadButton } from "./UploadButton";
import { ImageUpload } from "./ImageUpload";
import { GlobalContext } from "../services/GlobalContext";
import Toaster from "./Toaster";
import { Header } from "./Header";
import { HistoryComponent } from "./history/HistoryComponent";
import { ImgSample } from "./sampleTry/ImgSample";

export const DetailsPage = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { detailData, file } = state.birdDetail || {};
  const [showpopup, setShowpopup] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(120);

  useEffect(() => {
    if (state.uploadResponse === 429) {
      setShowpopup(true);
      setSecondsLeft(60);
    }

    if (state.uploadResponse === 500) {
      Toaster("Server error Please try after some time", false);
    }
  }, [state.uploadResponse]);

  useEffect(() => {
    let timer;
    if (showpopup && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    if (secondsLeft === 0) {
      setShowpopup(false);
      dispatch({ type: "Upload_Response", payload: null });
    }

    return () => clearInterval(timer);
  }, [showpopup, secondsLeft, dispatch]);

  return (
    <>
      <Header isLoggedIn={state.isLoggedIn} />
      {detailData ? (
        <div className="container-fluid  h-100">
          <div className="row  h-100">
            <div className="col-2 boxshadow">
              <ImgSample pageState={false}/>
            </div>
            <div className="col-8">
              <div className="row  mt-5 pb-4">
                <div className="col">
                  <div className="row">
                    <div className="col-3 mx-3">
                      <div className="row">
                        <div className="col d-flex justify-content-center align-items-center image-background">
                          <ImageUpload file={file} />
                        </div>
                      </div>
                      <div className="row pt-4 ">
                        <UploadButton text="Upload New Image"  pageState={false} />
                      </div>
                    </div>
                    <div className="col text-black mx-1">
                      <h3 className="col headerdetails">
                        <span className="font-weight-normal"> Detected : </span>
                        <strong>
                          {detailData.predLabel.replaceAll("_", " ") ||
                            "No data found"}
                        </strong>
                      </h3>

                      {detailData.confidenceScore && (
                        <p>
                          Matching Percentage :{" "}
                          {`${Math.trunc(detailData.confidenceScore)}%` || "No data found"}
                        </p>
                      )}

                      {detailData && (
                        <>
                          <div
                            className={
                              detailData.content || detailData.source
                                ? "detailspara fs-6"
                                : "none"
                            }
                          >
                            <p>
                              {detailData.content && (
                                <>{detailData.content || "No data found"}</>
                              )}
                            </p>
                            {detailData.source && (
                              <>
                                <a href={detailData.source} target="_blank">
                                  {detailData.source}
                                </a>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col  text-black">
                  {detailData.media_links &&
                    detailData.media_links.map((item, index) => {
                      return (
                        <img
                          src={item}
                          width={250}
                          height={250}
                          alt="image"
                          key={index}
                          className="img-fluid p-2 rounded-4"
                        />
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="col-2 boxshadow">
              <HistoryComponent />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="container-fluid h-100">
            <div className="row mt-5 pb-4 ">
              <div className="col-2 boxshadow">
              <ImgSample pageState={false}/>
              </div>
              <div className="col">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-4">
                    <div className="row">
                      <div className="col d-flex justify-content-center align-items-center image-background">
                        <ImageUpload file={file} />
                      </div>
                    </div>
                    <div className="row pt-4 mx-5">
                      <UploadButton
                        text="Upload New Image"
                        pageState={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-2 boxshadow">
              <HistoryComponent />
              </div>
            </div>
          </div>
        </>
      )}

      {showpopup && (
        <>
          <div className="otp-modal-overlay">
            <div className="position-absolute top-50 start-50 translate-middle w-auto">
              <div className="bg-white shadow-lg w-full max-w-md rounded-3 p-4">
                <div className="row">
                  <div className="col">
                    <h1 className="text-center text-danger">
                      You have reached your limits.
                    </h1>

                    <h3 className="text-center">
                      Please wait before uploading.
                    </h3>
                    <p className="text-center fs-1 text-danger">
                      {secondsLeft}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
