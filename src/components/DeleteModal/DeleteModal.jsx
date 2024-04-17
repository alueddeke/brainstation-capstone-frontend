import "./DeleteModal.scss";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const DeleteModal = ({ setIsModalOpen, qLibItems, listItem }) => {
  const db = getFirestore();
  return (
    <div className="delete-modal">
      <div className="delete-modal__content">
        <p className="delete-modal__message">
          Are you sure you want to delete this list item?
        </p>
        <div className="delete-modal__buttons">
          <button
            className="delete-modal__button cancel"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="delete-modal__button delete"
            // onClick={async () => {
            //   await deleteDoc(doc(db, "libraryItems", listItem.id));
            //   qLibItems();
            //   setIsModalOpen(false);
            // }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
