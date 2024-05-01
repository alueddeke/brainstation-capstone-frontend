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
          {/* <button
            className="delete-modal__button delete"
            onClick={async () => {
              await deleteDoc(doc(db, "libraryItems", listItem.id));
              qLibItems();
              setIsModalOpen(false);
            }}
          > */}
          <button
            className="delete-modal__button delete"
            onClick={async () => {
              console.log("deleting from local storage");
              // Retrieve existing items from local storage
              const items = JSON.parse(
                localStorage.getItem("libraryItems") || "{}"
              );

              // Delete the item with the specified ID
              if (items && items[listItem.id]) {
                delete items[listItem.id];
              }

              // Save the updated items back to local storage
              localStorage.setItem("libraryItems", JSON.stringify(items));

              // Update the UI to reflect the changes
              qLibItems();

              // Close the modal
              setIsModalOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
