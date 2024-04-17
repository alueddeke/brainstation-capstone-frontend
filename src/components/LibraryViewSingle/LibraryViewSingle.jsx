import "./LibraryViewSingle.scss";
import closeIcon from "../../assets/icons/circle-xmark-solid.svg";
import { useState, useEffect } from "react";
import upIcon from "../../assets/icons/circle-chevron-up-solid.svg";
import downIcon from "../../assets/icons/circle-chevron-down-solid.svg";
import editIcon from "../../assets/icons/edit-alt.svg";
import EditForm from "../EditForm/EditForm";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

function LibraryViewSingle({ view, setLibraryViews, qLibItems, currentUser }) {
  const [expanded, setExpanded] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [topicState, setTopicState] = useState("");
  const [pointState, setPointState] = useState([]);

  const { topic, color, points, id, selectedAI } = view;
  const db = getFirestore();

  useEffect(() => {
    setTopicState(topic);
    setPointState(points);
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  console.log(expanded);

  function handleCloseView(id) {
    setLibraryViews((prevViews) => prevViews.filter((view) => view.id !== id));
  }

  const pointsArray = pointState;

  const renderedPoints = points
    ? pointsArray.map((point, index) => (
        <li className="library-view-single__point" key={index}>{`${
          index + 1
        }. ${point}`}</li>
      ))
    : null;

  const handleSubmitEditForm = async (e) => {
    e.preventDefault();
    console.log("topic state::", topicState);
    let pointsValue = pointState;
    let topicValue = topicState;
    // let commentValue = commentState;

    console.log(topicValue);

    await updateDoc(doc(db, "libraryItems", id), {
      topic: topicValue,
      points: pointsValue,
      hasBeenEdited: true,
      // comment: commentValue,
    });
    qLibItems();
    setEditModalOpen(false);
  };
  return (
    <div
      className={`library-view-single__wrapper library-list-item--${color} ${
        expanded ? "library-view-single__wrapper--expanded" : ""
      } `}
    >
      <div
        className={`library-view-single  ${
          expanded ? "library-view-single--expanded" : ""
        }`}
      >
        {editModalOpen && (
          <EditForm
            setEditModalOpen={setEditModalOpen}
            view={view}
            qLibItems={qLibItems}
            currentUser={currentUser}
            handleSubmitEditForm={handleSubmitEditForm}
            topicState={topicState}
            setTopicState={setTopicState}
            pointState={pointState}
            setPointState={setPointState}
          />
        )}
        <div className="library-view-single__section">
          <h4 className="library-view-single__header">{topicState}</h4>
          <div className="library-view-single__buttons">
            {/* <img
                src={editIcon}
                alt="edit icon"
                className="library-view-single__icon view-edit-icon-"
                onClick={() => setEditModalOpen(true)}
              /> */}
            <img
              src={closeIcon}
              alt="close icon"
              className="library-view-single__icon view-close-icon"
              onClick={() => handleCloseView(id)}
            />
          </div>
        </div>

        <ul>{renderedPoints}</ul>
        <div className="library-view-single__section">
          <h4> This was a {selectedAI} response</h4>
        </div>
      </div>
      <div className="library-view-single__bottom">
        <div className="library-view-single__bottom-wrapper">
          <div className="library-view-single__bottom-left">
            <button
              className="library-view-single__edit-button"
              onClick={() => setEditModalOpen(true)}
            >
              edit
            </button>
          </div>
          <div className="library-view-single__bottom-right">
            <img
              src={downIcon}
              alt="down icon"
              onClick={toggleExpanded}
              className={`expand-icon ${
                expanded ? "expand-icon--expanded expand-icon--scale" : ""
              } `}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryViewSingle;
