import React from "react";

export const TermsAndCondition = ({ onClosed }) => {
  return (
    <>
      <div className="otp-modal-overlay">
        <div className="position-absolute top-50 start-50 translate-middle termsandcondition p-4 rounded-4 container w-90 ">
          <div className="container-fluid w-100">
            <div className="row justify-content-end">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClosed}
              ></button>
            </div>

            <div className="row mt-4">
              <div className="col">
                <h1
                  className="fs-4"
                  style={{
                    color: "#1763B5",
                    fontFamily: "Rethink Sans",
                    fontStyle: "italic",
                  }}
                >
                  Terms of Use
                </h1>
              </div>
              <div
                className="rounded-5 px-2"
                style={{ backgroundColor: "#F1F1F1" }}
              >
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet consectetur. Ac sollicitudin in
                    elit odio. Auctor tellus dolor sit purus a sit. Varius sit
                    facilisis et ut quis id est. Proin ultricies pulvinar
                    aliquam ut at pulvinar sed magna. Nunc congue arcu quam id
                    eu cursus lobortis laoreet ipsum. Nulla convallis ultricies
                    convallis eget feugiat sollicitudin ut.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur. Ac sollicitudin in
                    elit odio. Auctor tellus dolor sit purus a sit. Varius sit
                    facilisis et ut quis id est. Proin ultricies pulvinar
                    aliquam ut at pulvinar sed magna. Nunc congue arcu quam id
                    eu cursus lobortis laoreet ipsum. Nulla convallis ultricies
                    convallis eget feugiat sollicitudin ut.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur. Ac sollicitudin in
                    elit odio. Auctor tellus dolor sit purus a sit. Varius sit
                    facilisis et ut quis id est.
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <h1
                  className="fs-4"
                  style={{
                    color: "#1763B5",
                    fontFamily: "Rethink Sans",
                    fontStyle: "italic",
                  }}
                >
                  Disclaimer
                </h1>
              </div>
              <div
                className="rounded-5 py-3"
                style={{ backgroundColor: "#FFEBD8" }}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur. Ac sollicitudin in
                  elit odio. Auctor tellus dolor sit purus a sit. Varius sit
                  facilisis et ut quis id est. Proin ultricies pulvinar aliquam
                  ut at pulvinar sed magna. Nunc congue arcu quam id eu cursus
                  lobortis laoreet ipsum. Nulla convallis ultricies convallis
                  eget feugiat sollicitudin ut. Ac aenean arcu eu ut velit. Amet
                  sit cras vel elementum dui pharetra id purus. Faucibus
                  faucibus tincidunt pharetra proin augue scelerisque pharetra
                  molestie risus. Eget etiam bibendum pellentesque eu ornare
                  pellentesque urna. Molestie sed adipiscing sem mauris
                  convallis risus nunc. Aliquam amet placerat arcu sit euismod.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
