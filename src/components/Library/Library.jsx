import "../../firebase/firebase";

import LibraryListItem from "../LibraryListItem/LibraryListItem";
import "./Library.scss";
import library from "../../assets/icons/book-solid.svg";

import backArrow from "../../assets/icons/arrow-left-solid.svg";
import rightArrow from "../../assets/icons/arrow-right-solid.svg";
import { useState } from "react";

function Library({ qLibItems, libraryItems, handleItemClick, viewsError }) {
  const [sidebarIsCollapsed, setSidebarIsCollapsed] = useState(false);

  function toggleCollapsed() {
    setSidebarIsCollapsed(!sidebarIsCollapsed);
  }
  return (
    <section className="library">
      <div className="library__top">
        <div
          className={
            !sidebarIsCollapsed
              ? "library__header-container"
              : "library__header-container library__header-container--collapsed"
          }
        >
          {!sidebarIsCollapsed ? (
            <>
              <h2 className="library__header">library:</h2>
              <div className="library__icon-container">
                <img
                  src={backArrow}
                  alt="back arrow"
                  className="library__icon-back library__icon "
                  onClick={toggleCollapsed}
                />
              </div>{" "}
            </>
          ) : (
            <img src={library} alt="book icon" className="library__icon" />
          )}
        </div>

        {libraryItems.length === 0 ? (
          <div className="library__empty-list">
            <h3>Save a response to add +</h3>
          </div>
        ) : (
          <ul className="library__list">
            {libraryItems.map((listItem, index) => (
              <LibraryListItem
                key={index}
                handleItemClick={handleItemClick}
                listItem={listItem}
                viewsError={viewsError}
                qLibItems={qLibItems}
                sidebarIsCollapsed={sidebarIsCollapsed}
              />
            ))}
          </ul>
        )}
      </div>

      {sidebarIsCollapsed && (
        <div className="library__bottom">
          <img
            src={rightArrow}
            alt="right arrow"
            className="library__icon"
            onClick={toggleCollapsed}
          />
        </div>
      )}
    </section>
  );
}

export default Library;
