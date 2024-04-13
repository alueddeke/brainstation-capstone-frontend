import "./UpdateResponse.scss";
import editIcon from "../../assets/icons/edit-alt.svg";
import deleteIcon from "../../assets/icons/circle-xmark-solid.svg";
import confirmIcon from "../../assets/icons/circle-check-solid.svg";
import { useState } from "react";

function UpdateResponse({ index, point, response, setResponse }) {
  const [isEditing, setIsEditing] = useState(false);

  const { points, color } = response;

  const handleEditPoint = (index, value) => {
    const pointIndex = points.findIndex((point, i) => i === index);

    if (pointIndex !== -1) {
      const updatedPoints = [
        ...points.slice(0, pointIndex),
        value,
        ...points.slice(pointIndex + 1),
      ];

      setResponse({ ...response, points: updatedPoints });
      console.log(response);
    }
  };

  const handleDeletePoint = (index) => {
    const updatedPoints = points.filter((_, i) => i !== index);
    setResponse({ ...response, points: updatedPoints });
    setIsEditing(false);
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
            handleEditPoint(index, e.target.value);
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
              onClick={() => handleDeletePoint(index)}
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
