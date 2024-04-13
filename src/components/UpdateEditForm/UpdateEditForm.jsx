import "./UpdateEditForm.scss";

function UpdateEditForm({ index, point, pointState, setPointState }) {
  const handlePointChange = (index, value) => {
    const newPoints = [...pointState];
    newPoints[index] = value;
    setPointState(newPoints);
    console.log("this is pointstate:", pointState);
  };

  return (
    <div className="edit-form__input-container">
      <label htmlFor={`point${index + 1}`} className="edit-form__label">
        Point {index + 1}
      </label>
      <textarea
        type="text"
        id={`point${index + 1}`}
        className="edit-form__input edit-form__point"
        onChange={(e) => handlePointChange(index, e.target.value)}
      >
        {point}
      </textarea>
    </div>
  );
}

export default UpdateEditForm;
