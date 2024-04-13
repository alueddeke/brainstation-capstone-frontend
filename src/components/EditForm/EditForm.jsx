import { useEffect, useState } from "react";
import "./EditForm.scss";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { render } from "react-dom";
import UpdateEditForm from "../UpdateEditForm/UpdateEditForm";

function EditForm({
  view,
  setEditModalOpen,
  qLibItems,
  currentUser,
  handleSubmitEditForm,
  pointState,
  setPointState,
  topicState,
  setTopicState,
}) {
  // const [topicState, setTopicState] = useState("");
  // const [pointState, setPointState] = useState([]);
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

  // async function qLibItems() {
  //   const items = [];
  //   const q = query(
  //     collection(db, "libraryItems"),
  //     where("uid", "==", currentUser.uid)
  //   );
  //   const snapshot = await getDocs(q);
  //   snapshot.forEach((doc) => {
  //     items.push({ ...doc.data(), isCollapsed: true, id: doc.id });
  //   });
  //   setLibraryItems(items);
  // }

  // async () => {
  //   await deleteDoc(doc(db, "libraryItems", listItem.id));
  //   qLibItems();
  //   setIsModalOpen(false);
  // };

  // setdoc

  // const handleEditPoint = (index, value) => {
  //   const pointIndex = points.findIndex((point, i) => i === index);

  //   if (pointIndex !== -1) {
  //     const updatedPoints = [
  //       ...points.slice(0, pointIndex),
  //       value,
  //       ...points.slice(pointIndex + 1),
  //     ];

  //     setResponse({ ...response, points: updatedPoints });
  //     console.log(response);
  //   }
  // };
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

  // const handleSubmitEditForm = async (e) => {
  //   e.preventDefault();
  //   console.log("topic state::", topicState);
  //   let pointsValue = pointState;
  //   let topicValue = topicState;
  //   let commentValue = commentState;

  //   console.log(topicValue);

  //   await updateDoc(doc(db, "libraryItems", id), {
  //     topic: topicValue,
  //     points: pointsValue,
  //     comment: commentValue,
  //     // uid: currentUser.uid,
  //   });
  //   // qLibItems();
  //   setEditModalOpen(false);
  //   console.log("edit");
  //   // setResponse({
  //   //   topic: topicState,
  //   //   points: pointState,
  //   //   comment: commentState,
  //   // });
  //   // handleSaveItem(response);
  // };

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

          {/* {[1, 2, 3, 4, 5].map((number, index) => (
            <div key={index} className="edit-form__input-container">
              <label htmlFor={`point${number}`} className="edit-form__label">
                Point {number}
              </label>
              <textarea
                type="text"
                id={`point${number}`}
                className="edit-form__input edit-form__point"
                onChange={(e) => handlePointChange(index, e.target.value)}
              >
                {points[index]}
              </textarea>
            </div>
          ))} */}
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
