import "../../firebase/firebase";

import "./Library.scss";
import LibraryListItem from "../LibraryListItem/LibraryListItem";
import library from "../../assets/icons/book-solid.svg";
import list from "../../assets/icons/list-solid.svg";
import backArrow from "../../assets/icons/arrow-left-solid.svg";
import rightArrow from "../../assets/icons/arrow-right-solid.svg";
import { useState } from "react";
import hide from "../../assets/icons/minus-solid.svg";

function Library({ qLibItems, libraryItems, handleItemClick, viewsError }) {
  const [sidebarIsCollapsed, setSidebarIsCollapsed] = useState(false);
  const [hideLibrary, setHideLibrary] = useState(false);

  function toggleSidebarCollapsed() {
    setSidebarIsCollapsed(!sidebarIsCollapsed);
    setHideLibrary(!hideLibrary);
    console.log(sidebarIsCollapsed);
  }
  function handleHideLibrary() {
    setHideLibrary(!hideLibrary);
  }

  function expandLibrary() {
    setSidebarIsCollapsed(false);
    setHideLibrary(false);
  }
  return (
    <section
      className={
        !sidebarIsCollapsed
          ? "library"
          : "library library--collapsed sidebar__collapsed-content"
      }
    >
      <div className={hideLibrary ? "library__top-collapsed" : ""}>
        <div
          className={
            !sidebarIsCollapsed
              ? "library__header-container"
              : "library__header-container library__header-container--collapsed sidebar__collapsed-content"
          }
        >
          {!sidebarIsCollapsed ? (
            <>
              <h2 className="library__header">library:</h2>
            </>
          ) : (
            <div className="sidebar__collapsed-content">
              <img
                src={library}
                alt="book icon"
                className="library__icon-book"
              />
            </div>
          )}
        </div>

        {libraryItems.length === 0 ? (
          <div className="library__empty-list">
            <h3>Save a response to add +</h3>
          </div>
        ) : (
          <div
            className={!hideLibrary ? "library__list" : "library__list--hide"}
          >
            <ul>
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
            <div
              className={
                sidebarIsCollapsed
                  ? "library__icon-hide-container"
                  : "invisible"
              }
            >
              <div className="library__icon-container ">
                <img
                  src={hide}
                  alt="hide icon"
                  className="library__icon library__icon-list "
                  onClick={handleHideLibrary}
                />
              </div>
            </div>
          </div>
        )}

        {hideLibrary && (
          <div className="library__icon-container library__icon-list-container">
            <img
              src={list}
              alt="list icon"
              className="library__icon library__icon-list "
              onClick={() => setHideLibrary(false)}
            />
          </div>
        )}

        {/* {libraryItems.length === 0 ? (
          <div className="library__empty-list">
            <h3>Save a response to add +</h3>
          </div>
        ) : (
          <ul
            className={!hideLibrary ? "library__list" : "library__list--hide"}
          >
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
        )} */}
      </div>

      {sidebarIsCollapsed ? (
        <div className="library__bottom sidebar__collapsed-content">
          <div className="library__icon-container">
            <img
              src={rightArrow}
              alt="right arrow"
              className="library__icon"
              onClick={expandLibrary}
            />
          </div>
        </div>
      ) : (
        <div className="library__bottom ">
          <div className="library__icon-container">
            <img
              src={backArrow}
              alt="back arrow"
              className="library__icon-back library__icon "
              onClick={toggleSidebarCollapsed}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Library;
