
import React, { useContext } from "react";
import { GlobalContext } from "../../services/GlobalContext";
import { useNavigate } from "react-router-dom";

export const HistoryComponent = () => {
  // const navigate = useNavigate();
  const { state, dispatch } = useContext(GlobalContext);

  const handleHistoryRedirect = (item) => {
    const selectedData = {
      detailData: item.detailData,
      file: item.file,
    };

    dispatch({ type: "SET_BIRDDETAIL", payload: selectedData });
    // navigate("/detailspage");
  };

  // console.log("state", state)

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Upload History</h2>

      {state.localHistory && state.localHistory.length > 0 ? (
        <div className="d-flex flex-column gap-3">
          {state.localHistory.map((item, index) => (
            <div
              key={index}
              className="d-flex align-items-center gap-3 p-2 bg-light rounded shadow-sm"
              onClick={() => handleHistoryRedirect(item)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.file}
                alt={`Upload ${index}`}
                width={60}
                height={60}
                className="rounded"
              />
              <div className="d-flex flex-column">
                <strong>{item.detailData?.predLabel || "Unknown"}</strong>
                <small className="text-muted">{item?.time || "No time info"}</small>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No history available.</p>
      )}
    </div>
  );
};
