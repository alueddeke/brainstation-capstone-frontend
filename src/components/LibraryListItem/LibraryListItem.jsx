import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import "./LibraryListItem.scss";
import deleteIcon from "../../assets/icons/circle-minus-solid.svg";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";

function LibraryListItem({
  listItem,
  handleItemClick,
  qLibItems,
  viewsError,
  sidebarIsCollapsed,
}) {
  const db = getFirestore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { topic, color, points, isCollapsed, id } = listItem;

  const renderedPoints = points
    ? points.map((point, index) => (
        <ul>
          <li className="library-list-item__point" key={index}>{`${
            index + 1
          }. ${point}`}</li>
        </ul>
      ))
    : null;

  return (
    <>
      {isModalOpen && (
        <DeleteModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          qLibItems={qLibItems}
          listItem={listItem}
        />
      )}
      {viewsError ? (
        <Tooltip
          title={viewsError}
          placement="top-end"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -6],
                  },
                },
              ],
            },
          }}
          arrow
        >
          {" "}
          <li
            className={
              isCollapsed
                ? `library-list-item library-list-item__collapsed library-list-item__collapsed--${color}`
                : `library-list-item library-list-item--${color}`
            }
            key={id}
          >
            <>
              {isCollapsed ? (
                <div className="library-list-item__buttons-container">
                  <div
                    className="library-list-item__left "
                    onClick={() => {
                      handleItemClick(id);
                    }}
                  >
                    {topic}
                  </div>
                  <div className="library-list-item__right ">
                    <img
                      src={deleteIcon}
                      alt="delete icon"
                      className="delete-icon"
                      onClick={async () => {
                        await deleteDoc(doc(db, "libraryItems", listItem.id));
                        qLibItems();
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  {renderedPoints}
                  <button
                    className="button"
                    onClick={() => handleItemClick(id)}
                  >
                    close
                  </button>
                </div>
              )}
            </>
          </li>
        </Tooltip>
      ) : (
        <div className={sidebarIsCollapsed ? "sidebar__collapsed-content" : ""}>
          <li
            className={
              isCollapsed
                ? `library-list-item library-list-item__collapsed library-list-item__collapsed--${color}`
                : `library-list-item library-list-item--${color}`
            }
            key={id}
          >
            <>
              {isCollapsed ? (
                <div className="library-list-item__buttons-container">
                  <div
                    className={
                      sidebarIsCollapsed
                        ? "library-list-item__left library-list-item__left--sidebar  "
                        : "library-list-item__left  "
                    }
                    onClick={() => {
                      handleItemClick(id);
                    }}
                  >
                    {topic}
                  </div>
                  {!sidebarIsCollapsed && (
                    <div className="library-list-item__right ">
                      <img
                        src={deleteIcon}
                        alt="delete icon"
                        className="delete-icon"
                        onClick={() => setIsModalOpen(true)}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {renderedPoints}
                  <button
                    className="button"
                    onClick={() => handleItemClick(id)}
                  >
                    close
                  </button>
                </div>
              )}
            </>
          </li>
        </div>
        // </div>
      )}
    </>
  );
}

export default LibraryListItem;
