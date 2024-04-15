import { useEffect, useState } from "react";
import "./EditForm.scss";
import { getFirestore } from "firebase/firestore";

import UpdateEditForm from "../UpdateEditForm/UpdateEditForm";

function EditForm({
  view,
  setEditModalOpen,
  handleSubmitEditForm,
  pointState,
  setPointState,
  topicState,
  setTopicState,
}) {
  const [commentState, setCommentState] = useState("");

  const db = getFirestore();
  const { points, topic, color, id, comments } = view;

  useEffect(() => {
    setTopicState(topic);
    setPointState(points);
  }, [topic]);

  const handleTopicChange = (value) => {
    setTopicState(value);
  };

  console.log("view??", view.id);

  const renderedPoints = points
    ? points.map((point, index) => (
        <UpdateEditForm
          key={index}
          index={index}
          point={point}
          pointState={pointState}
          setPointState={setPointState}
        />
      ))
    : null;

  return (
    <div className="edit-form">
      <div className={`edit-form__content edit-form__content--${color} `}>
        <form className="" onSubmit={handleSubmitEditForm}>
          <div className="edit-form__input-container">
            <label htmlFor="topic" className="edit-form__label">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              value={topicState}
              className="edit-form__input edit-form__topic"
              onChange={(e) => handleTopicChange(e.target.value)}
            />
          </div>
          {renderedPoints}

          <div className="edit-form__input-container">
            <label htmlFor="comments" className="edit-form__label">
              Comments
            </label>
            <textarea
              id="comments"
              className="edit-form__input edit-form__comments"
              value={commentState}
              placeholder="Anything to add?"
              onChange={(e) => setCommentState(e.target.value)}
            >
              {comments ? comments : ""}
            </textarea>
          </div>
          <div className="edit-form__buttons-container">
            <button
              className="edit-form__button edit-form__cancel"
              onClick={() => setEditModalOpen(false)}
            >
              cancel
            </button>
            <button
              type="submit"
              className="edit-form__button edit-form__submit"
            >
              finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
