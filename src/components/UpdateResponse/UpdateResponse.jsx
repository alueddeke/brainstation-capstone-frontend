import "./UpdateResponse.scss";
import editIcon from "../../assets/icons/edit-alt.svg";
import deleteIcon from "../../assets/icons/circle-xmark-solid.svg";
import confirmIcon from "../../assets/icons/circle-check-solid.svg";
import { useState } from "react";

function UpdateResponse({
  index,
  point,
  responseObject,
  setResponse,
  response,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const { points, color } = responseObject;

  const handleEditPoint = (id, index, value) => {
    const updatedResponseArray = [...response];
    const responseIndex = updatedResponseArray.findIndex(
      (obj) => obj.id === id
    );

    if (responseIndex !== -1) {
      const updatedPoints = [...updatedResponseArray[responseIndex].points];
      updatedPoints[index] = value;

      updatedResponseArray[responseIndex] = {
        ...updatedResponseArray[responseIndex],
        points: updatedPoints,
      };

      setResponse(updatedResponseArray);
    }
  };

  const handleDeletePoint = (id, index) => {
    const updatedResponseArray = [...response];
    const responseIndex = updatedResponseArray.findIndex(
      (obj) => obj.id === id
    );

    if (responseIndex !== -1) {
      const updatedPoints = [...updatedResponseArray[responseIndex].points];
      updatedPoints.splice(index, 1);

      updatedResponseArray[responseIndex] = {
        ...updatedResponseArray[responseIndex],
        points: updatedPoints,
      };

      setResponse(updatedResponseArray);
      setIsEditing(false);
    }
  };

  return (
    <div className={`update-point__wrapper update-point__wrapper--${color}`}>
      {!isEditing ? (
        <p className="update-point__text">
          {index + 1}. {point}
        </p>
      ) : (
        <textarea
          type="text"
          id={index}
          className="update-point__area-edit"
          onChange={(e) => {
            handleEditPoint(responseObject.id, index, e.target.value);
          }}
        >
          {point}
        </textarea>
      )}

      <div className="update-point__buttons-container">
        {!isEditing ? (
          <img
            src={editIcon}
            alt="edit icon"
            onClick={() => setIsEditing(!isEditing)}
            className="update-point__icon"
          />
        ) : (
          <>
            <img
              src={deleteIcon}
              alt="delete icon"
              className="update-point__icon update-point__icon-delete"
              onClick={() => handleDeletePoint(responseObject.id, index)}
            />
            <img
              src={confirmIcon}
              alt="check icon"
              onClick={() => setIsEditing(!isEditing)}
              className="update-point__icon update-point__icon-confirm"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default UpdateResponse;
